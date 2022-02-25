import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getDatabase, ref, push, set, onValue, child } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";


        const firebaseConfig = {
          apiKey: "AIzaSyDdQgId5KxG2njnNzXfPEDzcSVr1RP7oNs",
          authDomain: "eestikas-6f705.firebaseapp.com",
          projectId: "eestikas-6f705",
          storageBucket: "eestikas-6f705.appspot.com",
          messagingSenderId: "1084995879544",
          appId: "1:1084995879544:web:87291f0db37772320fa38d",
          measurementId: "G-LGEX051Y8H"
        };
      
        // Initialize Firebase
       export const app = initializeApp(firebaseConfig);
       export  const db = getDatabase();

