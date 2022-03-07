
const avaleheNupp = document.getElementById('avalehele')
const yksikNupp = document.getElementById('yksikM2ng');
const avaleht = document.getElementById('avaleht');
const loosiratas = document.getElementById('loosiratas');
const loosirattaNupp = document.getElementById('loosirattanupp');
const kysimuseleht = document.getElementById('kysimuseleht');
/////////////////////////////////////////////////////////////////////////
// Raskustaseme valimine 
const raskustase = document.getElementById('raskustasemevaade');
const noobButton = document.getElementById('noob');
const expertButton = document.getElementById('expert');
let raskus = 1; //default 1, kui k6rgem tase siis muutub 2ks
let score = 1500;
noobButton.addEventListener('click', function() {
    raskustase.classList.add('hide')
    loosirattavaade();
});
expertButton.addEventListener('click', function() {
    raskustase.classList.add('hide');
    loosirattavaade();
    raskus = 2; 
});
/////////////////////////////////////////////////////////////////////////

function yksikM2ng() {
    avaleht.classList.add('hide');
    raskustase.classList.remove('hide');
}
let kategooriaNr = 1;
function loosirattavaade() {
    loosiratas.classList.remove('hide');
    const valik1 = document.getElementById('valik1');
    const valik2 = document.getElementById('valik2');
    valik1.addEventListener('click', function() {
        kategooriaNr = valik1.value;
        kysimus();
    })
    valik2.addEventListener('click', function() {
        kategooriaNr = valik1.value;
        kysimus();
    })
}
/* function kategooriaPopup() {
    document.getElementById('kategooriaPopup').classList.add('hide');
} */
function kysimus() {
    loosiratas.classList.add('hide');  
    //setTimeout('kategooriaPopup()', 5000);  
    kysimuseleht.classList.remove('hide');
    document.getElementById('kysimus').innerHTML=massiiv[0];
    document.getElementById('variant1').innerHTML=massiiv[1];
    document.getElementById('variant2').innerHTML=massiiv[2];
    document.getElementById('variant3').innerHTML=massiiv[3];
    document.getElementById('variant4').innerHTML=massiiv[4];
    getFromFirebase();

}
function mineAvalehele() { // v6iks kuidagi paremini selle nullimise teha, esialgu nii
    if(confirm('Tahad minna tagasi avalehele?')==true) {
        raskus = 1;
        score = 1500; 
        avaleht.classList.remove('hide');
        raskustase.classList.add('hide');
        loosiratas.classList.add('hide');
        kysimuseleht.classList.add('hide');
    } else {return}
}
avaleheNupp.addEventListener('click', mineAvalehele)
yksikNupp.addEventListener('click', yksikM2ng);
loosirattaNupp.addEventListener('click', kysimus); 


/////////////////////////////////////////////////////////////////////////
// Modaalakna avamine/sulgemine. 
// https://youtu.be/MBaw_6cPmAw
// https://github.com/WebDevSimplified/Vanilla-JavaScript-Modal
/////////////////////////////////////////////////////////////////////////
const openModalButton = document.querySelectorAll('[data-modal-target]');
const closeModalButton = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')
openModalButton.forEach(button=> {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal)
    })
})
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
      closeModal(modal)
    })
  })
closeModalButton.forEach(button=> {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal)
    })
})
function openModal(modal){
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active')
}
function closeModal(modal){
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active')
}
/////////////////////////////////////////////////////////////////////////
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
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
//const kataloog = ref(db, "kyssad/2/");
//const kataloog = ref(db, `kyssad/${kategooriaNr}/`);
/////////////////////////////////////////////////////////////////////////
// Kasutaja skoor Firebase andmebaasi
function kirjutaEdetabelisse(idnr,nickName, score, raskusTase) {
set(ref(db, 'edetabel/'+idnr), {
nickName: nickName,
score: score,
raskusTase: raskusTase
})}
//kirjutaEdetabelisse(123, 'Siim', 1500, 2);
/////////////////////////////////////////////////////////////////////////
// Kysimus Firebase andmebaasi
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
/////////////////////////////////////////////////////////////////////////

