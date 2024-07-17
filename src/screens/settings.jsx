import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from "../components/CustomButton";
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";

const Setting = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch user details from AsyncStorage
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const email = await AsyncStorage.getItem('userEmail');
                const username = await AsyncStorage.getItem('userName');
                const role = await AsyncStorage.getItem('userRole');
                const userId = await AsyncStorage.getItem('id');
                const token = await AsyncStorage.getItem('token');

                if (email !== null) setEmail(email);
                if (username !== null) setUsername(username);
                if (role !== null) setRole(role);
                if (userId !== null) setUserId(userId);
                if (token !== null) setToken(token);
            } catch (error) {
                console.error('Error fetching user details', error);
            } finally {
                setLoading(false); // Set loading to false once the fetching is done
            }
        };

        fetchUserDetails();
    }, []);

    // Function to logout the user
    const logOut = async () => {
        try {
            ToastAndroid.show('Logged out successfully!', ToastAndroid.SHORT);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],  
        });
            await AsyncStorage.multiRemove(['isLocked', 'token', 'userEmail', 'userName', 'userRole', 'id']);
        } catch (error) {
            console.error('Error during logout', error);
            ToastAndroid.show('Error during logout', ToastAndroid.SHORT);
        }
    };

    // Function to delete the account
    const deleteAccount = async () => {
        try {

            if (!token) {
                ToastAndroid.show('User is not authenticated', ToastAndroid.SHORT);
                return;
            }
    
            const response = await axios.delete(`https://apple-plant-disease.onrender.com/api/v1/user/softDelete/${userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (response.data.status === 'success') {
                ToastAndroid.show('Account deleted successfully!', ToastAndroid.SHORT);
    
                // Remove all stored user information
                await AsyncStorage.multiRemove(['isLocked', 'token', 'userEmail', 'userName', 'userRole', 'id']);
    
                // Navigate to Login screen
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            } else {
                ToastAndroid.show('Error deleting account', ToastAndroid.SHORT);
            }
        } catch (error) {
            console.error('Error:', error);
            ToastAndroid.show('Error deleting account', ToastAndroid.SHORT);
        }
    };
    

    return (
        <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.profile}>
                        <View style={styles.profile2}>
                            <Text style={styles.text}>{username}</Text>
                            <FontAwesome5 name="user-circle" size={24} color="black" />
                        </View>
                    </View>
                    <View>
                        <View>
                            <View style={styles.profile3}>
                                <FontAwesome5 name="user" size={24} color="green" />
                                <Text style={styles.text}>Username</Text>
                            </View>
                            <Text style={styles.text2}>{username}</Text>

                            <View style={styles.profile3}>
                                <FontAwesome5 name="envelope" size={24} color="green" />
                                <Text style={styles.text}>Email</Text>
                            </View>
                            <Text style={styles.text2}>{email}</Text>

                            <View style={styles.profile3}>
                                <FontAwesome5 name="hospital-user" size={24} color="green" />
                                <Text style={styles.text}>{role}</Text>
                            </View>
                            <Text style={styles.text2}>User</Text>
                            <CustomButton
                                onPress={logOut}
                                buttonText="Log Out"
                            />
                            <CustomButton
                                onPress={deleteAccount}
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
