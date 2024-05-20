import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SingUp from './src/screens/signUp';
import Tabs from './src/components/Tabs';
import ResetPassword from './src/screens/resetpass';

export default function App() {
  const [isLockedIn, setIsLockedIn] = useState(false);

  async function getData() {
    try {
      const data = await AsyncStorage.getItem('isLocked');
      console.log('Data stored in AsyncStorage:', data);
      setIsLockedIn(data === 'true'); // Parse data as boolean
    } catch (error) {
      console.error('Error reading data from AsyncStorage:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []); // Empty dependency array to run only once on mount

  return (
    <NavigationContainer>
        { isLockedIn ? <Tabs/> : <SingUp/>}
    </NavigationContainer>
    //<ResetPassword/>
  );
}
