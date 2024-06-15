import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUp from './src/screens/signUp';
import Tabs from './src/components/Tabs';
import LoginScreen from './src/screens/loginScreen';
import ResetPassword from './src/screens/resetpass';
import ForgotPassword from './src/screens/forgotpass';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function getData() {
    try {
      const data = await AsyncStorage.getItem('isLoggedIn');
      console.log('Data stored in AsyncStorage:', data);
      setIsLoggedIn(data === 'true'); // Parse data as boolean
    } catch (error) {
      console.error('Error reading data from AsyncStorage:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tabs />
      ) : (
        <Stack.Navigator screenOptions={{ 
        headerShown:false,
      }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={SignUp} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
