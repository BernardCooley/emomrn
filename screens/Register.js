import React, { useRef, useState } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

import formStyles from '../styles/FormStyles';


const RegisterScreen = ({navigation}) => {
    const artistNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const artistImageRef = useRef();
    const bioRef = useRef();

    const [artistName, setArtistName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [artistImage, setArtistImage] = useState('');
    const [bio, setBio] = useState('');

    const [formIsValid, setFormIsValid] = useState(false);

    useEffect(() => {
        
    }, [artistName, email, password, artistImage, bio])

    const register = () => {
        console.log(artistName);
        console.log(email);
        console.log(password);
        console.log(artistImage);
        console.log(bio);
    }

    return (
        <SafeAreaView>
            <ScrollView>
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <TextInput
                    ref={artistNameRef}
                    style={styles.input}
                    label="Artist name"
                    value={artistName}
                    onChangeText={artistName => setArtistName(artistName)}
                />
                <TextInput
                    ref={emailRef}
                    style={styles.input}
                    label="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                />
                <TextInput
                    ref={passwordRef}
                    style={styles.input}
                    label="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                />
                <TextInput
                    ref={artistImageRef}
                    style={styles.input}
                    label="Artist image (optional)"
                    value={artistImage}
                    onChangeText={artistImage => setArtistImage(artistImage)}
                />
                <TextInput
                    ref={bioRef}
                    style={styles.input}
                    label="Bio (optional)"
                    value={bio}
                    onChangeText={bio => setBio(bio)}
                />
                    <Button disabled={!formIsValid} style={styles.button} mode="contained" onPress={register}>
                    Register
                </Button>
            </View>
            <View style={styles.registerLinkContainer}>
                <Text>Already registered? Log in... </Text>
                <Button style={styles.registerLink} mode="text" onPress={() => navigation.navigate('Login')}>
                    here
                </Button>
            </View>
        </View>
            </ScrollView>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create(formStyles);

export default RegisterScreen;
