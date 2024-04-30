import React from "react";
import {View, Text, SafeAreaView, ScrollView, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const SingUp =()=>{
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');
    const [username, onChangeUsername] = React.useState('');
    const [confirmPassword, onChangeConfirmPassword] = React.useState('');

    return(
        <SafeAreaView style={Styles.container}>
            <ScrollView style={Styles.ScrollView}>
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
                                onChangeText={onChangeUsername}
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
                                onChangeText={onChangeEmail}
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
                                onChangeText={onChangePassword}
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
                                onChangeText={onChangeConfirmPassword}
                                secureTextEntry
                            />
                        </View>
                        <Text style={Styles.textColor1}>By signing you agree to our <Text style={Styles.textColor2}>Terms of use and privacy notice</Text></Text>

                        <TouchableOpacity
                            style={Styles.button}
                            onPress={() => console.log('signed in')}
                        >
                            <Text style={Styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                        <Text style={Styles.textSign} >Already have an account? <Text style={Styles.textColor2}>Sign in</Text></Text>
                    </View>
                </View>
            </ScrollView>
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
    button: {
        backgroundColor: 'green',
        marginTop: 45,
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
    textColor1:{
        color: 'grey',
        fontSize: 15,
    },
    textColor2:{
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
});

export default SingUp;