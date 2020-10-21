import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import TrackPlayerServices from '../service';
import { Box } from 'react-native-design-utility';
import { ActivityIndicator } from 'react-native-paper';
import { PlayerContextProvider } from '../contexts/PlayerContext';
import MainStackNavigator from '../navigation/MainStackNavigation';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { user, tracks } from '../Actions/index';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const Main = () => {
    let allTracks = useSelector(state => state.tracks);
    const dispatch = useDispatch();

    const [isReady, setIsReady] = useState(false);
    const tracksCollection = firestore().collection('tracks');

    useEffect(() => {
        TrackPlayer.setupPlayer().then(() => {
            TrackPlayer.registerPlaybackService(() => TrackPlayerServices);
            setIsReady(true);
        });
    }, []);

    useEffect(() => {
        auth().onAuthStateChanged(onAuthStateChanged);
        tracksCollection.onSnapshot(onResult, onError);
    }, []);

    const onResult = (QuerySnapshot: any) => {
        allTracks = [];
        QuerySnapshot.docs.map(async(data: { data: () => any; }) => {
            const trackData = data.data();
            await storage().ref(`trackImages/${trackData.id}.jpg`).getDownloadURL().then(url => {
                trackData['trackImage'] = url;
                dispatch(tracks([...allTracks, trackData]));
            });
        });
    }

    const onError = (error: any) => {
        console.log(error);
    }

    const onAuthStateChanged = (loggedInUser) => {
        dispatch(user(loggedInUser));
    }

    return (
        <>
            {isReady ?
                <PlayerContextProvider>
                    <NavigationContainer>
                        <MainStackNavigator />
                    </NavigationContainer>
                </PlayerContextProvider>
                : (
                    <Box f={1} center>
                        <ActivityIndicator />
                    </Box>
                )}
        </>
    );
}

export default Main;
