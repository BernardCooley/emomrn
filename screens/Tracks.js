import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Avatar, IconButton, List, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { usePlayerContext } from '../contexts/PlayerContext';
import storage from '@react-native-firebase/storage';


const TracksScreen = ({ navigation }) => {
    const playerContext = usePlayerContext();
    let allTracks = useSelector(state => state.tracks);

    const openMenu = () => {
        alert('menu');
    }

    const playTrack = async track => {
        await storage().ref(`tracks/${track.id}.wav`).getDownloadURL().then(url => {
            track['url'] = url;
            playerContext.play(track);
            navigation.navigate('Music');
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
                    <Avatar.Image size={60} source={{
                        uri: item.trackImage
                    }} />
                }
                right={() =>
                    <IconButton style={styles.menuIcon} animated icon="dots-vertical" size={30} onPress={openMenu} />
                }
                onPress={() => playTrack(item)}
            />
            <Divider />
        </>
    );
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={allTracks}
                renderItem={renderItem}
                keyExtractor={track => track.id} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    listItem: {
        width: '100%',
        height: 80
    },
    menuIcon: {
        color: 'red'
    }
});

export default TracksScreen;
