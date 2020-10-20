import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Avatar, IconButton, List } from 'react-native-paper';

const DATA = [
    {
        album: 'Wave function EP', artist: 'Tape Twelve Tape Twelve Tape Twelve Tape Twelve', description: 'Good track', duration: 300, genre: 'Electro', id: 'ds5MaDn5ewxxvV0CK9GG', releaseDate: '6 October 2020 00:00:00 UTC+1', title: 'Wave function Wave function Wave function', trackImage: 'gs://emom-84ee4.appspot.com/trackImages/ds5MaDn5ewxxvV0CK9GG.jpg'
    },
    { album: 'Wave function EP', artist: 'Tape Twelve', description: 'Good track', duration: 300, genre: 'Electro', id: 'ds5MaDn5ewxxvV0CK9GG', releaseDate: '6 October 2020 00:00:00 UTC+1', title: 'Wave function', trackImage: 'gs://emom-84ee4.appspot.com/trackImages/ds5MaDn5ewxxvV0CK9GG.jpg'
    },
    { album: 'Wave function EP', artist: 'Tape Twelve', description: 'Good track', duration: 300, genre: 'Electro', id: 'ds5MaDn5ewxxvV0CK9GG', releaseDate: '6 October 2020 00:00:00 UTC+1', title: 'Wave function', trackImage: 'gs://emom-84ee4.appspot.com/trackImages/ds5MaDn5ewxxvV0CK9GG.jpg'
    },
    { album: 'Wave function EP', artist: 'Tape Twelve', description: 'Good track', duration: 300, genre: 'Electro', id: 'ds5MaDn5ewxxvV0CK9GG', releaseDate: '6 October 2020 00:00:00 UTC+1', title: 'Wave function', trackImage: 'gs://emom-84ee4.appspot.com/trackImages/ds5MaDn5ewxxvV0CK9GG.jpg'
    },
    { album: 'Wave function EP', artist: 'Tape Twelve', description: 'Good track', duration: 300, genre: 'Electro', id: 'ds5MaDn5ewxxvV0CK9GG', releaseDate: '6 October 2020 00:00:00 UTC+1', title: 'Wave function', trackImage: 'gs://emom-84ee4.appspot.com/trackImages/ds5MaDn5ewxxvV0CK9GG.jpg'
    },
    { album: 'Wave function EP', artist: 'Tape Twelve', description: 'Good track', duration: 300, genre: 'Electro', id: 'ds5MaDn5ewxxvV0CK9GG', releaseDate: '6 October 2020 00:00:00 UTC+1', title: 'Wave function', trackImage: 'gs://emom-84ee4.appspot.com/trackImages/ds5MaDn5ewxxvV0CK9GG.jpg'
    },
    { album: 'Wave function EP', artist: 'Tape Twelve', description: 'Good track', duration: 300, genre: 'Electro', id: 'ds5MaDn5ewxxvV0CK9GG', releaseDate: '6 October 2020 00:00:00 UTC+1', title: 'Wave function', trackImage: 'gs://emom-84ee4.appspot.com/trackImages/ds5MaDn5ewxxvV0CK9GG.jpg'
    },
    { album: 'Wave function EP', artist: 'Tape Twelve', description: 'Good track', duration: 300, genre: 'Electro', id: 'ds5MaDn5ewxxvV0CK9GG', releaseDate: '6 October 2020 00:00:00 UTC+1', title: 'Wave function', trackImage: 'gs://emom-84ee4.appspot.com/trackImages/ds5MaDn5ewxxvV0CK9GG.jpg'
    }
];

const ExploreScreen = ({ navigation }) => {
    const openMenu = () => {
        alert('menu');
    }

    const playTrack = () => {
        alert('play');
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
                <Avatar.Image size={60} source={{ uri: item.trackImage }} />
            }
            right={() =>
                <IconButton style={styles.menuIcon} animated icon="dots-vertical" size={30} onPress={openMenu} />
            }
            onPress={playTrack}
        />
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
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
