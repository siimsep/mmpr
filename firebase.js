/*   import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
  import { getDatabase, ref, push, set, onValue, child, get } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";


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
  const kataloog = ref(db, "kyssad/2/");


function kirjutaEdetabelisse(idnr,nickName, score, raskusTase) {
  set(ref(db, 'edetabel/'+idnr), {
  nickName: nickName,
  score: score,
  raskusTase: raskusTase
})}
//kirjutaEdetabelisse(123, 'Siim', 1500, 2);
function kirjutaKysimus(catId, kyss, v1, v2, v3, v4, nF) {
  const uusKyss = push(ref(db, "kyssad/"+catId));
  set(child(uusKyss, "kyss"), kyss);
  set(child(uusKyss, "v1"), v1);
  set(child(uusKyss, "v2"), v2);
  set(child(uusKyss, "v3"), v3);
  set(child(uusKyss, "v4"), v4);
  set(child(uusKyss, "nF"), nF);
}
//kirjutaKysimus(2, 'Mis linnas asub Haapsalu kolledz?', 'Jäneda', 'Vinni-Pajusti', 'Särevere', 'Haapsalu', 'Haapsalu kolledž asub Haapsalus, Lihula maanteel.')

onValue(kataloog, gotData);               // Firebasest lugemise funktsioon
function gotData(data)  {                 // Firebasest saadud objekti töötlemine
  let info = data.val();                  // Firebase snapshotist (data) Javascript objektiks muutmine (.val funktsioon)
  let keys = Object.keys(info);           // JS Objekti (info) töötlemine massiiviks (keys)
  for (let i =0;i<keys.length;i++){       // Massiivi läbikäimine
    let r = keys[i];
    var massiiv = []                      // Uus tühi massiiv, kuhu kogume saadud infot

    massiiv.push(info[r].kyss);
    massiiv.push(info[r].v1);
    massiiv.push(info[r].v2);
    massiiv.push(info[r].v3);
    massiiv.push(info[r].v4);
    massiiv.push(info[r].nF);
    
}}
 */