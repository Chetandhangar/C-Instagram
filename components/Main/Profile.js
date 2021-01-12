import React  from 'react';
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import {connect} from 'react-redux'

function Profile(props){

    const {currentUser, posts} = props;
    console.log({currentUser,posts});
    return(
        <View style={styles.container}>
           <View style={styles.containerInfo}>
                <Text>{currentUser.name}</Text>
                <Text>{currentUser.email}</Text>
           </View>
           <View style={styles.containerGaller}>
               <FlatList 
                horizontal={false}
                numColumns={3}
                data={posts}
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