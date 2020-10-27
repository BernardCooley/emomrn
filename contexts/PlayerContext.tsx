import React, { useContext, useEffect, useState } from 'react';
import RNTrackPlayer, { State as TrackPlayerState, STATE_PAUSED, STATE_PLAYING, STATE_STOPPED, Track } from 'react-native-track-player';

interface PlayerContextType {
    isPlaying: boolean;
    isPaused: boolean;
    isStopped: boolean;
    isEmpty: boolean;
    currentTrack: Track | null;
    queue: Array<null | Track>;
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
    queue: null,
    play: () => null,
    pause: () => null,
    next: () => null,
    previous: () => null
})

export const PlayerContextProvider: React.FC = props => {
    const [playerState, setPlayerState] = useState<null | TrackPlayerState>(null);
    const [currentTrack, setCurrentTrack] = useState<null | Track>(null);
    const [queue, setQueue] = useState<Array<null | Track>>(null);

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

    const play = async (track?: Track, queue?: Boolean) => {
        if(!track) {
            if(currentTrack) {
                await RNTrackPlayer.play();
            }
            return;
        }
        if(!queue) {
            await RNTrackPlayer.reset();
            setCurrentTrack(track);
        }
        await RNTrackPlayer.add([track]);
        await RNTrackPlayer.play();
        setQueue((await RNTrackPlayer.getQueue()).map(track => {
            return track
        }));
    }

    const pause = async () => {
        await RNTrackPlayer.pause();
    }

    const next = async () => {
        await RNTrackPlayer.skipToNext();
    }

    const previous = async () => {
        await RNTrackPlayer.skipToPrevious();
    }

    const value: PlayerContextType = {
        isPlaying: playerState === STATE_PLAYING,
        isPaused: playerState === STATE_PAUSED,
        isStopped: playerState === STATE_STOPPED,
        isEmpty: playerState === null,
        currentTrack,
        queue,
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