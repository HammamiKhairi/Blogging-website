
const firebaseConfig = {
  apiKey: "AIzaSyDxmyCiiJcEPEbXKOPtbfz2xmJRwWRHVL8",
  authDomain: "da-blog-0.firebaseapp.com",
  projectId: "da-blog-0",
  storageBucket: "da-blog-0.appspot.com",
  messagingSenderId: "283896420081",
  appId: "1:283896420081:web:2f57ba90958a628bef7b50",
  measurementId: "G-0WNJL6YRS4"
};


firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();