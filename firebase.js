  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
  import { getDatabase, ref, push, set, onValue, child } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";


  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDdQgId5KxG2njnNzXfPEDzcSVr1RP7oNs",
    authDomain: "eestikas-6f705.firebaseapp.com",
    databaseURL: "https://eestikas-6f705-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "eestikas-6f705",
    storageBucket: "eestikas-6f705.appspot.com",
    messagingSenderId: "1084995879544",
    appId: "1:1084995879544:web:87291f0db37772320fa38d",
    measurementId: "G-LGEX051Y8H"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const kataloog = ref(db, "kyssad");
  onValue(kataloog, gotData);               // Firebasest lugemise funktsioon
  function gotData(data)  {                 // Firebasest saadud objekti töötlemine
    let info = data.val();                  // Firebase snapshotist (data) Javascript objektiks muutmine (.val funktsioon)
   
    console.log(info);
}