import React from "react";
import {View, Text, SafeAreaView, ScrollView, Pressable, TextInput, StyleSheet, ToastAndroid, Modal} from "react-native";
import CustomButton from "../components/CustomButton";
import LoginScreen from "./loginScreen";
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";
import { useState } from "react";

const SingUp =()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState(true);


    function handleSubmit(){

        if (!password || password.trim() === "") {
            ToastAndroid.show("Password cannot be empty", ToastAndroid.SHORT);
            return;
        }
        
        if (!confirmPassword || confirmPassword.trim() === "") {
            ToastAndroid.show("Please confirm your password", ToastAndroid.SHORT);
            return;
        }
        
        if (password !== confirmPassword) {
            ToastAndroid.show("Passwords do not match", ToastAndroid.SHORT);
            return;
        }
        
        if(!username){
            ToastAndroid.show("Username cannot be empty", ToastAndroid.SHORT)
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
            ToastAndroid.show("Invalid email", ToastAndroid.SHORT);
            return;
        }
        
        const newUserData = {
            email: email,
            password:  password,
            passwordConfirm: confirmPassword,
            name: username
        };
        axios.post("https://apple-plant-disease.onrender.com/api/v1/user/signup", newUserData)
            .then(res =>{
                console.log(JSON.stringify(res.data, null, 2));

                if(res.data.status === "success"){
                    ToastAndroid.show("Registration successful", ToastAndroid.SHORT)
                    setIsRegistered(true);
                }else{
                    ToastAndroid.show("Registration failed", ToastAndroid.SHORT)
                    setErrorMessage(res.data.message);
                    setModalVisible(true);
                }
            })
            .catch(error => {
                console.error('Error:', error.response.data.message);
                setErrorMessage(res.data.message);
                setModalVisible(true);
            })
    }

    return(
        <SafeAreaView style={Styles.container}>
            { isRegistered ? <LoginScreen/> : <ScrollView style={Styles.ScrollView}>
                <View style={Styles.content}>
                    <Text style={Styles.title}>Register</Text>
                    <Text style={Styles.subTitle}>Create your new account</Text>

                    <View style={Styles.form}>
                        <View style={Styles.inputContainer}>
                            <View style={Styles.iconContainer}>
                                <FontAwesome name="user" size={24} color="green" />
                                <Text style={Styles.label}>Username</Text>
                            </View>
                            <TextInput
                                placeholder="Username"
                                style={Styles.input}
                                placeholderTextColor="grey"
                                value={username}
                                onChangeText={text => setUsername(text)}
                            />
                        </View>
                        <View style={Styles.inputContainer}>
                            <View style={Styles.iconContainer}>
                                <FontAwesome name="envelope" size={24} color="green" />
                                <Text style={Styles.label}>Email</Text>
                            </View>
                            <TextInput
                                placeholder="Enter your email"
                                style={Styles.input}
                                placeholderTextColor="grey"
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                        </View>
                        <View style={Styles.inputContainer}>
                            <View style={Styles.iconContainer}>
                                <FontAwesome name="lock" size={24} color="green" />
                                <Text style={Styles.label}>Password</Text>
                            </View>
                                <TextInput
                                placeholder="Enter your password"
                                style={Styles.input}
                                placeholderTextColor="grey"
                                value={password}
                                onChangeText={text => setPassword(text)}
                                secureTextEntry
                            />
                            </View>
                        <View style={Styles.inputContainer}>
                            <View style={Styles.iconContainer}>
                                <FontAwesome name="lock" size={24} color="green" />
                                <Text style={Styles.label}>Confirm Password</Text>
                            </View>
                                <TextInput
                                placeholder="Enter your password"
                                placeholderTextColor="grey"
                                style={Styles.input}
                                value={confirmPassword}
                                onChangeText={text => setConfirmPassword(text)}
                                secureTextEntry
                            />
                        </View>
                        <Text style={Styles.textColor1}>By signing you agree to our <Text style={Styles.textColor2}>Terms of use and privacy notice</Text></Text>
                            <CustomButton
                                onPress={handleSubmit}
                                buttonText="Sign Up"
                            />
                        <Text style={Styles.textSign} >Already have an account? <Text style={Styles.textColor2}>Sign in</Text></Text>
                    </View>
                </View>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={Styles.centeredView}>
                    <View style={Styles.modalView}>
                        <Text style={Styles.modalText}>{errorMessage}</Text>
                        <Pressable
                            style={[Styles.button, Styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={Styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            </ScrollView>}

        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        marginTop: 20
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
        color: 'grey',
        marginBottom: 20
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
    textSign:{
        color: 'grey',
        marginTop: 10
    },
    ScrollView:{
        width: '100%',
        height: '100%',
        marginTop: 50
    },
    textColor1:{
        color: 'grey',
        fontSize: 15,
    },
    textColor2:{
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonClose: {
        backgroundColor: "green",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default SingUp;