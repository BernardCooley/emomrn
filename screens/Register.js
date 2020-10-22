import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Image } from 'react-native';
import { TextInput, Button, Text, Avatar, IconButton, Snackbar } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import ImagePicker from 'react-native-image-picker';

import formStyles from '../styles/FormStyles';


const RegisterScreen = ({ navigation }) => {
    const storageRef = storage().ref('');
    const [artistName, setArtistName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [artistImage, setArtistImage] = useState({});
    const [bio, setBio] = useState('');

    const [formIsValid, setFormIsValid] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');

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
            let split = response.path.split('.');
            split = split[split.length - 1];
            setArtistImage({
                uri: response.uri,
                name: response.fileName,
                path: response.path,
                ext: split
            })
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

    const printData = () => {
        console.log();
    }

    const register = async () => {
        auth().createUserWithEmailAndPassword(email, password).then(async newUserData => {
            await firestore().collection('users').doc(newUserData.user.uid).set({
                userId: newUserData.user.uid,
                artistName: artistName,
                bio: bio
            }).then(async () => {
                const reference = storage().ref(`bandImages/${newUserData.user.uid}.${artistImage.ext}`);

                await reference.putFile(`file://${artistImage.path}`).then(response => {
                    navigation.navigate('Explore');
                }).catch(error => {
                    console.log(error);
                });
            });
        }).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                setSnackBarMessage('Email address already in use! Are you already registered?')
            }
        });
    }

    return (
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
                    <Button mode="contained" onPress={printData}>
                        print data
            </Button>
                </ScrollView>
            </SafeAreaView>
            <Snackbar
                visible={snackBarMessage.length > 0}
                onDismiss={() => setSnackBarMessage('')}
                action={{
                    label: 'Yes',
                    onPress: () => {
                        navigation.navigate('Login');
                    },
                }}>
                {snackBarMessage}
            </Snackbar>
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
