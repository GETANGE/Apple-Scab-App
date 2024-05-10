import React from'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/loginScreen';

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
