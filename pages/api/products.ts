// import firebase from "firebase/app";
// import "firebase/firestore";
// import { firebase } from "firebase";

import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore";
import {
  query,
  where,
  orderBy,
  limit,
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getAllProducts() {
  const citiesCol = collection(db, "products");

  const q = query(citiesCol, orderBy("dateAdded", "desc"), limit(12));
  const citySnapshot = await getDocs(q);
  const cityList = citySnapshot.docs.map((doc) => doc.data());

  return cityList;
  //   const response = await firebase
  //     .firestore()
  //     .collection("products")
  //     .orderBy("dateAdded", "desc")
  //     .limit(12)
  //     .get()
  //     .then(function (querySnapshot: any) {
  //       let data = [];
  //       querySnapshot.forEach(function (doc: any) {
  //         let product = doc.data();
  //         product.id = doc.id;
  //         data.push(product);
  //       });
  //       return data;
  //     })
  //     .catch(function (error) {
  //       // logger.log(error);
  //     });
  //
  //   return response;
}

export async function getAllProductTitles() {
  // Used to check for a match with the query data for a single product. That data being the product title
  const productsCol = collection(db, "products");

  const q = query(productsCol, orderBy("dateAdded", "desc"));
  const snapshot = await getDocs(q);
  const products = snapshot.docs.map((doc) => {
    // make sure the path matches the query, the query uses - instead of spaces
    const productTitle = doc.get("lowerCaseTitle").replace(/[\s]/g, "-");
    return { category: doc.get("type"), product: productTitle };
  });
  return products;
}

export async function getCategoryProducts(category: string) {
  const citiesCol = collection(db, "products");

  const q = query(
    citiesCol,
    where("type", "==", category),
    orderBy("dateAdded", "desc"),
    limit(12)
  );
  const citySnapshot = await getDocs(q);
  const cityList = citySnapshot.docs.map((doc) => {
    let product = doc.data();
    product.id = doc.id;
    const date = product.dateAdded.toDate();
    product.dateAdded = date.toDateString();

    return product;
  });

  return cityList;
}

export async function getSingleProduct(productTitle: string) {
  const productsCollection = collection(db, "products");

  const q = query(
    productsCollection,
    where("lowerCaseTitle", "==", productTitle),
    limit(1)
  );
  const snapshot = await getDocs(q);
  const cityList = snapshot.docs.map((doc) => {
    let product = doc.data();
    product.id = doc.id;
    const date = product.dateAdded.toDate();
    product.dateAdded = date.toDateString();

    return product;
  });

  return cityList;
}
