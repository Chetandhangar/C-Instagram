import React, {Component } from 'react';
import {View , Text, TextInput,Button} from 'react-native';


class Register extends Component {
    
    constructor(props){
        super(props);
        this.state={
            name :'',
            password : '',
            email : ''
        }
    }
    signUp (){

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