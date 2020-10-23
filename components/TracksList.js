import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Avatar, IconButton, List, Divider } from 'react-native-paper';
import { usePlayerContext } from '../contexts/PlayerContext';
import storage from '@react-native-firebase/storage';


const TracksList = ({ navigation, tracks }) => {
    const playerContext = usePlayerContext();

    const openMenu = () => {
        alert('menu');
    }

    const playTrack = async track => {
        await storage().ref(`tracks/${track.id}.wav`).getDownloadURL().then(url => {
            track['url'] = url;
            playerContext.play(track);
            navigation.navigate('Tabs', { screen: 'Music' });
        });
    }

    const renderItem = ({ item }) => (
        <>
            <List.Item
                titleNumberOfLines={1}
                descriptionNumberOfLines={1}
                titleEllipsizeMode='tail'
                descriptionEllipsizeMode='tail'
                titleStyle={{ fontSize: 16 }}
                descriptionStyle={{ fontSize: 24 }}
                style={styles.listItem}
                title={item.artist}
                description={item.title}
                left={() =>
                    <Avatar.Image style={styles.trackImage} size={50} source={{ uri: item.trackImage }} />
                }
                right={() =>
                    <IconButton animated icon="dots-vertical" size={30} onPress={openMenu} />
                }
                onPress={() => playTrack(item)}
            />
            <Divider />
        </>
    );
    return (
        <FlatList
            data={tracks}
            renderItem={renderItem}
            keyExtractor={track => track.id} />
    );
}

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        height: 80
    },
    trackImage: {
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
});

export default TracksList;
