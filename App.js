
import React, {Component} from 'react';
import { StyleSheet, Text, View,LogBox} from 'react-native';
import  LandingScreen from './components/auth/Landing';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegisterScreen from './components/auth/Register';
import LoginScreen from  './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen  from './components/Main/Add';
import SaveScreen from './components/Main/Save';
import CommentScreen from './components/Main/Comment'
 //redux
import {createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';

 //firebase 
import * as firebase from 'firebase';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();


const store =  createStore(rootReducer, applyMiddleware(thunk))

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

 class App extends Component{
  constructor(props){
    super(props);
    this.state={
      loaded : false,
      loggedIn : false
    }
  }
  //when component mount check if user is exist or not
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) =>{ ///onAuthStateChange helped to check user state
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
        <Stack.Screen name="Register" component={RegisterScreen}  />
        <Stack.Screen name="Login" component={LoginScreen}  />
        </Stack.Navigator>
      </NavigationContainer>
    );
    }
    else{
      return(
        <Provider store={store}>
          <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component ={MainScreen}/>
            <Stack.Screen name="Add" component ={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component = {SaveScreen} navigation={this.props.navigation} />
            <Stack.Screen name="Comment" component = {CommentScreen} navigation={this.props.navigation} />
          </Stack.Navigator>
          </NavigationContainer>
         
        </Provider>
      
      )
    }
  }
  
}

export default App;

