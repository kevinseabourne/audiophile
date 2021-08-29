import firebase from "firebase/app";
import "firebase/firestore";

const config_ = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_ENDPOINT,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config_);
}

export async function getAllProducts() {
  const response = await firebase
    .firestore()
    .collection("products")
    .orderBy("dateAdded", "desc")
    .limit(12)
    .get()
    .then(function (querySnapshot: any) {
      let data = [];
      querySnapshot.forEach(function (doc: any) {
        let product = doc.data();
        product.id = doc.id;
        data.push(product);
      });
      return data;
    })
    .catch(function (error) {
      // logger.log(error);
    });

  return response;
}
