import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomePage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Wambugu Farm Apple-Scab Disease Detection System</Text>
                <Image
                    source={require('../../assets/Welcome.png')}
                    style={styles.image}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => console.log('Logged in')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%'
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
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 90,
        color: 'green'
    },
    subTitle:{
        fontSize: 16,
        color: 'grey'
    },
});

export default WelcomePage;
