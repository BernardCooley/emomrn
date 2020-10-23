import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { Text, IconButton, Title, Divider, Avatar, Subheading, List } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { artistProfileId } from '../Actions/index';
import TracksList from '../components/TracksList';
import PropTypes from 'prop-types';


const ArtistProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const currentprofileId = useSelector(state => state.artistProfileId);
    const allTracks = useSelector(state => state.tracks);
    const [currentProfile, setCurrentProfile] = useState({});
    const [currentProfileTracks, setCurrentProfileTracks] = useState({});

    useEffect(() => {
        if (currentprofileId.length > 0) {
            firestore().collection('users').doc(currentprofileId).get().then(response => {
                setCurrentProfile(response.data());
            })
        }
    }, [currentprofileId]);

    useEffect(() => {
        if(currentProfile) {
            setCurrentProfileTracks(allTracks.filter(track => track.artistId === currentProfile.userId));
        }
    }, [currentProfile]);

    const backToArtists = () => {
        navigation.navigate('Tabs', { screen: 'Music' });
        dispatch(artistProfileId(''));
    }

    return (
        <>
            {currentProfile ?
                <SafeAreaView>
                    <ScrollView style={styles.scrollView} contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'space-between'
                    }}>
                        <View style={styles.container}>
                            <IconButton style={styles.closeButton} animated icon="close" size={25} onPress={backToArtists} />
                            <Title style={StyleSheet.title}>{currentProfile.artistName}</Title>
                            <Divider />
                            <Avatar.Image style={styles.artistImage} size={300} source={{ uri: currentProfile.artistImageUrl }} />
                            <Divider />
                            {currentProfile.bio && currentProfile.bio.length > 0 &&
                                <>
                                    <Subheading style={styles.subHeading}>Bio</Subheading>
                                    <Text style={styles.detailText}>{currentProfile.bio}</Text>
                                    <Divider />
                                </>
                            }
                            {currentProfile.location && currentProfile.location.length > 0 &&
                                <>
                                    <Subheading style={styles.subHeading}>Location</Subheading>
                                    <Text style={styles.detailText}>London</Text>
                                    <Divider />
                                </>
                            }
                            {currentProfile.social && currentProfile.social.length > 0 &&
                                <>
                                    <Subheading style={styles.subHeading}>Social</Subheading>
                                    <Text style={styles.detailText}>Facebook Twitter Soundcloud</Text>
                                    <Divider />
                                </>
                            }
                        </View>
                    </ScrollView>
                    <Subheading style={styles.tracksDetail}>Tracks</Subheading>
                        {currentProfileTracks.length > 0 ? 
                            <TracksList tracks={currentProfileTracks} navigation={navigation} /> :
                            <Text style={styles.tracksDetail}>None</Text> 
                        }
                </SafeAreaView>:
                <View>
                <Text>No profile. Redirect back to tracks and alert</Text>
                </View>
            }
        </>
    );
}

ArtistProfileScreen.propTypes = {
    tracks: PropTypes.object,
    navigation: PropTypes.object
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 10,
        padding: 8,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    title: {
        textAlign: 'center',
        width: '100%',
        borderWidth: 1,
        fontSize: 50
    },
    closeButton: {
        position: 'absolute',
        top: 5,
        right: 5
    },
    artistImage: {
        marginVertical: 30
    },
    subHeading: {
        width: '100%'
    },
    tracksDetail: {
        paddingTop: 20,
        paddingHorizontal: 20
    },
    detailText: {
        width: '100%',
        marginBottom: 15
    }
});

export default ArtistProfileScreen;
