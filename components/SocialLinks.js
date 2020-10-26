import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { IconButton, Subheading } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';


const SocialLinks = ({ socials }) => {

    const openUrl = url => {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                alert("Can't open: " + url);
            }
        });
    }

    return (
        <>
            <View style={styles.socialLinks}>
                {
                    Object.keys(socials).map((key, index) => (
                        <TouchableOpacity key={index} onPress={() => openUrl(socials[key].url)}>
                            <IconButton animated icon={socials[key].name} size={30} />
                        </TouchableOpacity>
                    ))
                }
            </View>
        </>
    );
}

SocialLinks.propTypes = {
    socials: PropTypes.array
}

const styles = StyleSheet.create({
    socialLinks: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    }
});

export default SocialLinks;
