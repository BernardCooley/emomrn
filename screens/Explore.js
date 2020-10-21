import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Avatar, IconButton, List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { usePlayerContext } from '../contexts/PlayerContext';
import storage from '@react-native-firebase/storage';

const DATA = [
    {
        album: 'Wave function EP', artist: 'Tape Twelve Tape Twelve Tape Twelve Tape Twelve', description: 'Good track', duration: 300, genre: 'Electro', id: 'ds5MaDn5ewxxvV0CK9GG', releaseDate: '6 October 2020 00:00:00 UTC+1', title: 'Wave function Wave function Wave function', trackImage: 'gs://emom-84ee4.appspot.com/trackImages/ds5MaDn5ewxxvV0CK9GG.jpg'
    },
    { album: 'Wave function EP', artist: 'Tape Twelve', description: 'Good track', duration: 300, genre: 'Electro', id: 'ds5MaDn5ewxxvV0CK9GG', releaseDate: '6 October 2020 00:00:00 UTC+1', title: 'Wave function', trackImage: 'gs://emom-84ee4.appspot.com/trackImages/ds5MaDn5ewxxvV0CK9GG.jpg'
    }
];

const ExploreScreen = ({ navigation }) => {
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
        <List.Item
            titleNumberOfLines={1}
            descriptionNumberOfLines={1}
            titleEllipsizeMode='tail'
            descriptionEllipsizeMode='tail'
            titleStyle={{fontSize: 16}}
            descriptionStyle={{ fontSize: 24 }}
            style={styles.listItem}
            title={item.artist}
            description={item.title}
            left={() => 
                <Avatar.Image size={60} source={{
                    uri: item.trackImage }} />
            }
            right={() =>
                <IconButton style={styles.menuIcon} animated icon="dots-vertical" size={30} onPress={openMenu} />
            }
            onPress={() => playTrack(item)}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={allTracks}
                renderItem={renderItem}
                keyExtractor={track => track.id}
            />
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

export default ExploreScreen;
