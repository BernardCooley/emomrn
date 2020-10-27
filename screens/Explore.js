import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TracksScreen from '../screens/Tracks';
import ArtistsScreen from '../screens/Artists';

const ExploreScreen = ({ navigation }) => {
    const ExploreTab = createMaterialTopTabNavigator();

    return (
            <ExploreTab.Navigator>
                <ExploreTab.Screen name="Tracks" component={TracksScreen} />
                <ExploreTab.Screen name="Artists" component={ArtistsScreen} />
            </ExploreTab.Navigator>
    );
}

export default ExploreScreen;
