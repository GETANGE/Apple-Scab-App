import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, StatusBar, TextInput } from 'react-native';

const LoginScreen = () => {
    const [name, onChangeName] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [password, onChangePassword] = React.useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/login.png')}
                    style={styles.image}
                />
                <Text style={styles.text}>Login</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your username"
                        placeholderTextColor="grey"
                        value={name}
                        onChangeText={onChangeName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your email"
                        placeholderTextColor="grey"
                        value={email}
                        onChangeText={onChangeEmail}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
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
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: StatusBar.currentHeight || 0
    },
    imageContainer:{
        alignItems: 'center',
    },
    image:{
        width: 200,
        height: 200
    },
    text:{
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000'
    },
    input:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: '#000',
        borderRadius: 10,
        color: '#000',
        width: 300,
    }
});

export default LoginScreen;
