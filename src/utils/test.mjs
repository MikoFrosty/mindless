import { getFirestore, doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  getAuth
} from "firebase/auth";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgJrGPFFySGgh4cSnl4Xv87gaUbFFRTwY",
  authDomain: "mindless-34ad8.firebaseapp.com",
  projectId: "mindless-34ad8",
  storageBucket: "mindless-34ad8.appspot.com",
  messagingSenderId: "816247378013",
  appId: "1:816247378013:web:00a8a690d5ad938be13db4",
  measurementId: "G-R9C6S6VYEX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



const loginEmail = "test@test.com";
const loginPassword = "testtest";

const db = getFirestore();



async function getUser() {
  const user = await signInWithEmailAndPassword(
    auth,
    loginEmail,
    loginPassword
  );
  return user;
}

getUser().then(({ user }) => {
  
  setDoc(doc(db, "users", user.uid + "2"), {
    taskList: [{ name: "A New Task", order: 77 }, { name: "Another Task", order: 78 }],
  }).then(() => {

    const docRef = doc(db, "users", user.uid + "2");  
    
    updateDoc(docRef, {
      taskList: arrayUnion({ name: "WHERE DO I GO?", order: 99 }),
    });

    return docRef;
  }).then((docRef) => {

    getDoc(docRef).then((d) => {
      //console.log(d.exists());
      console.log(d.data());
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  
  })

  /*
  //console.log(user);

  //console.log(user.uid);
  getDoc(docRef).then((d) => {
    //console.log(d.exists());
    console.log(d.data());
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });
    */    
          
          /*
          console.log(d.exists());
          if (!d.exists()) {
            // add document to firestore
            setDoc(doc(db, "users", user.uid), {
              taskList: [{ name: "Example Task", order: 1 }],
            });
          }
          */
        
}).catch((error) => {
  console.log(error);
});
// WORKS FOR TESTING