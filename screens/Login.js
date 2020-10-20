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
    const [errors, setErrors] = useState({
        email: 'invalid',
        password: 'invalid'
    });

    useEffect(() => {
        if (/\S+@\S+\.\S+/.test(email)) {
            setErrors({ ...errors, email: 'valid' })
        } else {
            setErrors({ ...errors, email: 'invalid' })
        }

        if (password.length > 5) {
            setErrors({ ...errors, password: 'valid' })
        } else {
            setErrors({ ...errors, password: 'invalid' })
        }
        console.log(errors)
    }, [email, password]);

    const validateForm = () => {
        if (errors.email === 'valid' && errors.password === 'valid') {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    }

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
                    onBlur={validateForm}
                />
                <TextInput
                    ref={passwordRef}
                    style={styles.input}
                    label="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                    onBlur={validateForm}
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
