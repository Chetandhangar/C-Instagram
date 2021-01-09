import React, {Component } from 'react';
import {View ,TextInput , Button} from 'react-native';


class Login extends Component {
    
    constructor(props){
        super(props);
        this.state={
            password : '',
            email : ''
        }
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
                onPress = {() => this.loginUser()}
                title = "Login"
               />
            </View>
        );
    }
}

export default Login;