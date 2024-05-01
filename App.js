import React from'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/loginScreen';
import SingUp from './src/screens/signUp';
import ForgotPassword from './src/screens/forgotpass';
import ResetPassword from './src/screens/resetpass';
import WelcomePage from './src/screens/welcome';

export default function App() {
  return (
    <View style={styles.container}>
          {/* <SingUp/> */}
          <LoginScreen/>
          {/* <ForgotPassword/> */}
          {/* <ResetPassword/> */}
          {/* <WelcomePage/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
