import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image ,TouchableOpacity } from "react-native";
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


export default function Add({navigation}){

    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasGalleryPermisssion, setHasGalleryPermission] = useState(null)
    const [camera , setCamera] = useState(null);
    const [image , setImage] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(()=>{
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted')
            
            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasGalleryPermission(galleryStatus.status === 'granted')

            if(galleryStatus.status !== 'granted') 
            {
                alert("Sorry we need this permission to perrform this opertaion")
            }


        })();
    },[]);

    const takePicture = async () =>{
        if(camera){
            const data = await camera.takePictureAsync(null)
            console.log(data.uri);
            setImage(data.uri)
        }
    }

    const takeFromGallery = async () =>{
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality : 1
        });

        console.log(result);
        if(!result.cancelled){
            setImage(result.uri);
        }
    }

    if(hasCameraPermission === null || hasGalleryPermisssion === null){
        return(<View></View>);
    }
    if(hasCameraPermission === false || hasGalleryPermisssion === false){
        return (
            <View>
                <Text>No Camera Permission</Text>
            </View>        
    )}
        return(
            <View style={{flex : 1}}>
            <View style={styles.cameraContainer}>
                <Camera 
                ref = {ref => setCamera(ref)}
                style={styles.fixedRatio}
                type={type}
               
                />
            </View>
            <TouchableOpacity
            style={styles.button}
            >
            <Button title="Flip Camera" onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}></Button>
          </TouchableOpacity>
            <Button 
            title="Take Picture"
            onPress={() => takePicture()}
            />
            <Button 
            title="Take from Gallery"
            onPress={takeFromGallery}
            />
            <Button 
             title="Save Image"
             onPress={()=> navigation.navigate('Save', {image})}
            />
            {image && <Image source={{uri : image}} style={{flex: 1}} />}
            </View>
        );
    }

    const styles = StyleSheet.create({
        cameraContainer :{
            flex : 1,
            flexDirection : 'row'
        },
        fixedRatio:{
            flex : 1,
            aspectRatio : 1
        }
    })