// Firebasest kysimuse lugemine
var massiiv = [];
let rightAnswer;
/* onValue(kataloog, gotData);               // Firebasest lugemise funktsioon
function gotData(data)  {                 // Firebasest saadud objekti töötlemine
let info = data.val();                  // Firebase snapshotist (data) Javascript objektiks muutmine (.val funktsioon)
let keys = Object.keys(info);           // JS Objekti (info) töötlemine massiiviks (keys)
for (let i =0;i<keys.length;i++){       // Massiivi läbikäimine
let r = keys[i];
massiiv.push(info[r].kyss);
massiiv.push(info[r].v1);
massiiv.push(info[r].v2);
massiiv.push(info[r].v3);
massiiv.push(info[r].v4);
massiiv.push(info[r].nF);
rightAnswer = massiiv[4];
let questions = massiiv.slice(1,5);
let randomizedQs = getShuffledArr(questions)
massiiv[1]=randomizedQs[0];
massiiv[2]=randomizedQs[1];
massiiv[3]=randomizedQs[2];
massiiv[4]=randomizedQs[3];
}} */
const getFromFirebase = async () => {
    const kataloog = ref(db, `kyssad/${kategooriaNr}/`);
    await onValue(kataloog, gotData);               // Firebasest lugemise funktsioon
function gotData(data)  {                 // Firebasest saadud objekti töötlemine
let info = data.val();                  // Firebase snapshotist (data) Javascript objektiks muutmine (.val funktsioon)
let keys = Object.keys(info);           // JS Objekti (info) töötlemine massiiviks (keys)
for (let i =0;i<keys.length;i++){       // Massiivi läbikäimine
let r = keys[i];
massiiv.push(info[r].kyss);
massiiv.push(info[r].v1);
massiiv.push(info[r].v2);
massiiv.push(info[r].v3);
massiiv.push(info[r].v4);
massiiv.push(info[r].nF);
rightAnswer = massiiv[4];
let questions = massiiv.slice(1,5);
let randomizedQs = getShuffledArr(questions)
massiiv[1]=randomizedQs[0];
massiiv[2]=randomizedQs[1];
massiiv[3]=randomizedQs[2];
massiiv[4]=randomizedQs[3];
}}
}
/////////////////////////////////////////////////////////////////////////
// Firebasest tulnud kysimuse vastuste randomizer
const getShuffledArr = arr => {
    const newArr = arr.slice()
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr
};
/////////////////////////////////////////////////////////////////////////
// vastusenuppude sissetoomine
const v1btn = document.getElementById('variant1');
const v2btn = document.getElementById('variant2');
const v3btn = document.getElementById('variant3');
const v4btn = document.getElementById('variant4');
const nextQ = document.getElementById('nextQuest');
/////////////////////////////////////////////////////////////////////////
// Vastamise korral vastuste nuppude deaktiveerimine
const btnDisabler = ()=> {
    v1btn.disabled = true;
    v2btn.disabled = true;
    v3btn.disabled = true;
    v4btn.disabled = true;
}
/////////////////////////////////////////////////////////////////////////
// Uue kyssa korral vastuste nuppude aktiveerimine
const btnEnabler = ()=> {
    v1btn.disabled = false;
    v2btn.disabled = false;
    v3btn.disabled = false;
    v4btn.disabled = false;
    v1btn.style.cssText = ""; // et vastatud nupu v2rvist lahti saada! 
    v2btn.style.cssText = ""; // loll lahendus, aga praegu t88tab nii
    v3btn.style.cssText = ""; 
    v4btn.style.cssText = ""; 
}
/////////////////////////////////////////////////////////////////////////
// Vastatud kysimuse v6rdlus
const checkAnswer = (event) =>{
    let vastatudVariant = event.target.innerHTML;
    if(vastatudVariant == rightAnswer) {
        alert('õige'); 
        event.target.style.cssText = "background-color: green;"; 
        showNerdFact();
        btnDisabler();
        nextQ.classList.remove('hide');

    } else { 
        alert('vale');
        event.target.style.cssText = "background-color: red;";
        btnDisabler();
        nextQ.classList.remove('hide');
    };
}
v1btn.addEventListener('click', checkAnswer);
v2btn.addEventListener('click', checkAnswer);
v3btn.addEventListener('click', checkAnswer);
v4btn.addEventListener('click', checkAnswer);
const uueleRingile = () => {
    btnEnabler();
    kysimuseleht.classList.add('hide');
    nerdFactContainer.classList.add('hide');

    loosirattavaade();
}
nextQ.addEventListener('click', uueleRingile);

/////////////////////////////////////////////////////////////////////////
// Nedfacti kuvamine
const nerdFactContainer = document.getElementById('nerdFactContainer');
const nF = document.getElementById('nF');
const showNerdFact = () => {
    nerdFactContainer.classList.remove('hide');
    nF.innerHTML = "Nerdfact: " + massiiv[5];
}
/////////////////////////////////////////////////////////////////////////