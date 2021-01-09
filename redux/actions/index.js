import {USER_STATE_CHANGED} from '../constants/index';
import * as firebase from 'firebase';
import 'firebase/firestore';

export  function fetchUser(){
    return ((dispatch) =>{
        firebase.firestore()
         .collection("users")
         .doc(firebase.auth().currentUser.uid)
         .get()
         .then((snapshot) => {
             if(snapshot.exists){
                 dispatch({type : USER_STATE_CHANGED, currentUser : snapshot.data()})
             }
             else{
                 console.log("Does not exist")
             }
         })
    })
}