import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

import formStyles from '../styles/FormStyles';


const LoginScreen = ({navigation}) => {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [formIsValid, setFormIsValid] = useState(false);

    const errors = {
        email: 'invalid',
        password: 'invalid'
    };

    useEffect(() => {
        errors.email = /\S+@\S+\.\S+/.test(email) ? 'valid': 'invalid';
        errors.password = password.length >= 6 ? 'valid': 'invalid';
        
        errors.email === 'valid' && errors.password === 'valid' ? setFormIsValid(true) : setFormIsValid(false);
    }, [email, password]);

    const login = () => {
        console.log(email);
        console.log(password);
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
                />
                <Button disabled={!formIsValid} style={styles.button} mode="contained" onPress={login}>
                    Log in
                </Button>
            </View>
            <View style={styles.registerLinkContainer}>
                <Text>Dont have an accout? Register... </Text>
                <Button style={styles.registerLink} mode="text" onPress={() => navigation.navigate('Register')}>
                    here
                </Button>  
            </View>
        </View>
      );
}

const styles = StyleSheet.create(formStyles);

export default LoginScreen;
