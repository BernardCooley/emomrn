import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { currentScreen } from '../Actions/index';


const MusicScreen = ({navigation}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(currentScreen('Music'));
        });

        return(() => {
            unsubscribe()
        })
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            dispatch(currentScreen(''));
        });

        return (() => {
            unsubscribe()
        })
    }, [navigation]);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Music</Text>
        </View>
      );
}

const styles = StyleSheet.create({

});

export default MusicScreen;
