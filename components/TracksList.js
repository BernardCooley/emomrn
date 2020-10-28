import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, IconButton, List, Divider, Menu } from 'react-native-paper';
import { usePlayerContext } from '../contexts/PlayerContext';
import storage from '@react-native-firebase/storage';
import { useDispatch } from 'react-redux';
import { artistProfileId } from '../Actions/index';


const TracksList = ({ navigation, tracks }) => {
    const dispatch = useDispatch();
    const playerContext = usePlayerContext();
    const [showMenu, setShowMenu] = useState(false);
    const [menuLocation, setMenuLocation] = useState({});
    const [clickedTrack, setClickedTrack] = useState('');

    const openMenu = (e, track) => {
        setClickedTrack(track);
        setMenuLocation({
            x: e.nativeEvent.pageX,
            y: e.nativeEvent.pageY
        })
        setShowMenu(true);
    }

    const playTrack = async track => {
        await storage().ref(`tracks/${track.id}.mp3`).getDownloadURL().then(url => {
            track['url'] = url;
            playerContext.play(track);
            navigation.navigate('Tabs', { screen: 'Music' });
        });
    }

    const queueTrack = async () => {
        setShowMenu(false);
        await storage().ref(`tracks/${clickedTrack.id}.wav`).getDownloadURL().then(url => {
            clickedTrack['url'] = url;
            playerContext.play(clickedTrack, true);
            navigation.navigate('Tabs', { screen: 'Music' });
        });
    }

    const artistProfile = () => {
        setShowMenu(false);
        dispatch(artistProfileId(clickedTrack.artistId));
        navigation.navigate('Profile');
    }

    const closeMenu = () => {
        setShowMenu(false);
    }

    const TracksList = () => (
        <>
            {
                Object.keys(tracks).map((key, index) => (
                    <View key={index}>
                        <List.Item
                            titleNumberOfLines={1}
                            descriptionNumberOfLines={1}
                            titleEllipsizeMode='tail'
                            descriptionEllipsizeMode='tail'
                            titleStyle={{ fontSize: 16 }}
                            descriptionStyle={{ fontSize: 24 }}
                            style={styles.listItem}
                            title={tracks[key].artist}
                            description={tracks[key].title}
                            left={() =>
                                <Avatar.Image style={styles.trackImage} size={50} source={{ uri: tracks[key].trackImage }} />
                            }
                            right={() =>
                                <IconButton animated icon="dots-vertical" size={30} onPress={e => openMenu(e, tracks[key])} />
                            }
                            onPress={() => playTrack(tracks[key])}
                        />
                        <Divider />
                    </View>
                ))
            }
        </>
    );
    return (
        <>
            <Menu
                visible={showMenu}
                onDismiss={closeMenu}
                anchor={menuLocation}>
                <Menu.Item onPress={() => queueTrack()} icon="plus-box-multiple" title="Queue track" />
                <Divider />
                <Menu.Item onPress={() => artistProfile()} icon="account-box" title="Artist profile" />
            </Menu>
            <TracksList />
        </>
    );
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

export default TracksList;
