import React, {Component } from 'react';
import {View, Text} from 'react-native';
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from '../redux/actions/index'
import {connect} from 'react-redux/';
import  { bindActionCreators } from 'redux'
import { createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage')

//Tab Component
import FeedScreen from './Main/Feed';
import ProfileScreen from './Main/Profile';
import SearchScreenn from './Main/Search';


class Main extends Component{
    componentDidMount(){
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
        
    }

    render(){
        function EmptyScreen(){
            return null
        }
        const Tab = createMaterialBottomTabNavigator();
        return(
          <Tab.Navigator initialRouteName="Feed"
           labeled={false}
           activeColor="black" 
           inactiveColor="white">
              <Tab.Screen 
              name="Feed"
              component ={FeedScreen}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
              }}
              />
              <Tab.Screen name="Search"  component={SearchScreenn} navigation={this.props.navigation}
              options={{
                  tabBarIcon:({color}) =>(
                      <MaterialCommunityIcons name="magnify" color={color} size={26} />
                    )
              }}
              />
              <Tab.Screen  name="MainAdd" component ={EmptyScreen} 
              listeners={({navigation})=> ({
                    tabPress : event =>{
                        event.preventDefault()
                        navigation.navigate("Add")
                    }
              })}
              options={{
                  tabBarIcon:({color}) =>(
                      <MaterialCommunityIcons name="plus-box" color={color} size={26}/>
                  )
              }}
              />
              <Tab.Screen name="Profile" component={ProfileScreen}
                 listeners={({navigation})=> ({
                    tabPress : event =>{
                        event.preventDefault()
                        navigation.navigate("Profile" , {uid: firebase.auth().currentUser.uid})
                    }
              })}
              options={{
                  tabBarIcon:({color}) =>(
                      <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                  )
              }} />
          </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) =>({
    currentUser : store.userState.currentUser,
})

const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing, clearData} ,dispatch);


export default connect(mapStateToProps, mapDispatchProps)(Main);