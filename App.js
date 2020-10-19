import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import TrackPlayerServices from './service';
import { StyleSheet } from 'react-native';
import { Box } from 'react-native-design-utility';
import { ActivityIndicator } from 'react-native-paper';
import { PlayerContextProvider } from './contexts/PlayerContexts';
import MainStackNavigator from './navigation/MainStackNavigation';

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.registerPlaybackService(() => TrackPlayerServices);
      setIsReady(true);
      console.log('ready--------------------');
    });
  }, []);

  return (
    <>
      {isReady ?
        <PlayerContextProvider>
          <NavigationContainer>
            <MainStackNavigator/>
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

const styles = StyleSheet.create({

});

export default App;
