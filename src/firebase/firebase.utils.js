import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBUzRer6TgU-Q7c_CrE7IOr3Z_4nn-bDiU",
  authDomain: "ecommerce-db-1bb80.firebaseapp.com",
  databaseURL: "https://ecommerce-db-1bb80.firebaseio.com",
  projectId: "ecommerce-db-1bb80",
  storageBucket: "ecommerce-db-1bb80.appspot.com",
  messagingSenderId: "711117188118",
  appId: "1:711117188118:web:4203a2101fcfa852c35937",
  measurementId: "G-46FB017HM9",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()
  console.log(snapShot)

  if(!snapShot.exists) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData
  
      })
    } catch(error) {
        console.log('error creating user', error.message)
    }
  }
  return userRef

}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// will trigger Google sigin popup to select which account to sign in
provider.setCustomParameters({ prompt: "select_account" });
// Just want sigin with Google auth. There are others facebook, github etc
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
