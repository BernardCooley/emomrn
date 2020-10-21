import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View } from 'react-native';
import { Card, Title, Chip, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { artistProfileId } from '../Actions/index';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import ArtistProfileScreen from '../screens/ArtistProfile';

const DATA = [
    {
        artist: 'Artist name',
        trackAmount: 3,
        id: '34543',
        imageUrl: 'https://picsum.photos/700'
    },
    {
        artist: 'Artist name',
        trackAmount: 3,
        id: '684737',
        imageUrl: 'https://picsum.photos/id/237/200/300'
    },
    {
        artist: 'Artist name',
        trackAmount: 2,
        id: '694736',
        imageUrl: 'https://picsum.photos/seed/picsum/200/300'
    },
    {
        artist: 'Artist name',
        trackAmount: 1,
        id: '6947327',
        imageUrl: 'https://picsum.photos/200/300?grayscale'
    },
    {
        artist: 'Artist name',
        trackAmount: 0,
        id: '6847265',
        imageUrl: 'https://picsum.photos/id/870/200/300?grayscale&blur=2'
    },
    {
        artist: 'Artist name',
        trackAmount: 2,
        id: '58774785',
        imageUrl: 'https://picsum.photos/700'
    },
    {
        artist: 'Artist name',
        trackAmount: 3,
        id: '4867563764',
        imageUrl: 'https://picsum.photos/700'
    },
    {
        artist: 'Artist name',
        trackAmount: 1,
        id: '496747295976',
        imageUrl: 'https://picsum.photos/700'
    },
    {
        artist: 'Artist name',
        trackAmount: 2,
        id: '395767438',
        imageUrl: 'https://picsum.photos/700'
    },
];

const ArtistsScreen = ({ navigation }) => {
    const usersCollection = firestore().collection('users');
    const dispatch = useDispatch();
    const profileId = useSelector(state => state.artistProfileId);

    useEffect(() => {
        console.log('Artist page loaded');
    }, []);

    const viewArtistProfile = artistId => {
        dispatch(artistProfileId(artistId));
    }

    const viewArtistTracks = artistId => {
        alert(artistId);
    }

    const renderItem = ({ item }) => (
        <Card style={styles.card} onPress={() => viewArtistProfile(item.id)}>
            <Chip style={styles.chip} icon="music-box-multiple" onPress={() => viewArtistTracks(item.id)}>{item.trackAmount}</Chip>
            <Card.Cover style={styles.cardCover} source={{ uri: item.imageUrl }} />
            <Title style={styles.cardTitle}>{item.artist}</Title>
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
                        data={DATA}
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
        alignItems: 'center',
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
        color: 'white'
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
