import React, {Component } from 'react';
import {View ,TextInput , Button} from 'react-native';
import firebase from 'firebase';



class Login extends Component {
    
    constructor(props){
        super(props);
        this.state={
            email : '',
            password : ''
        }
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin(){
        const  {email, password} = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((result)=>{
                console.log(result)
            })
            .catch((error) =>{
                console.log(error)
            })
    }   
    
    render(){
        return(
            <View>
               <TextInput
               placeholder="Email"
               value={this.state.email}
               onChangeText={(email) => this.setState({email})}
               />
               <TextInput 
               placeholder="Password"
               value={this.state.password}
               onChangeText={(password) => this.setState({password}) }
               />
               <Button 
                onPress = {() => this.onLogin()}
                title = "Login"
               />
            </View>
        );
    }
}

export default Login;