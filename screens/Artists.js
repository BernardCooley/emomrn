import React from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Card, Title, Chip } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { artistProfileId, artists } from '../Actions/index';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

import ArtistProfileScreen from '../screens/ArtistProfile';

const ArtistsScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const profileId = useSelector(state => state.artistProfileId);
    let allArtists = useSelector(state => state.artists);
    let allTracks = useSelector(state => state.tracks);

    useFocusEffect(
        React.useCallback(() => {
            const getArtists = async () => {
                await firestore().collection('users').get().then(querySnapshot => {
                    dispatch(artists(querySnapshot.docs.map(doc => {
                        const artistData = doc.data();
                        artistData['trackAmount'] = allTracks.filter(track => track.artistId === artistData.userId).length;
                        return artistData;
                    })));
                }).catch(error => {
                    console.log(error);
                })
            }
            getArtists();
        }, [])
    );

    const viewArtistProfile = artistId => {
        dispatch(artistProfileId(artistId));
    }

    const viewArtistTracks = artistId => {
        alert(artistId);
    }

    const renderItem = ({ item }) => (
        <Card style={styles.card} elevation={10} onPress={() => viewArtistProfile(item.userId)}>
            <Chip style={styles.chip} icon="music-box-multiple" onPress={() => viewArtistTracks(item.userId)}>{item.trackAmount}</Chip>
            <Card.Cover style={styles.cardCover} source={{ uri: item.artistImageUrl }} />
            <Title style={styles.cardTitle}>{item.artistName}</Title>
        </Card>
    );

    return (
        <>
            {profileId.length > 0 ?
                <ArtistProfileScreen />
                :
                <SafeAreaView style={styles.artistsContainer}>
                    <FlatList
                        style={styles.listContainer}
                        data={allArtists}
                        renderItem={renderItem}
                        keyExtractor={track => track.id}
                        numColumns={2}
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
    card: {
        height: 'auto',
        width: '45%',
        margin: 10
    },
    cardTitle: {
        textAlign: 'center',
        width: '100%',
        backgroundColor: 'rgba(53, 53, 53, 0.94)',
        color: 'white',
        height: 'auto'
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
