//---------------------------------------------------------------------
// Your web app's Firebase configuration;
// Speficies which firebase project your application is connected with.
//---------------------------------------------------------------------

// Our API
var firebaseConfig = {
    
  apiKey: "AIzaSyDWTUQMurE64ovJnLuICKLCgz2zSlsW0eo",
    authDomain: "cybersify-2019.firebaseapp.com",
    databaseURL: "https://cybersify-2019.firebaseio.com",
    projectId: "cybersify-2019",
    storageBucket: "cybersify-2019.appspot.com",
    messagingSenderId: "286797146225",
    appId: "1:286797146225:web:f5c728822bba76ec9053d0"
  
};

// Initialize Firebase
// Henceforce, any reference to the database can be made with "db"
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
