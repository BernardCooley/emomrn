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
    seekTo: (seconds: number) => void;
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
    previous: () => null,
    seekTo: () => null
})

export const PlayerContextProvider: React.FC = props => {
    const [playerState, setPlayerState] = useState<null | TrackPlayerState>(null);
    const [currentTrack, setCurrentTrack] = useState<null | Track>(null);
    const [trackQueue, setTrackQueue] = useState<Array<null | Track>>(null);

    useEffect(() => {
        const listener = RNTrackPlayer.addEventListener(
            'playback-state',
            ({ state }: { state: TrackPlayerState }) => {
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

        if (!track && !queue) {
             // No track clicked and not added to queue
            if (currentTrack) {
                await RNTrackPlayer.play()
            }
            return;
        } else if (track && !queue) {
            if (currentQueue.length === 0) {
                // Queue is empty
                await RNTrackPlayer.add([track]).then(async () => {
                    setCurrentTrack(track);
                    setTrackQueue(await getCurrentQueue());
                })
            } else {
                if (currentQueue.filter(tr => tr.id === track.id).length > 0) {
                    // Track is already in queue
                    await RNTrackPlayer.remove(track.id).then(async () => {
                        await RNTrackPlayer.add([track]).then(async () => {
                            await RNTrackPlayer.skip(track.id).then(async () => {
                                setCurrentTrack(track);
                                setTrackQueue(await getCurrentQueue());
                            });
                        })
                    })
                } else {
                    const index = currentQueue.indexOf(currentQueue.filter(tr => tr.id === currentTrack.id)[0]);

                    if(currentQueue.length > 1) {
                        // More than 1 track in queue
                        if(currentQueue.length === index + 1) {
                            // Current IS the last track
                            await RNTrackPlayer.add([track]).then(async () => {
                                await RNTrackPlayer.skip(track.id).then(async () => {
                                    setCurrentTrack(track);
                                    setTrackQueue(await getCurrentQueue());
                                })
                            })
                        }else {
                            // Current is NOT the last track
                            await RNTrackPlayer.add([track], currentQueue[index + 1].id).then(async () => {
                                await RNTrackPlayer.skip(track.id).then(async () => {
                                    setCurrentTrack(track);
                                    setTrackQueue(await getCurrentQueue());
                                })
                            });
                        }
                    }else {
                        // Only 1 track in queue
                        const current = currentTrack;
                        await RNTrackPlayer.reset().then(async () => {
                            await RNTrackPlayer.add([current, track]).then(async () => {
                                await RNTrackPlayer.skip(track.id).then(async () => {
                                    setCurrentTrack(track);
                                    setTrackQueue(await getCurrentQueue());
                                })
                            })
                        });
                    }
                }
            }
            await RNTrackPlayer.play()
        } else if (track && queue) {
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
        await RNTrackPlayer.pause()
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