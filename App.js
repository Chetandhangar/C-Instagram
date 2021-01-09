import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  LandingScreen from './components/auth/Landing';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './components/auth/Register';
import LoginScreen from  './components/auth/Login';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyDZCdNsi59t8duK1dCjH6jUZai2hEVsQxo",
  authDomain: "instagram-app-98cc7.firebaseapp.com",
  projectId: "instagram-app-98cc7",
  storageBucket: "instagram-app-98cc7.appspot.com",
  messagingSenderId: "317726088470",
  appId: "1:317726088470:web:5afac2222ef6d54a6f8437",
  measurementId: "G-QRXSX940FK"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig);
}


export default function App() {
  
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

