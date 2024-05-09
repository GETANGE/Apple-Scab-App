import React from'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/loginScreen';
import Tabs from './src/components/Tabs';

export default function App() {
  return (
        <NavigationContainer>
            <LoginScreen/>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
