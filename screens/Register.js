import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { TextInput, Button, Text, Avatar, IconButton, Snackbar, ActivityIndicator } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import { Box } from 'react-native-design-utility';

import formStyles from '../styles/FormStyles';


const RegisterScreen = ({ navigation }) => {
    const [artistName, setArtistName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [artistImage, setArtistImage] = useState({});
    const [bio, setBio] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const [formIsValid, setFormIsValid] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

    const options = {
        title: 'Select artist image',
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

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
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let split = response.path.split('.');
                split = split[split.length - 1];

                if (split === 'jpeg' || split === 'jpg' || split === 'png') {
                    setArtistImage({
                        uri: response.uri,
                        name: response.fileName,
                        path: response.path,
                        ext: split
                    })
                } else {
                    setSnackBarMessage(`Only jpeg, jpg, png allowed.`);
                }
            }
        });
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

    const register = async () => {
        setIsRegistering(true);
        auth().createUserWithEmailAndPassword(email, password).then(async newUserData => {
            await firestore().collection('users').doc(newUserData.user.uid).set({
                userId: newUserData.user.uid,
                artistName: artistName,
                bio: bio
            }).then(async () => {
                let reference = null;

                if (artistImage.name) {
                    reference = storage().ref(`/artistImages/${newUserData.user.uid}.${artistImage.ext}`);

                    await reference.putFile(`file://${artistImage.path}`).then(async response => {
                        await getDownloadUrl(response).then(url => {
                            storeArtistDetails(url, newUserData).then(result => {
                                if (result) {
                                    setIsRegistering(false);
                                    navigation.navigate('Tabs', { screen: 'Ecplore' });
                                }
                            })
                        })
                    }).catch(error => {
                        console.log('IMAGE UPLOAD ============>', error);
                    });
                } else {
                    reference = storage().ref(`default.png`);

                    await getDownloadUrl().then(url => {
                        storeArtistDetails(url, newUserData).then(result => {
                            if (result) {
                                setIsRegistering(false);
                                navigation.navigate('Tabs', { screen: 'Ecplore' });
                            }
                        })
                    })
                }
            });
        }).catch(error => {
            console.log('REGISTER USER =============>', error);
            if (error.code === 'auth/email-already-in-use') {
                setSnackBarMessage('Email address already in use!')
            }
        });
    }

    const getDownloadUrl = async (response) => {
        const file = response ? `${response.metadata.fullPath}` : 'default.png';

        return await storage().ref(file).getDownloadURL().then(async url => {
            return url;
        }).catch(error => {
            console.log('GET DOWNLOAD URL =============>', error);
        })
    }

    const storeArtistDetails = async (url, newUserData) => {
        return await firestore().collection('users').doc(newUserData.user.uid).update({
            artistImageUrl: url
        }).then(() => {
            return true;
        }).catch(error => {
            console.log('STORE ARTIST DETAILS =============>', error);
            return false
        })
    }

    return (
        <>
            {isRegistering ?
                <Box f={1} center>
                    <ActivityIndicator size='large' />
                </Box> :
                <>
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
                                        secureTextEntry={true}
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
                                        <IconButton style={styles.uploadButton} animated icon="camera" size={30} onPress={lauchFileUploader} />
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
                    <Snackbar
                        visible={snackBarMessage.length > 0}
                        onDismiss={() => setSnackBarMessage('')}
                        action={{
                            label: 'Ok',
                            onPress: () => { },
                        }}>
                        {snackBarMessage}
                    </Snackbar></>
            }
        </>
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
