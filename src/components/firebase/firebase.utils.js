import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import { useReducer } from 'react';
//-------------------firebase key-----------------------------//
const config = {
  apiKey: "AIzaSyDWxjWuVYdy7wHy-9SZHodk1rdYZy55454",
  authDomain: "e-commerce-db-b3dfe.firebaseapp.com",
  databaseURL: "https://e-commerce-db-b3dfe.firebaseio.com",
  projectId: "e-commerce-db-b3dfe",
  storageBucket: "e-commerce-db-b3dfe.appspot.com",
  messagingSenderId: "675632182823",
  appId: "1:675632182823:web:2be7879149cd5fecc4c002",
  measurementId: "G-8YQYDW64TG"
};
//-----------authentication set up----------------------//
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // similar to mongodb firebase has CRUD methods. These are .set(), .get(), .update() and .delete()
  if (!userAuth) {
    return;
  }
  const userId = firestore.doc(`users/${userAuth.uid}`); // this function will first check whether there is any matching id in the collection.
  //NOTE: "users" is the collections name if does not exists, it will create one just like mongodb

  const userData = await userId.get(); // this first check when user is saved in firebase

  if (!userData.exists) {
    // if not it will save the user based on the data stored in userAuth(whatever the parameter that will be passed)
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userId.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (e) {
      console.log("error creating user", e.message);
    }
  }
  return userId;
};

//-------------- basic firebase set up----------------//
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); // this enables google sign in

provider.setCustomParameters({ prompt: "select_account" }); // google sign in always pops up

export const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(provider);
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}; // this function allows one to use the google sign in popup. This is used as onClick() in button. So whenever you trigger the function with will pop up google sign in screen. Very EASY
//-----------storing SHOP_DATA as a collection-------//
export const addCollectionAndItem = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey); // this defines the collection name
  console.log(collectionRef);
  const batch = firestore.batch(); // defining batch- consider this as a 'zip'
  objectsToAdd.forEach((obj) => {
    // for each object inside the array (objectsToAdd) -- remember this is parameter
    const newDocRef = collectionRef.doc(obj.title); // grabs the title name of each object
    console.log(newDocRef);
    batch.set(newDocRef, obj); // and sets the title as the "id" and the actual object as the "document"
  });
  return await batch.commit(); // this commits or saves above actions into firebase.
};
// -------------retrieving data from firebase db--------------------------//
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  console.log(transformedCollection);
  // return transformedCollection
  //--------------------makes new array out of what you got from above ----------//
  return transformedCollection.reduce(
    (acc, collection) => {
      acc[collection.title.toLowerCase()] = collection;
      console.log(acc);
      return acc;
    },
    {} /* <-- this assigns acc an default value of "empty object"*/
  );
};

export const userProfile = async (auth, item) => {
  if (!auth) {
    return;
  }
  const userRef = firestore.doc(`users/${auth.uid}`);
  const snapShot = await userRef.get();
  console.log(snapShot);
};
export const saveToFireStore = async (ref, user, info) => {
  const userCollectionRef = firestore.collection(ref);
  console.log(userCollectionRef);
  const batch = firestore.batch();
  // item.forEach(
  // 	function yoyo(haha){
  // 		const docRef=itemRef.doc(haha.title)
  // 		console.log(docRef)
  // 		batch.set(docRef,haha)
  // })
  const userDocRef = userCollectionRef.doc(`${user.id}`);
  console.log(userDocRef);
  // const testItemToAdd={Test:"Test"}
  const testItemToAdd = { info };
  batch.set(userDocRef, testItemToAdd);
  return await batch.commit();
};
export const getTheTestObjFromFireStore = (userDocRef) => {
  const userDocs = userDocRef.docs.map(function a(userDoc) {
    const userDocData = userDoc.data();
    return console.log(userDocData.info);
  });
  console.log(userDocs);
};
export const updateTheTestObjInsideFireStore = async (user, update) => {
  const userDocRef = firestore.collection("yoyo").doc(`${user.uid}`);
  try {
    const res = await userDocRef.update({ Test: update });
    console.log(res);
  } catch (e) {
    console.log(e);
    alert("No Doc exits");
  }
};

export const deleteTheTestObjInsideFireStore = async (user) => {
  const userDocRef = firestore.collection("yoyo").doc(`${user.uid}`);

  const res = await userDocRef.update({
    Test: firebase.firestore.FieldValue.delete()
  });
  console.log(res);
};

// -------------retrieving data from firebase db--------------------------//
export const getCollectionsSnapshotToMap = (collections) => {
  // const transformedCollection = collections.docs.map((doc) => {
  // 	return console.log(doc.id,doc.data())
  // });
  // console.log(transformedCollection);
  console.log(collections);
  // return transformedCollection
};

export default firebase;
