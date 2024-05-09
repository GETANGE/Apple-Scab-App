import React from 'react';
import { SafeAreaView, View, Text, ScrollView , Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const ResetPassword = () => {
    const [password, onChangePassword] = React.useState('');
    const [passwordConfirm, onChangePasswordConfirm] = React.useState('');
    const [token, onChangeToken] = React.useState('');
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView styles={styles.ScrollView}>
                <View style={styles.content}>
                        <Image
                            style={styles.image}
                            source={require('../../assets/Reset password.png')}
                        />
                    <Text style={styles.title}>Reset Password?</Text>
                    <Text style={styles.subTitle}>You're a step away from accessing your account</Text>
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <MaterialIcons name="generating-tokens" size={24} color="green" />
                                <Text style={styles.label}>Token</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your token"
                                placeholderTextColor="grey"
                                value={token}
                                onChangeText={onChangeToken}
                            />
                            <View style={styles.iconContainer}>
                                <FontAwesome name="lock" size={24} color="green" />
                                <Text style={styles.label}>New Password</Text>
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
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <FontAwesome name="lock" size={24} color="green" />
                            <Text style={styles.label}>Confirm Password</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="grey"
                            value={passwordConfirm}
                            onChangeText={onChangePasswordConfirm}
                            secureTextEntry
                        />
                    </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => console.log('password reset is successful')}
                            >
                            <Text style={styles.buttonText}>Reset</Text>
                        </TouchableOpacity>
                        <View style={styles.bottomTextContainer}>
                                <Text style={styles.textSign} >Already have an account? <Text style={styles.textColor2}>Sign in</Text></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles =StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    ScrollView:{
        width: '100%',
        height: '100%',
        marginTop: 50
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        marginTop: 40
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 3,
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
        marginBottom:20
    },
    form: {
        width: '100%',
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
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textColor2:{
        color: 'green',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    bottomTextContainer: {
        bottom: 20, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
export default ResetPassword;