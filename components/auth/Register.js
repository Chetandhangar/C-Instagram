import React, {Component } from 'react';
import {View , Text, TextInput,Button} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';



class Register extends Component {
    
    constructor(props){
        super(props);
        this.state={
            email :'',
            password : '',
            name : ''
        }

        this.signUp = this.signUp.bind(this)
    }
    signUp (){

        const {email, password , name}  = this.state;

        firebase.auth().createUserWithEmailAndPassword(email , password)
          .then((result) =>{
              firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email
                })
              console.log(result);
          })
          .catch(error => console.log(error)) 

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
               placeholder="Name"
               value = {this.state.name}
               onChangeText={(name) => this.setState({name})}
               />
               <TextInput 
               placeholder="Password"
               value={this.state.password}
               onChangeText={(password) => this.setState({password}) }
               />
               <Button 
                onPress = {() => this.signUp()}
                title = "Sign Up"
               />
            </View>
        );
    }
}

export default Register;