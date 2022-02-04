import { initializeApp } from "firebase/app";
import {
  query,
  where,
  orderBy,
  limit,
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import logger from "./logger";

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
  try {
    const auth = getAuth();

    const data = await signInWithEmailAndPassword(
      auth,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    ).then(async () => {
      const productsCol = collection(db, "products");

      const q = query(productsCol, orderBy("dateAdded", "desc"), limit(12));
      const snapshot = await getDocs(q);

      const products = snapshot.docs.map((doc) => {
        let product = doc.data();
        product.id = doc.id;
        const date = product.dateAdded.toDate();
        product.dateAdded = date.toDateString();

        return product;
      });
      return products;
    });
    return data;
  } catch (ex) {
    logger.log(ex);
  }
}

export async function getAllProductTitles() {
  try {
    const auth = getAuth();

    const data = await signInWithEmailAndPassword(
      auth,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    ).then(async () => {
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
    });
    return data;
  } catch (ex) {
    logger.log(ex);
  }
}

export async function getCategoryProducts(category: string) {
  try {
    const auth = getAuth();

    const data = await signInWithEmailAndPassword(
      auth,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    ).then(async () => {
      const productsCol = collection(db, "products");

      const q = query(
        productsCol,
        where("type", "==", category),
        orderBy("dateAdded", "desc"),
        limit(12)
      );
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map((doc) => {
        let product = doc.data();
        product.id = doc.id;
        const date = product.dateAdded.toDate();
        product.dateAdded = date.toDateString();

        return product;
      });

      return products;
    });
    return data;
  } catch (ex) {
    logger.log(ex);
  }
}

export async function getSingleProduct(productTitle: string) {
  try {
    const auth = getAuth();

    const data = await signInWithEmailAndPassword(
      auth,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    ).then(async () => {
      const productsCollection = collection(db, "products");

      const q = query(
        productsCollection,
        where("lowerCaseTitle", "==", productTitle),
        limit(1)
      );
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map((doc) => {
        let product = doc.data();
        product.id = doc.id;
        const date = product.dateAdded.toDate();
        product.dateAdded = date.toDateString();

        return product;
      });

      return products;
    });
    return data;
  } catch (ex) {
    logger.log(ex);
  }
}
