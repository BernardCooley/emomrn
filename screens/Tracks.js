import React from 'react';
import { StyleSheet, SafeAreaView, BackHandler, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useFocusEffect } from "@react-navigation/native";
import TracksList from '../components/TracksList';
import PropTypes from 'prop-types';


const TracksScreen = ({ navigation }) => {
    const allTracks = useSelector(state => state.tracks);

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                Alert.alert("Exit app", "Are you sure you want to exit?", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
                ]);
                return true;
            };

            BackHandler.addEventListener("hardwareBackPress", onBackPress);

            return () =>
                BackHandler.removeEventListener("hardwareBackPress", onBackPress);

        }, [])
    );

    return (
        <>
            {allTracks &&
                <SafeAreaView style={styles.container}>
                    <TracksList tracks={allTracks} navigation={navigation} />
                </SafeAreaView>
            }
        </>
    );
}

TracksScreen.propTypes = {
    tracks: PropTypes.object,
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    listItem: {
        width: '100%',
        height: 80
    },
    trackImage: {
        height: 80,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    }
});

export default TracksScreen;
