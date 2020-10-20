import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';

import formStyles from '../styles/FormStyles';


const LoginScreen = ({navigation}) => {
    const user = useSelector(state => state.user);

    const emailRef = useRef();
    const passwordRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [formIsValid, setFormIsValid] = useState(false);

    const errors = {
        email: {
            valid: false
        },
        password: {
            valid: false
        }
    };

    useEffect(() => {
        errors.email.valid = /\S+@\S+\.\S+/.test(email);
        errors.password.valid = password.length >= 6;
        
        errors.email.valid && errors.password.valid ? setFormIsValid(true) : setFormIsValid(false);
    }, [email, password]);

    useEffect(() => {
        if(user) {
            
        }
    }, [user]);

    const login = async () => {
        await auth().signInWithEmailAndPassword(email, password).then(() => {
            navigation.navigate('Tabs', { screen: 'Music' });
        }).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email address already in use!');
            }

            if (error.code === 'auth/user-not-found') {
                alert('Email and/or password incorrect. Please try again');
            }
        });
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
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
                    secureTextEntry={true}
                />
                <Button disabled={!formIsValid} style={styles.button} mode="contained" onPress={login}>
                    Log in
                </Button>
            </View>
            <View style={styles.registerLinkContainer}>
                <Text style={styles.registerText}>Dont have an accout?.....</Text>
                <Button style={styles.registerLink} mode="text" onPress={() => navigation.navigate('Register')}>
                    register
                </Button>  
            </View>
        </View>
      );
}

const styles = StyleSheet.create(formStyles);

export default LoginScreen;
