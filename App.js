import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, ToastAndroid, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './src/screens/signUp';
import Tabs from './src/components/Tabs';
import LoginScreen from './src/screens/loginScreen';
import ResetPassword from './src/screens/resetpass';
import ForgotPassword from './src/screens/forgotpass';
import CameraButton from './src/components/cameraButton';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const isLocked = await AsyncStorage.getItem('isLocked');
        console.log('isLocked:', isLocked); // Debugging log
        setIsLoggedIn(isLocked === 'true');
      } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="green" />
      </SafeAreaView>
    ); // Loading spinner while checking login status
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tabs />
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={SignUp} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="CameraButton" component={CameraButton} />
          <Stack.Screen name="Tabs" component={Tabs} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
