import React from 'react';
import { StyleSheet } from 'react-native';
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

const styles = StyleSheet.create({

});

export default ExploreScreen;
