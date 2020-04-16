import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyClJHzP5liP5pcZluDQu-5WNcJVPfALNkA",
    authDomain: "e-commerce-jd.firebaseapp.com",
    databaseURL: "https://e-commerce-jd.firebaseio.com",
    projectId: "e-commerce-jd",
    storageBucket: "e-commerce-jd.appspot.com",
    messagingSenderId: "743596077845",
    appId: "1:743596077845:web:7a9daf05a88b794291ef1c"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;