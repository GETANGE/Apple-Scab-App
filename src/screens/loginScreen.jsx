import React, { useState } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from '../components/Tabs';
import axios from 'axios';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLogged] = useState(false);

    function handleSubmit() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            ToastAndroid.show("Invalid email", ToastAndroid.SHORT);
            return;
        }
    
        if (!password || password.trim() === "") {
            ToastAndroid.show("Password cannot be empty", ToastAndroid.SHORT);
            return;
        }

        const userData = {
            email: email,
            password: password,
        };
        axios.post("https://apple-plant-disease.onrender.com/api/v1/user/login", userData)
            .then(res => {
                console.log(JSON.stringify(res.data, null, 2));

                if (res.data.status === 'success') {
                    ToastAndroid.show('Logged in successfully!', ToastAndroid.SHORT);
                    AsyncStorage.setItem('token', res.data.token);
                    AsyncStorage.setItem('isLocked', JSON.stringify(true));
                    setIsLogged(true);
                } else {
                    ToastAndroid.show('Login failed. Please check your credentials.', ToastAndroid.SHORT);
                }
            })
            .catch(error => {
                console.log(error);
                ToastAndroid.show('Login failed. Please check your credentials.', ToastAndroid.SHORT);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            { isLoggedIn ? ( 
                <Tabs/> 
            ): (
                <ScrollView style={styles.ScrollView} keyboardShouldPersistTaps="always">
                <View style={styles.content}>
                    <Image
                        source={require('../../assets/login.png')}
                        style={styles.image}
                    />
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subTitle}>Sign in to your account</Text>
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <FontAwesome name="envelope" size={24} color="green" />
                                <Text style={styles.label}>Email</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your email"
                                placeholderTextColor="grey"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />

                        </View>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <FontAwesome name="lock" size={24} color="green" />
                                <Text style={styles.label}>Password</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your password"
                                placeholderTextColor="grey"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry
                            />
                        </View>
                    </View>
                    <Text style={styles.forget} onPress={()=>navigation.navigate("ForgotPassword")}>Forgot Password?</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.textSign} >Don't have an account? <Text style={styles.textColor2} onPress={()=>navigation.navigate("Register")}>Sign up</Text></Text>
                </View>
            </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        width: '100%',
        height: '100%',
        
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%'
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'green'
    },
    subTitle:{
        fontSize: 16,
        color: 'grey'
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 20,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: 'green',
        marginLeft: 10,
    },
    input: {
        height: 40,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10,
        color: '#333',
        backgroundColor: 'whitesmoke',
        borderWidth: 0,
    },
    forget: {
        color: 'green',
        marginLeft: 200
    },
    button: {
        backgroundColor: 'green',
        marginTop: 55,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        width: '100%', // Adjust the width as needed
        alignItems: 'center', // Center the content horizontally
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    textSign:{
        color: 'grey',
        marginTop: 10
    },
    ScrollView:{
        width: '100%',
        height: '100%',
        marginTop: 50
    },
    textColor2:{
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});

export default LoginScreen;
