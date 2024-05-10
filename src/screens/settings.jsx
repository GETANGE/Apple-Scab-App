import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from "../components/CustomButton";
import LoginScreen from "./loginScreen";
import { FontAwesome5 } from '@expo/vector-icons';

const Setting = () => {
    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.profile}>
                        <View style={styles.profile2}>
                            <Text style={styles.text}>Username</Text>
                            <FontAwesome5 name="user-circle" size={24} color="black" />
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={styles.profile3}>
                                <FontAwesome5 name="user" size={24} color="green" />
                                <Text style={styles.text}>Username</Text>
                            </View>
                            <Text style={styles.text2}>Emmanuel Getange</Text>

                            <View style={styles.profile3}>
                                <FontAwesome5 name="envelope" size={24} color="green" />
                                <Text style={styles.text}>Email</Text>
                            </View>
                            <Text style={styles.text2}>emmanuelgetange12@gmail.com</Text>

                            <View style={styles.profile3}>
                                <FontAwesome5 name="hospital-user" size={24} color="green" />
                                <Text style={styles.text}>Role</Text>
                            </View>
                            <Text style={styles.text2}>User</Text>
                            <CustomButton
                                onPress={()=> console.log("logged out")}
                                buttonText="Log Out"
                            />
                            <CustomButton
                                onPress={() => console.log('Account Deleted..')}
                                buttonText="Delete Account"
                                style={styles.button}
                            />
                        </View>
                    </View>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        marginTop: 40
    },
    content: {
        paddingHorizontal: 20,
        width: '100%',
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
    },
    profile2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginLeft: 'auto',
    },
    profile3: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    text: {
        fontSize: 16,
        marginRight: 5,
        marginLeft: 20
    },
    text2: {
        fontSize: 16,
        marginLeft: 45,
        marginBottom: 50,
        color: 'grey'
    },
});

export default Setting;
