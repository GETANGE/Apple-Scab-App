import React from 'react';
import { SafeAreaView, View, Text, ScrollView , Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ForgotPassword = () => {
    const [email, onChangeEmail] = React.useState('');
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView styles={styles.ScrollView}>
                <View style={styles.content}>
                        <Image
                            style={styles.image}
                            source={require('../../assets/Forgot password.png')}
                        />
                    <Text style={styles.title}>Forgot Password?</Text>
                    <Text style={styles.subTitle}>Enter your email address and we will send you a link to reset your password</Text>
                    <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconContainer}>
                            <FontAwesome name="envelope" size={24} color="green" />
                            <Text style={styles.label}>Email</Text>
                        </View>
                        <TextInput
                            placeholder="Enter your email"
                            style={styles.input}
                            placeholderTextColor="grey"
                            value={email}
                            onChangeText={onChangeEmail}
                        />
                    </View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => console.log('Logged in')}
                            >
                            <Text style={styles.buttonText}>Send Link</Text>
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
        marginTop: 90,
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
export default ForgotPassword;