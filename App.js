import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React, { useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';
import TrackPlayerServices from './service';
import { StyleSheet } from 'react-native';
import AccountPage from './screens/Account';
import MusicPage from './screens/Music';
import ExplorePage from './screens/Explore';
import LoginPage from './screens/Login';
import RegisterPage from './screens/Register';
import { TrackData } from './data/TrackData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from './constants/Colours';

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  useEffect(() => {
    TrackPlayer.setupPlayer().then(() => {
      // The player is ready to be used
    });

    TrackPlayer.registerPlaybackService(() => TrackPlayerServices);
  }, []);

  TrackPlayer.add([TrackData[0], TrackData[1]]).then(() => {
    // The tracks were added
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Music"
        activeColor={Colors.tabIconSelected}
        inactiveColor={Colors.tabIconDefault}
        barStyle={{ backgroundColor: Colors.tabBar }}>

        {/* <Tab.Screen
          name="Register"
          component={RegisterPage}
          options={{
            tabBarLabel: 'Register',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-plus" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginPage}
          options={{
            tabBarLabel: 'Login',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="login" color={color} size={26} />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Music"
          component={MusicPage}
          options={{
            tabBarLabel: 'Music',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="music" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Explore"
          component={ExplorePage}
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="music-box-multiple" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountPage}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});

export default App;
