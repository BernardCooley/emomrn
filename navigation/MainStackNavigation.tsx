import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MainTabNavigator from './MainTabNavigation';

const MainStack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <MainStack.Navigator headerMode='none'>
            <MainStack.Screen name='Tabs' component={MainTabNavigator}/>
        </MainStack.Navigator>
    )
}

export default MainStackNavigator;