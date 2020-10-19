import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import TrackPlayer from 'react-native-track-player';
import TrackPlayerServices from './service';
import { StyleSheet } from 'react-native';
import { Box } from 'react-native-design-utility';
import { ActivityIndicator } from 'react-native-paper';
import { PlayerContextProvider } from './contexts/PlayerContext';
import MainStackNavigator from './navigation/MainStackNavigation';
import rootReducer from './Reducers';
import { Provider } from 'react-redux';
import { createStore } from 'redux'

const App = () => {
  const store = createStore(rootReducer);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      TrackPlayer.registerPlaybackService(() => TrackPlayerServices);
      setIsReady(true);
      console.log('ready--------------------');
    });
  }, []);

  return (
    <Provider store={store}>
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
    </Provider>
  );
}

const styles = StyleSheet.create({

});

export default App;
