import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import TrackPlayerServices from './service';

TrackPlayer.setupPlayer().then(() => {
  // The player is ready to be used
});

TrackPlayer.registerPlaybackService(() => TrackPlayerServices);

var track = {
    id: 'unique track id', // Must be a string, required
  url:
    'file://C:/Users/berna/Google Drive/Ableton projects/Wave Function/Takes/Tape Twelve - Wave Function (draft 1)', // Load media from the file system
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
  artwork:
    'file://C:/Users/berna/Google Drive/Camera Uploads/2016-11-27 22.01.07', // Load artwork from the file system
};

var track2 = {
  id: 'unique track id', // Must be a string, required
  url:
    'file://C:/Users/berna/Google Drive/Ableton projects/Wave Function/Takes/Tape Twelve - Wave Function (draft 1)', // Load media from the file system
  title: 'Avaritia',
  artist: 'deadmau5',
  album: 'while(1<2)',
  genre: 'Progressive House, Electro House',
  date: '2014-05-20T07:00:00+00:00', // RFC 3339
  artwork:
    'file://C:/Users/berna/Google Drive/Camera Uploads/2016-11-27 22.01.07', // Load artwork from the file system
};

TrackPlayer.add([track, track2]).then(function () {
  // The tracks were added
});

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });

export default App;
