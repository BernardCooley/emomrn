import React from 'react';
import { Title, IconButton, useTheme, Modal, Portal, Provider, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import TracksList from '../components/TracksList';


const QueueModal = ({ tracks, navigation, show }) => {
    const { colors } = useTheme();

    return (
        <Provider>
            <Portal>
                <Modal visible={show} onDismiss={() => setModalVisible(false)} contentContainerStyle={styles.modalContainerStyles}>
                    <View style={{ ...styles.queueContainer, ...styles.sectionContainer }}>
                        <Title>Queue</Title>
                        <TracksList tracks={tracks} navigation={navigation} listLocation='playerQueue' />
                    </View>
                    <Button color={colors.primary} mode='text' onPress={() => playerContext.clearQueue()} style={styles.clearButton}>Clear</Button>
                    <IconButton style={styles.closeIcon} animated icon="close" size={20} onPress={() => setModalVisible(false)} />
                </Modal>
            </Portal>
        </Provider>
    )
}

QueueModal.propTypes = {
    tracks: PropTypes.array,
    listLocation: PropTypes.string
}

const styles = StyleSheet.create({
    sectionContainer: {
        display: 'flex',
        width: '100%',
        marginVertical: 20
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
    },
    clearButton: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10
    }
});

export default QueueModal;