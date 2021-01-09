import React, {Component } from 'react';
import {View, Text} from 'react-native';
import { fetchUser } from '../redux/actions/index'
import {connect} from 'react-redux/';
import  { bindActionCreators } from 'redux'
 
class Main extends Component{
    componentDidMount(){
        this.props.fetchUser()
        
    }
    render(){
        const {currentUser} = this.props;
        console.log(currentUser)
        return(
                <View>
                    <Text>User is logged in</Text>
                </View>
         
        );
    }
}

const mapStateToProps = (store) =>({
    currentUser : store.userState.currentUser
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser} ,dispatch);


export default connect(mapStateToProps, mapDispatchProps)(Main);