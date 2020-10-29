import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { Title, Text, Avatar, IconButton, useTheme, Modal, Portal, Provider } from 'react-native-paper';
import { usePlayerContext } from '../contexts/PlayerContext';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';

import TracksList from '../components/TracksList';
import Progress from './Progress';

const MusicPlayer = ({ navigation }) => {
    const [nextDisabled, setNextDisabled] = useState(false);
    const [previousDisabled, setPreviousDisabled] = useState(false);
    const [filteredQueue, setFilteredQueue] = useState([]);
    const [showCommentsOrQueue, setShowCommentsOrQueue] = useState('');
    const playerContext = usePlayerContext();
    const [modalVisible, setModalVisible] = React.useState(false);

    useEffect(() => {
        if (playerContext.trackQueue && playerContext.currentTrack) {
            const queue = [...playerContext.trackQueue];
            const track = queue.filter(track => track.id === playerContext.currentTrack.id)[0];
            const currentIdex = (queue).indexOf(track);

            setNextDisabled(currentIdex === queue.length - 1);
            setPreviousDisabled(currentIdex === 0);

            queue.splice(0, currentIdex + 1);
            setFilteredQueue(queue);
            setModalVisible(false);
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
        <>
            <SafeAreaView>
                <ScrollView style={styles.scrollView} contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'space-between'
                }}>
                    <LinearGradient colors={['#3A6E7A', '#318E8F', '#C5E3E5']} style={styles.playerContainer}>
                        <View style={{ ...styles.trackImageContainer, ...styles.sectionContainer }}>
                            <Avatar.Image source={{ uri: playerContext.currentTrack.trackImage }} size={300} style={styles.image}></Avatar.Image>
                        </View>
                        <View style={{ ...styles.trackDetailsContainer, ...styles.sectionContainer }}>
                            <Title>{playerContext.currentTrack.title}</Title>
                            <Text>{playerContext.currentTrack.artist}</Text>
                        </View>
                        <View style={{ ...styles.trackProgressContainer, ...styles.sectionContainer }}>
                            <Progress />
                        </View>
                        <View style={{ ...styles.trackControlsContainer, ...styles.sectionContainer }}>
                            <IconButton animated icon="shuffle" size={30} onPress={e => openMenu(e, tracks[key])} />
                            <IconButton animated icon="skip-previous" disabled={previousDisabled} size={40} onPress={previousTrack} />
                            <IconButton animated icon={playerContext.isPlaying ? "pause" : "play-circle-outline"} size={60} onPress={playPause} />
                            <IconButton animated icon="skip-next" disabled={nextDisabled} size={40} onPress={nextTrack} />
                            <IconButton animated icon="repeat" size={30} onPress={e => openMenu(e, tracks[key])} />
                        </View>
                        <View style={{ ...styles.otherControlsContainer, ...styles.sectionContainer }}>
                            <IconButton animated icon="comment" size={20} onPress={() => setShowCommentsOrQueue('comments')} />
                            <IconButton disabled={filteredQueue.length === 0} animated icon="playlist-play" size={20} onPress={() => setModalVisible(true)} />
                        </View>
                    </LinearGradient>
                </ScrollView>
            </SafeAreaView>
            <Provider>
                <Portal>
                    <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainerStyles}>
                        <View style={{ ...styles.queueContainer, ...styles.sectionContainer }}>
                            <Title>Queue</Title>
                            <TracksList tracks={filteredQueue} navigation={navigation} listLocation='playerQueue' />
                        </View>
                    </Modal>
                </Portal>
            </Provider>
        </>
    )
}

MusicPlayer.propTypes = {
    tracks: PropTypes.object,
    navigation: PropTypes.object,
    listLocation: PropTypes.string
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
        height: 50
    },
    otherControlsContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalContainerStyles: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        margin: 30,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10
    }
});

export default MusicPlayer;