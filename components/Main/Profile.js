import React,{useState, useEffect}  from 'react';
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import {connect} from 'react-redux';
import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage');

function Profile(props){

    const [user, setUser] = useState(null)
    const [userPost , setUSerPost] = useState([]);
   

    useEffect(() =>{

        const {currentUser, posts} = props;
        console.log({currentUser,posts});

        if(props.route.params.uid === firebase.auth().currentUser.uid){
            setUser(currentUser);
            setUSerPost(posts)
        }
        else{

        firebase.firestore()
        .collection('users')
        .doc(props.route.params.uid)
        .get()
        .then((snapshot)=>{
            if(snapshot.exists){
                setUser(snapshot.data())
            }
            else{
                console.log("User Doesn't exist")
            }
        });

       
        firebase.firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot)=>{
            let posts = snapshot.docs.map(doc =>{
                const data = doc.data();
                const id = doc.id;
                return{id ,...data}
            })
            console.log(posts);
            setUSerPost(posts)
        });
    }


    },[props.route.params.uid])

    if(user === null){
        return(
            <View></View>
        );
    }

    return(
        <View style={styles.container}>
           <View style={styles.containerInfo}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
           </View>
           <View style={styles.containerGaller}>
               <FlatList 
                horizontal={false}
                numColumns={3}
                data={userPost}
                renderItem={({item}) =>(
                    <View style={styles.containerImage}>

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
    posts : store.userState.posts
})


export default connect(mapStateToProps, null)(Profile);