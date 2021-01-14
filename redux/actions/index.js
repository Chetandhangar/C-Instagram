import {USER_POSTS_STATE_CHANGED, USER_STATE_CHANGED, USER_FOLLOWING_STATE_CHANGED, USERS_DATA_STATE_CHANGED,USERS_POSTS_STATE_CHANGED, CLEAR_DATA} from '../constants/index';
import * as firebase from 'firebase';
import 'firebase/firestore';

export function clearData(){
    return((dispatch) =>{
        dispatch({type: CLEAR_DATA})
    })
}

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
};

export function fetchUserPosts(){
    return((dispatch)=>{
        firebase.firestore()
        .collection("posts")
        .doc(firebase.auth().currentUser.uid)
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
            dispatch({type : USER_POSTS_STATE_CHANGED, posts })
        })
        
    })
}

export function fetchUserFollowing(){
    return((dispatch) => {
        firebase.firestore().
        collection('following')
        .doc(firebase.auth().currentUser.uid)
        .collection('userFollowing')
        .onSnapshot((snapshot) =>{
            let following = snapshot.docs.map(doc =>{
                const id = doc.id;
                return id;
            })
            console.log(following);
            dispatch({type : USER_FOLLOWING_STATE_CHANGED, following});
            for(let i=0 ; i < following.length ; i++ ){
                dispatch(fetchUsersDate(following[i]));
            }
        })
    });
}

//fetching all users data 

export function fetchUsersDate(uid){
    return((dispatch, getState) =>{

        const found = getState().usersState.users.some(el => el.uid ===  uid);
        if(!found){
        firebase.firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) =>{
            if(snapshot.exists){
                let user = snapshot.data();
                user.uid = snapshot.id;
                dispatch({type: USERS_DATA_STATE_CHANGED, user});
                dispatch(fetchUsersFollowingPosts(user.uid));
            }
            else{
                console.log("User doesn't exist");
            }
        })
    }
    })
}

export function fetchUsersFollowingPosts(uid) {
    return((dispatch, getState)=>{
        firebase.firestore()
        .collection("posts")
        .doc(uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((snapshot)=>{

            let uid = snapshot.query.EP.path.segments[1];
            console.log({snapshot, uid});
            const user = getState().usersState.users.find(el => el.uid === uid)

            let posts = snapshot.docs.map(doc =>{
                const data = doc.data();
                const id = doc.id;
                return{id ,...data, user}
            })
            console.log(posts);
            dispatch({type: USERS_POSTS_STATE_CHANGED, posts, uid })
            console.log(getState());
        })
        
    })
}

