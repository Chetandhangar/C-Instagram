import React, {useState} from 'react';
import {View, TextInput , Image, StyleSheet, Button, Alert} from 'react-native';
import firebase from 'firebase';
require("firebase/firestore")
require("firebase/firebase-storage")


export default function Save(props){

    const [caption , setCaption] = useState("")
    console.log(props.route.params.image);
 
    const uploadImage = async () =>{
        const uri = props.route.params.image;
        const response = await fetch(uri)
        const blob = await response.blob();
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}` 
        console.log(childPath)
        const task = firebase.storage()
        .ref()
        .child(childPath)
        .put(blob)
        const taskProgress = snapshot  => {
            console.log(`transferred : ${snapshot.bytesTransferred}`);
            Alert.alert(
                "Adding Post to Feed... Please Wait",
                "It may take little while to upload a image"
            )
        }
        const taskCompleted = () =>{
          task.snapshot.ref.getDownloadURL()
          .then((snapshot)=>{
              savePostData(snapshot)
              console.log("Post saved as collection")
          })
        }
        const taskError = snapshot =>{
            console.log(snapshot);
        }
    task.on("state_changed" , taskProgress, taskError, taskCompleted)
    }

  

    const savePostData = (downlaodURL) =>{
        firebase.firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .add({
            downlaodURL,
            caption,
            creation : firebase.firestore.FieldValue.serverTimestamp()
        }).then((function (){
            console.log("Data store to firestore");
            props.navigation.popToTop()
        }))
    }



    return(
        <View>
            <Image
            source={{uri : props.route.params.image}}
            style={styles.imageContainer}
            />
             <TextInput 
            style={{margin: 5}}
            placeholder="Write a caption"
            value = {caption}
            onChangeText={(caption) => setCaption(caption)}
            />
            <Button 
            title='Save'
            onPress={() => uploadImage()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer:{
        width: 180,
        height:180,
        margin : 5
    }
})