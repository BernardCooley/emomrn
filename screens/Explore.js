import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { tracks, artists } from '../Actions/index';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import storage from '@react-native-firebase/storage';

import TracksScreen from '../screens/Tracks';
import ArtistsScreen from '../screens/Artists';

const ExploreScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const ExploreTab = createMaterialTopTabNavigator();

    useEffect(() => {
        firestore().collection('tracks').onSnapshot(getTracks, onError);
        firestore().collection('users').onSnapshot(getArtists, onError);
    }, []);

    const getTracks = QuerySnapshot => {
        allTracks = [];
        QuerySnapshot.docs.map(async data => {
            const trackData = data.data();
            await storage().ref(`trackImages/${trackData.id}.jpg`).getDownloadURL().then(url => {
                trackData['trackImage'] = url;
                dispatch(tracks([...allTracks, trackData]));
            });
        });
    }

    const getArtists = QuerySnapshot => {
        dispatch(artists(QuerySnapshot.docs.map(data => {
            const artistData = data.data();
            artistData['trackAmount'] = allTracks.filter(track => track.artistId === artistData.userId).length;
            return artistData;
        })));
    }

    const onError = error => {
        console.log(error);
    }

    return (
            <ExploreTab.Navigator>
                <ExploreTab.Screen name="Tracks" component={TracksScreen} />
                <ExploreTab.Screen name="Artists" component={ArtistsScreen} />
            </ExploreTab.Navigator>
    );
}

const styles = StyleSheet.create({

});

export default ExploreScreen;
