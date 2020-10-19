import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MusicScreen from '../screens/Music';
import ExploreScreen from '../screens/Explore';
import AccountScreen from '../screens/Account';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import MiniPlayer from '../components/MiniPlayer';

const MusicScreenStack = createStackNavigator();
const ExploreScreenStack = createStackNavigator();
const AccountScreenStack = createStackNavigator();

const MusicScreenStackNavigator = () => {
  return (
    <MusicScreenStack.Navigator>
      <MusicScreenStack.Screen name='Music' component={MusicScreen} />
    </MusicScreenStack.Navigator>
  )
}

const ExploreScreenStackNavigator = () => {
  return (
    <ExploreScreenStack.Navigator>
      <ExploreScreenStack.Screen name='Explore' component={ExploreScreen} />
    </ExploreScreenStack.Navigator>
  )
}

const AccountScreenStackNavigator = () => {
  return (
    <AccountScreenStack.Navigator>
      <AccountScreenStack.Screen name='Account' component={AccountScreen} />
    </AccountScreenStack.Navigator>
  )
}

const MainTab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <MainTab.Navigator
      tabBar={tabsProps => (
        <>
          <MiniPlayer />
          <BottomTabBar {...tabsProps} />
        </>
      )}>
      <MainTab.Screen
        name="Music"
        component={MusicScreenStackNavigator}
        options={{
          tabBarLabel: 'Music',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="music" color={color} size={26} />
          ),
        }} />
      <MainTab.Screen
        name="Explore"
        component={ExploreScreenStackNavigator}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="music-box-multiple" color={color} size={26} />
          ),
        }} />
      <MainTab.Screen
        name="Account"
        component={AccountScreenStackNavigator}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }} />
    </MainTab.Navigator>
  )
}

export default MainTabNavigator;