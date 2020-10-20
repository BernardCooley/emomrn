import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import TrackPlayerServices from '../service';
import { Box } from 'react-native-design-utility';
import { ActivityIndicator } from 'react-native-paper';
import { PlayerContextProvider } from '../contexts/PlayerContext';
import MainStackNavigator from '../navigation/MainStackNavigation';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { user } from '../Actions/index';

const Main = () => {
    const dispatch = useDispatch();

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        TrackPlayer.setupPlayer().then(() => {
            TrackPlayer.registerPlaybackService(() => TrackPlayerServices);
            setIsReady(true);
            console.log('ready--------------------');
        });
    }, []);

    useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }, []);

    const onAuthStateChanged = (loggedInUser) => {
        dispatch(user(loggedInUser));

        

        console.log('---------------------------------------------');
        console.log(loggedInUser);
        console.log('---------------------------------------------');
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
