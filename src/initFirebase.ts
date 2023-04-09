
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'
import 'firebase/storage'
import { getStorage } from 'firebase/storage';

const config = {
  apiKey: "AIzaSyB_y-lKFbzqys8MV0Km7Na02IihmmOgAVw",
  authDomain: "video-view-a0863.firebaseapp.com",
  databaseURL: "https://video-view-a0863-default-rtdb.firebaseio.com",
  projectId: "video-view-a0863",
  storageBucket: "video-view-a0863.appspot.com",
  messagingSenderId: "91729855149",
  appId: "1:91729855149:web:eb9fd95078d6df72bdfc24",
  measurementId: "G-MCVL8ZD2NS"
};


function initFirebase(){
    if (!firebase.apps.length){
        firebase.initializeApp(config)
    }
}

initFirebase();


export {firebase}