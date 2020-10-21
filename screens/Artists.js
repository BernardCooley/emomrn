import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native';
import { Card, Title, Chip, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { artistProfileId, artists, tracks } from '../Actions/index';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import ArtistProfileScreen from '../screens/ArtistProfile';

const ArtistsScreen = ({ navigation }) => {
    const usersCollection = firestore().collection('users');
    const dispatch = useDispatch();
    const profileId = useSelector(state => state.artistProfileId);
    let allArtists = useSelector(state => state.artists);
    let allTracks = useSelector(state => state.tracks);

    useEffect(() => {
        usersCollection.onSnapshot(onResult, onError);
        console.log('Artist page loaded');
    }, []);

    const onResult = QuerySnapshot => {
        allArtists = [];
        QuerySnapshot.docs.map(async data => {
            const artistData = data.data();
            await storage().ref(`bandImages/${artistData.userId}.jpeg`).getDownloadURL().then(url => {
                artistData['artistImage'] = url;

                artistData['trackAmount'] = allTracks.filter(track => track.artistId === artistData.userId).length;

                dispatch(artists([...allArtists, artistData]));
            });
        });
    }

    const onError = error => {
        console.log(error);
    }

    const viewArtistProfile = artistId => {
        dispatch(artistProfileId(artistId));
    }

    const viewArtistTracks = artistId => {
        alert(artistId);
    }

    const renderItem = ({ item }) => (
        <Card style={styles.card} onPress={() => viewArtistProfile(item.userId)}>
            <Chip style={styles.chip} icon="music-box-multiple" onPress={() => viewArtistTracks(item.userId)}>{item.trackAmount}</Chip>
            <Card.Cover style={styles.cardCover} source={{ uri: item.artistImage }} />
            <Title style={styles.cardTitle}>{item.artistName}</Title>
        </Card>
    );

    return (
        <>
            {profileId.length > 0 ?
                <ArtistProfileScreen/>
                :
                <SafeAreaView style={styles.artistsContainer}>
                    <FlatList
                        style={styles.listContainer}
                        data={allArtists}
                        renderItem={renderItem}
                        keyExtractor={track => track.id}
                        numColumns='2'
                    />
                </SafeAreaView>
            }
        </>
    );
}

const styles = StyleSheet.create({
    artistsContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    listContainer: {
        width: '100%'
    },
    card: {
        height: 'auto',
        width: '45%',
        margin: 10
    },
    cardContent: {
        height: 60,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardTitle: {
        textAlign: 'center',
        position: 'absolute',
        bottom: -2,
        zIndex: 1,
        width: '100%',
        backgroundColor: 'rgba(219, 219, 219, 0.35)',
        color: 'white',
        height: 'auto'
    },
    cardParagraph: {

    },
    cardCover: {

    },
    chip: {
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 1,
        width: 50
    }
});

export default ArtistsScreen;
