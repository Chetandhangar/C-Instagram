
import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  LandingScreen from './components/auth/Landing';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './components/auth/Register';
import LoginScreen from  './components/auth/Login';
import MainScreen from './components/Main';
 //firebase 
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

//onAuthStateSchanged in component did mound to addd more functioality to app
 class App extends Component{
  constructor(props){
    super(props);
    this.state={
      loaded : false,
      loggedIn : false
    }
  }
  
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) =>{
      if(!user){
        this.setState({
          loggedIn : false,
          loaded : true
        })
      }
      else{
        this.setState({
          loggedIn: true,
          loaded : true
        })
      }
    })
    
  }
  
  
  render(){
    const {loaded , loggedIn} = this.state;
    const Stack = createStackNavigator();
    if(!loaded){
      return(
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    if(!loggedIn){
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
    }
    else{
      return(
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen name="Main" component={MainScreen}/>
         </Stack.Navigator>
       </NavigationContainer>
      )
    }
  }
  
}

export default App;

