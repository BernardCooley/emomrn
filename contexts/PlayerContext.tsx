import React, { useContext, useEffect, useState } from 'react';
import RNTrackPlayer, { State as TrackPlayerState, STATE_PAUSED, STATE_PLAYING, STATE_STOPPED, Track } from 'react-native-track-player';

interface PlayerContextType {
    isPlaying: boolean;
    isPaused: boolean;
    isStopped: boolean;
    isEmpty: boolean;
    currentTrack: Track | null;
    trackQueue: Array<null | Track>;
    play: (track?: Track, queue?: Boolean) => void;
    pause: () => void;
    next: () => void;
    previous: () => void;
}

export const PlayerContext = React.createContext<PlayerContextType>({
    isPlaying: false,
    isPaused: false,
    isStopped: false,
    isEmpty: false,
    currentTrack: null,
    trackQueue: null,
    play: () => null,
    pause: () => null,
    next: () => null,
    previous: () => null
})

export const PlayerContextProvider: React.FC = props => {
    const [playerState, setPlayerState] = useState<null | TrackPlayerState>(null);
    const [currentTrack, setCurrentTrack] = useState<null | Track>(null);
    const [trackQueue, setTrackQueue] = useState<Array<null | Track>>(null);

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

    const getCurrentQueue = async () => {
        return (await RNTrackPlayer.getQueue()).map(track => {
            return track
        });
    }

    const play = async (track?: Track, queue?: Boolean) => {
        const currentQueue = await getCurrentQueue();

        if(!track && !queue) {
            if (currentTrack) {
                await RNTrackPlayer.play();
            }
            return;
        }else if(track && !queue) {
            if(currentQueue.length === 0) {
                await RNTrackPlayer.add([track]).then(async () => {
                    setCurrentTrack(track);
                    setTrackQueue(await getCurrentQueue());
                })
            }else {
                if (currentQueue.filter(track => track === track).length > 0) {
                    await RNTrackPlayer.remove(track.id).then(async () => {
                        await RNTrackPlayer.add([track], currentQueue[0].id).then(async () => {
                            await RNTrackPlayer.skip(track.id);
                            setCurrentTrack(track);
                            setTrackQueue(await getCurrentQueue());
                        });
                    });
                }else {
                    await RNTrackPlayer.add([track], currentQueue[0].id).then(async () => {
                        await RNTrackPlayer.skip(track.id);
                        setCurrentTrack(track);
                        setTrackQueue(await getCurrentQueue());
                    });
                }
            }
            await RNTrackPlayer.play();
        }else if(track && queue) {
            if (currentQueue.filter(tracka => tracka.id === track.id).length > 0) {
                alert('Already in queue');
            } else {
                await RNTrackPlayer.add([track]).then(async () => {
                    setTrackQueue(await getCurrentQueue());
                })  
            }
        }
    }

    const pause = async () => {
        await RNTrackPlayer.pause();
    }

    const next = async () => {
        await RNTrackPlayer.skipToNext().then(async () => {
            await getCurrentQueue().then(tracks => {
                tracks.forEach(async track => {
                    if (track.id === await RNTrackPlayer.getCurrentTrack()) {
                        setCurrentTrack(track);
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
                    }
                })
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
        pause,
        play,
        next,
        previous
    }

    return (
        <PlayerContext.Provider value={value}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export const usePlayerContext = () => useContext(PlayerContext);