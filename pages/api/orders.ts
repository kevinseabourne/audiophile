import { initializeApp } from "firebase/app";
import {
  query,
  where,
  limit,
  getFirestore,
  collection,
  addDoc,
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

export const getOrder = async (id: string) => {
  try {
    const auth = getAuth();

    const data = await signInWithEmailAndPassword(
      auth,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    ).then(async () => {
      const productsCollection = collection(db, "orders");

      const q = query(
        productsCollection,
        where("orderNumber", "==", id),
        limit(1)
      );
      const snapshot = await getDocs(q);

      const orders = snapshot.docs.map((doc) => {
        let order = doc.data();

        const date = order.orderDate.toDate();
        order.orderDate = date.toDateString();

        return order;
      });
      return orders;
    });
    return data;
  } catch (ex) {
    logger.log(ex);
  }
};

interface Product {
  dateAdded: string;
  id: string;
  images: {
    title: string;
    image: string;
  }[];
  inTheBox: {
    title: string;
    units: number;
  }[];
  longDescription: string;
  price: string;
  shortDescription: string;
  title: string;
  type: string;
  cartQuantity: number;
  cartPrice: string;
  watch: {};
}

type shippingFormData = {
  name: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  state?: string;
  paymentMethod: string;
  shippingMethod: string;
  shippingMethodObj: { title: string; eta: string; cost: string };
};

type paymentDataWithoutCardDetailsProps = {
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  city: string;
  country: string;
  state?: string;
  orderNumber: string;
};

type Order = {
  orderNumber: string;
  orderDate: Date;
  order: Product[];
  vatPrice: string;
  orderSubTotal: string;
  orderGrandTotal: string;
  shippingData: shippingFormData;
  paymentData?: paymentDataWithoutCardDetailsProps;
};

export async function addOrder(order: Order) {
  try {
    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PASSWORD
    );
    await addDoc(collection(db, "orders"), order);
    return true;
  } catch (ex) {
    logger.log(ex);
  }
}
