import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth";
import { getFirestore} from 'firebase/firestore';
import { addDoc, collection,doc, setDoc } from "firebase/firestore"; 


const firebaseConfig= ({
    apiKey: "AIzaSyASlS2DKKESYkKL7ncX3e3PcJk2heJs6cU",
    authDomain: "money-transfer-2565c.firebaseapp.com",
    projectId: "money-transfer-2565c",
    storageBucket: "money-transfer-2565c.appspot.com",
    messagingSenderId: "130617789801",
    appId: "1:130617789801:web:587466b2d6798f236601f8",
    measurementId: "G-LZCFLF1L69"
})

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app);
// export const firestore = db.firestore()
export const db = getFirestore(app)
// export const db = firebaseConfig.firestore();

export default app

// const collectionRef = doc(database, 'users');
//             const docRef = addDoc(collectionRef, {
//                 name: this.state.name,
//                 email: this.state.email,
//             });

export const createUserDocument = async (user, additionalData) =>{
    if (!user) return;

    // const userRef = db.doc("users").doc(user.uid);

    // await setDoc(doc(db, "users", "name"), {
    //     name: user, 
    //     email: additionalData
        
    //   });

    const docRef = await addDoc(collection(db,(`users/${user.id}`)), {
        name: user,
        email: additionalData
      });
      console.log("Document written with ID: ", docRef.id);

    // const userRef =db.doc(`users/${user.id}`)
    // const snapshot = await userRef.get();
    // if (!snapshot.exists){
    //     const {email} = user;
    //     const {name} = additionalData;

    //     try{
    //         userRef.set({
    //             name,
    //             email,
    //             createdAt: new Date()
    //         })
    //     }catch(error){
    //         console.log("error in creating user", error)
    //     }
    // }
}
