import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { TextInput, Button, Text, Avatar, IconButton } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

import formStyles from '../styles/FormStyles';


const RegisterScreen = ({ navigation }) => {
    const [artistName, setArtistName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [artistImage, setArtistImage] = useState({});
    const [bio, setBio] = useState('');

    const [formIsValid, setFormIsValid] = useState(false);

    const errors = {
        artistName: {
            valid: false
        },
        email: {
            valid: false
        },
        password: {
            valid: false
        }
    };

    useEffect(() => {
        validate();
    }, [artistName, email, password, artistImage, bio]);

    const lauchFileUploader = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            setArtistImage(res);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const validate = () => {
        errors.artistName.valid = artistName.length > 0;
        errors.email.valid = /\S+@\S+\.\S+/.test(email);
        errors.password.valid = password.length >= 6;

        errors.artistName.valid && errors.email.valid && errors.password.valid ? setFormIsValid(true) : setFormIsValid(false);
    }

    const removeImage = () => {
        setArtistImage({});
    }

    const register = () => {
        console.log(artistName);
        console.log(email);
        console.log(password);
        console.log(artistImage);
        console.log(bio);
    }

    return (
        <SafeAreaView>
            <ScrollView style={styles.scrollView} contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'space-between'
            }}>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            label="Artist name"
                            value={artistName}
                            onChangeText={artistName => setArtistName(artistName)}
                        />
                        <TextInput
                            style={styles.input}
                            label="Email"
                            value={email}
                            onChangeText={email => setEmail(email)}
                        />
                        <TextInput
                            style={styles.input}
                            label="Password"
                            value={password}
                            onChangeText={password => setPassword(password)}
                        />
                        <TextInput
                            style={styles.input}
                            label="Bio (optional)"
                            value={bio}
                            onChangeText={bio => setBio(bio)}
                            multiline
                        />
                        <Text style={styles.artistImageLabel}>Artist image (optional)</Text>
                        {artistImage.uri ?
                            <View style={styles.artistImageContainer}>
                                <Avatar.Image style={styles.artistImage} size={300} source={{ uri: artistImage.uri }} />
                                <Text onPress={removeImage} style={styles.deleteImageButton}>delete</Text>
                            </View> :
                            <IconButton style={styles.uploadButton} animated icon="camera" size={30} onPress={lauchFileUploader}/>
                        }
                        <Button disabled={!formIsValid} style={styles.button} mode="contained" onPress={register}>
                            Register
                        </Button>
                    </View>
                    <View style={styles.registerLinkContainer}>
                        <Text style={styles.registerText}>Already registered?.....</Text>
                        <Button style={styles.registerLink} mode="text" onPress={() => navigation.navigate('Login')}>
                            log in
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    ...formStyles,
    scrollView: {

    },
    artistImageContainer: {
        marginTop: 20,
        flex: 1,
        alignItems: 'center'
    },
    artistImage: {
        margin: 'auto'
    },
    uploadButton: {
        marginLeft: 15
    },
    artistImageLabel: {
        fontSize: 20,
        color: 'gray',
        paddingLeft: 25,
        paddingTop: 25
    },
    deleteImageButton: {
        color: 'red',
        marginTop: 10,
        fontSize: 15
    }
});

export default RegisterScreen;
