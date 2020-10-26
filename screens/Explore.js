import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { artists } from '../Actions/index';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';

import TracksScreen from '../screens/Tracks';
import ArtistsScreen from '../screens/Artists';

const ExploreScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const ExploreTab = createMaterialTopTabNavigator();
    const allTracks = useSelector(state => state.tracks);
    const [tracksTemp, setTracksTemp] = useState([]);

    useEffect(() => {
        firestore().collection('users').onSnapshot(getArtists, onError);
    }, []);

    const getArtists = QuerySnapshot => {
        dispatch(artists(QuerySnapshot.docs.map(data => {
            const artistData = data.data();
            
            if(allTracks.length > 0) {
                artistData['trackAmount'] = allTracks.filter(track => track.artistId === artistData.userId).length;
            }else {
                artistData['trackAmount'] = 0;
            }
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
