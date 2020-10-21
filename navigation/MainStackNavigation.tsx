import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainTabNavigator from './MainTabNavigation';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import { useSelector } from 'react-redux';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
    const user = useSelector((state: { user: any; }) => state.user);

    return (
        <MainStack.Navigator headerMode='none'>
            {/* <MainStack.Screen name='Login' component={LoginScreen} />
            <MainStack.Screen name='Register' component={RegisterScreen} /> */}
            <MainStack.Screen name='Tabs' component={MainTabNavigator} />
        </MainStack.Navigator>
    )
}

export default MainStackNavigator;