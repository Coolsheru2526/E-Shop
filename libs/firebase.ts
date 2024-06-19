import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBJ5-CD7LtkUpZwLxsOU-EMZsmUa7c5Tis",
  authDomain: "e-shop-products-ca9e0.firebaseapp.com",
  projectId: "e-shop-products-ca9e0",
  storageBucket: "e-shop-products-ca9e0.appspot.com",
  messagingSenderId: "841543374325",
  appId: "1:841543374325:web:59673b731db19d3de4bcbc",
  measurementId: "G-SFW49KSH0E"
};

const firebaseApp = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(firebaseApp);
        }
    });
}

const storage = getStorage(firebaseApp);

export { firebaseApp, storage, analytics };