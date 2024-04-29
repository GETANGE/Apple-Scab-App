import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

const LoginScreen = () => {
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return (
        <SafeAreaView style={styles.container}>
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
                            <Fontisto name="email" size={24} color="green" />
                            <Text style={styles.label}>Email</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            placeholderTextColor="grey"
                            value={email}
                            onChangeText={onChangeEmail}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <SimpleLineIcons name="lock" size={24} color="green" />
                            <Text style={styles.label}>Password</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor="grey"
                            value={password}
                            onChangeText={onChangePassword}
                            secureTextEntry
                        />
                    </View>
                </View>
                <Text style={styles.forget}>Forgot Password?</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log('Logged in')}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.textSign} >Don't have an account? Sign up</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
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
    }
});

export default LoginScreen;
