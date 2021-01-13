import React,{useState} from 'react';
import {View, Text, TextInput, FlatList} from 'react-native';
import firebase from 'firebase';
require('firebase/firestore');
require('firebase/firebase-storage');


export default function Search(){
    
    const [users, setUsers] = useState([])
    

    const fetchUsers = (search) => { 
        firebase.firestore()
        .collection('users')
        .where('name', '>=' , search )
        .get()
        .then((snapshot) =>{
            let users = snapshot.docs.map(doc =>{
                const data = doc.data();
                console.log(data);
                const id = doc.id;
                return{id , ...data}
            })
            console.log(users)
            setUsers(users);
        })
    }


    return(
        <View>
            <Text>
                Search Component
            </Text>

            <TextInput 
            style={{marginTop:15}}
            placeholder="Search User..."
            onChangeText={(search) => fetchUsers(search)}
            />
            
            <FlatList 
            data={users}
            numColumns={1}
            horizontal={false}
            renderItem={({item})=>(
            <Text>{item.name}</Text>
            )}
            />
           
        </View>
    );
}