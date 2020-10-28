import React, { useContext, useEffect, useState } from 'react';
import RNTrackPlayer, { State as TrackPlayerState, STATE_PAUSED, STATE_PLAYING, STATE_STOPPED, Track } from 'react-native-track-player';

interface PlayerContextType {
    isPlaying: boolean;
    isPaused: boolean;
    isStopped: boolean;
    isEmpty: boolean;
    currentTrack: Track | null;
    trackQueue: Array<null | Track>;
    progress: Number;
    play: (track?: Track, queue?: Boolean) => void;
    pause: () => void;
    next: () => void;
    previous: () => void;
    seekTo: (seconds: number) => void;
}

export const PlayerContext = React.createContext<PlayerContextType>({
    isPlaying: false,
    isPaused: false,
    isStopped: false,
    isEmpty: false,
    currentTrack: null,
    trackQueue: null,
    progress: 0,
    play: () => null,
    pause: () => null,
    next: () => null,
    previous: () => null,
    seekTo: () => null
})

let interval;

export const PlayerContextProvider: React.FC = props => {
    const [playerState, setPlayerState] = useState<null | TrackPlayerState>(null);
    const [currentTrack, setCurrentTrack] = useState<null | Track>(null);
    const [trackQueue, setTrackQueue] = useState<Array<null | Track>>(null);
    const [progress, setProgress] = useState<Number>(0);

    useEffect(() => {
        const listener = RNTrackPlayer.addEventListener(
            'playback-state',
            ({state}: {state: TrackPlayerState}) => {
                setPlayerState(state);
            }
        )

        return () => {
            listener.remove();
        }
    }, []);

    const getCurrentPosition = async () => {
        await RNTrackPlayer.getPosition().then(pos => {
            setProgress(pos);
        })
    }

    const getCurrentQueue = async () => {
        return (await RNTrackPlayer.getQueue()).map(track => {
            return track
        });
    }

    const startProgress = () => {
        interval = setInterval(() => getCurrentPosition(), 1000);
    }

    const play = async (track?: Track, queue?: Boolean) => {
        const currentQueue = await getCurrentQueue();

        if(!track && !queue) {
            if (currentTrack) {
                await RNTrackPlayer.play().then(() => {
                    startProgress();
                })
            }
            return;
        }else if(track && !queue) {
            if(currentQueue.length === 0) {
                await RNTrackPlayer.add([track]).then(async () => {
                    setCurrentTrack(track);
                    setTrackQueue(await getCurrentQueue());
                })
            }else {
                if (currentQueue.filter(tr => tr.id === track.id).length > 0) {
                    await RNTrackPlayer.skip(track.id);
                    setCurrentTrack(track);
                }else {
                    await RNTrackPlayer.add([track], currentQueue[0].id).then(async () => {
                        await RNTrackPlayer.skip(track.id);
                        setCurrentTrack(track);
                        setTrackQueue(await getCurrentQueue());
                    });
                }
            }
            await RNTrackPlayer.play().then(() => {
                startProgress();
            })
        }else if(track && queue) {
            if (currentQueue.filter(tr => tr.id === track.id).length > 0) {
                alert('Already in queue');
            } else {
                await RNTrackPlayer.add([track]).then(async () => {
                    setTrackQueue(await getCurrentQueue());
                })  
            }
        }
    }

    const pause = async () => {
        await RNTrackPlayer.pause().then(() => {
            clearInterval(interval);
        })
    }

    const next = async () => {
        await RNTrackPlayer.skipToNext().then(async () => {
            await getCurrentQueue().then(tracks => {
                tracks.forEach(async track => {
                    if (track.id === await RNTrackPlayer.getCurrentTrack()) {
                        setCurrentTrack(track);
                        clearInterval(interval);
                        startProgress();
                    }
                })
            })
        })
    }

    const previous = async () => {
        await RNTrackPlayer.skipToPrevious().then(async () => {
            await getCurrentQueue().then(tracks => {
                tracks.forEach(async track => {
                    if (track.id === await RNTrackPlayer.getCurrentTrack()) {
                        setCurrentTrack(track);
                        clearInterval(interval);
                        startProgress();
                    }
                })
            })
        })
    }

    const seekTo = async (seconds: number) => {
        await RNTrackPlayer.stop().then(async () => {
            await RNTrackPlayer.seekTo(seconds).then(async () => {
                await RNTrackPlayer.play();
            })
        })
    }

    const value: PlayerContextType = {
        isPlaying: playerState === STATE_PLAYING,
        isPaused: playerState === STATE_PAUSED,
        isStopped: playerState === STATE_STOPPED,
        isEmpty: playerState === null,
        currentTrack,
        trackQueue,
        progress,
        pause,
        play,
        next,
        previous,
        seekTo
    }

    return (
        <PlayerContext.Provider value={value}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export const usePlayerContext = () => useContext(PlayerContext);