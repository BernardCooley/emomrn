import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Title, Text, Avatar, IconButton, useTheme } from 'react-native-paper';
import { usePlayerContext } from '../contexts/PlayerContext';
import LinearGradient from 'react-native-linear-gradient';

const MusicPlayer = () => {
    const { colors } = useTheme();
    const [nextDisabled, setNextDisabled] = useState(false);
    const [previousDisabled, setPreviousDisabled] = useState(false);
    const playerContext = usePlayerContext();

    useEffect(() => {
        if (playerContext.trackQueue && playerContext.currentTrack) {
            const queue = playerContext.trackQueue;
            const track = queue.filter(track => track.id === playerContext.currentTrack.id)[0];
            const index = (queue).indexOf(track);

            setNextDisabled(index === queue.length - 1);
            setPreviousDisabled(index === 0);
        }


    }, [playerContext.trackQueue, playerContext.currentTrack]);

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
        <SafeAreaView>
            <LinearGradient colors={['#3A6E7A', '#318E8F', '#C5E3E5']} style={styles.playerContainer}>
                <View style={{ ...styles.trackImageContainer, ...styles.sectionContainer }}>
                    <Avatar.Image source={{ uri: playerContext.currentTrack.trackImage }} size={300} style={styles.image}></Avatar.Image>
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
                <View style={{ ...styles.otherControlsContainer, ...styles.sectionContainer }}>
                    <Text>Other controls</Text>
                </View>
            </LinearGradient>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    playerContainer: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 30,
        height: '100%'
    },
    sectionContainer: {
        display: 'flex',
        width: '100%',
        marginVertical: 20
    },
    trackImageContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
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
    },
    otherControlsContainer: {

    }
});

export default MusicPlayer;