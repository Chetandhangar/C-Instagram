import React,{useState, useEffect}  from 'react';
import { View, Text, Image, FlatList, StyleSheet, Button } from "react-native";
import {connect} from 'react-redux';
import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage');

function Feed(props){

    const [post , setPost] = useState([]);
   

    useEffect(() =>{
        let posts = [];
        if(props.usersLoaded === props.following.length ){
            for(let i=0; i< props.following.length; i++){
                const user = props.users.find(el => el.uid === props.following[i])
                if(user !== undefined){
                    posts = [...posts, ...user.posts]
                }
            }

            posts.sort(function(x,y){
                return x.creation - y.creation;
            })

            setPost[posts]
            console.log(posts);
        }


    },[props.usersLoaded])

    
    return(
        <View style={styles.container}>
           <View style={styles.containerGaller}>
               <FlatList 
                horizontal={false}
                numColumns={1}
                data={post}
                renderItem={({item}) =>(
                    <View style={styles.containerImage}>
                        <Text style={styles.container}>{item.user.name}</Text>

                    <Image 
                    style={styles.image}
                    source={{uri : item.downlaodURL}}
                    />
                    </View>
                )}
                
               />
               
           </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container:{
        flex : 1,
    },
    containerInfo:{
        margin : 20
    },
    containerGaller:{
        flex: 1
    },
    image:{
        flex:1,
        aspectRatio:1/1
    },
    containerImage:{
        flex:1/3
    }


})

const mapStateToProps = (store) => ({
    currentUser : store.userState.currentUser,
    following : store.userState.following,
    users: store.usersState.users,
    usersLoaded : store.usersState.usersLoaded,

})


export default connect(mapStateToProps, null)(Feed);