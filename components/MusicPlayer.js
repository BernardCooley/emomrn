import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Image } from 'react-native';
import { Card, Title, Chip, Text, Avatar, IconButton } from 'react-native-paper';
import { usePlayerContext } from '../contexts/PlayerContext';

const MusicPlayer = () => {
    const [nextDisabled, setNextDisabled] = useState(false);
    const [previousDisabled, setPreviousDisabled] = useState(false);
    const playerContext = usePlayerContext();

    useEffect(() => {
        if (playerContext.queue && playerContext.currentTrack) {
            const queue = playerContext.queue;
            const track = queue.filter(track => track.id === playerContext.currentTrack.id)[0];
            const index = (queue).indexOf(track);

            setNextDisabled(index === queue.length - 1);
            setPreviousDisabled(index === 0);
        }


    }, [playerContext.queue, playerContext.currentTrack]);

    const playPause = () => {
        if (playerContext.isPlaying) {
            playerContext.pause()
        } else {
            playerContext.play()
        }
    }

    const previousTrack = () => {
        playerContext.previous();
    }

    const nextTrack = () => {
        playerContext.next();
    }

    const shuffle = () => {

    }

    const repeat = () => {

    }


    if (playerContext.isEmpty || !playerContext.currentTrack) {
        return null;
    }

    return (
        <SafeAreaView style={styles.playerContainer}>
            {/* <Text>{playerContext.currentTrack.trackImage}</Text> */}
            {/* <Image source={{ uri: playerContext.currentTrack.trackImage }} style={styles.image}></Image> */}
            <Text>{playerContext.isPlaying}</Text>
            <View style={{ ...styles.trackImageContainer, ...styles.sectionContainer }}>
                <Text>Track image</Text>
            </View>
            <View style={{ ...styles.trackDetailsContainer, ...styles.sectionContainer }}>
                <Title>{playerContext.currentTrack.title}</Title>
                <Text>{playerContext.currentTrack.artist}</Text>
            </View>
            <View style={{ ...styles.trackProgressContainer, ...styles.sectionContainer }}>
                <Text>Track progress</Text>
            </View>
            <View style={{ ...styles.trackControlsContainer, ...styles.sectionContainer }}>
                <IconButton animated icon="shuffle" size={30} onPress={e => openMenu(e, tracks[key])} />
                <IconButton animated icon="skip-previous" disabled={previousDisabled} size={40} onPress={previousTrack} />
                <IconButton animated icon={playerContext.isPlaying ? "pause" : "play-circle-outline"} size={60} onPress={playPause} />
                <IconButton animated icon="skip-next" disabled={nextDisabled} size={40} onPress={nextTrack} />
                <IconButton animated icon="repeat" size={30} onPress={e => openMenu(e, tracks[key])} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    playerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 30
    },
    image: {
        width: '100%',
        height: 'auto'
    },
    sectionContainer: {
        display: 'flex',
        width: '100%',
        marginVertical: 20,
        borderWidth: 1
    },
    trackImageContainer: {

    },
    trackDetailsContainer: {

    },
    trackProgressContainer: {

    },
    trackControlsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60
    }
});

export default MusicPlayer;