import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { tracks, artists } from '../Actions/index';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import storage from '@react-native-firebase/storage';

import TracksScreen from '../screens/Tracks';
import ArtistsScreen from '../screens/Artists';

const ExploreScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const ExploreTab = createMaterialTopTabNavigator();
    const allTracks = useSelector(state => state.tracks);
    const [tracksTemp, setTracksTemp] = useState([]);

    useEffect(() => {
        firestore().collection('tracks').onSnapshot(getTracks, onError);
        firestore().collection('users').onSnapshot(getArtists, onError);
    }, []);

    useEffect(() => {
        getTrackImages();
        console.log('+++++++++++++++++++++++')
    }, [tracksTemp]);

    const getTracks = async QuerySnapshot => {
        setTracksTemp(QuerySnapshot.docs.map(data => {
            const trackData = data.data();
            return trackData;
        }));
    }

    const getTrackImages = () => {
        const tr = [];

        tracksTemp.map(async (track, index) => {
            await storage().ref(`trackImages/${track.id}.jpg`).getDownloadURL().then(url => {
                track['trackImage'] = url;
                tr.push(track);
            }).catch(error => {
                console.log('GET TRACK IMAGE =========>', error)
            })
            if (index === tracksTemp.length - 1) {
                dispatch(tracks(tr));
            }
        })

        
    }

    const getArtists = QuerySnapshot => {
        dispatch(artists(QuerySnapshot.docs.map(data => {
            const artistData = data.data();
            artistData['trackAmount'] = allTracks.length > 0 ? allTracks.filter(track => track.artistId === artistData.userId).length : 0;
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
