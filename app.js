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
let valedVastused = 0;
let maxVigu;
let maxVigu1 = 3;
let maxVigu2 = 5;
let m2nguVali;
let m2nguVali1 = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let m2nguVali2 = [1, 1, 2, 2, 3, 3, 4, 4, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
noobButton.addEventListener('click', function() {
    raskustase.classList.add('hide')
    m2nguVali = m2nguVali1;
    maxVigu = maxVigu1;
    loosirattavaade();
});
expertButton.addEventListener('click', function() {
    raskustase.classList.add('hide');
    maxVigu = maxVigu2;
    m2nguVali = m2nguVali2
    loosirattavaade();
});
/////////////////////////////////////////////////////////////////////////
// Firebase 
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getDatabase, ref, push, set, child, get} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js";
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
const app = initializeApp(firebaseConfig);
const db = getDatabase();
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
//kirjutaKysimus(2, 'Mis teed veel?', 'Vastan', 'Mõtlen küsimusi', 'Arendan', 'Katsetan', 'Eks ta ole.')
/////////////////////////////////////////////////////////////////////////
// Firebasest kysimuse lugemine
const dbRef = ref(getDatabase());
let massiiv;
let rightAnswer;
let kategooriaNr = 1;
let kysimusedDbst = [];
let vastatudKysimused = [];
let juhuslikValik;


const valik =  function(items) {
    juhuslikValik = items[Math.floor(Math.random()*items.length)];   
    if(!vastatudKysimused.includes(juhuslikValik)) {
        vastatudKysimused.push(juhuslikValik);
        return uusInfo();
    } else {
        valik(kysimusedDbst)}
        //valik(kysimusedDbst) siin peab midagi kavalat v2lja m6tlema!
        //console.log(juhuslikValik+' on juba kysitud'); };
    
}
/* const andmebaasist =  function() {
    
    get(child(dbRef, `kyssad`)).then((snapshot) => {
        if (snapshot.exists()) {
            let info = snapshot.val();                  // Firebase snapshotist (data) Javascript objektiks muutmine (.val funktsioon)
            let keys = Object.keys(info);           // JS Objekti (info) töötlemine massiiviks (keys)
            console.log(keys);
        } else {
            //kategooriaJargiKysimused();
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
}

 */
const kategooriaJargiKysimused =  function() {
    get(child(dbRef, `kyssad/${kategooriaNr}`)).then((snapshot) => {
        if (snapshot.exists()) {
            let info = snapshot.val();                  // Firebase snapshotist (data) Javascript objektiks muutmine (.val funktsioon)
            let keys = Object.keys(info);           // JS Objekti (info) töötlemine massiiviks (keys)
            for (let i =0;i<keys.length;i++){       // Massiivi läbikäimine
            let r = keys[i];
            kysimusedDbst.push(r);
        } return valik(kysimusedDbst);
        } else {
            //kategooriaJargiKysimused();
          console.log("No data available :D");
        }
      }).catch((error) => {
        console.error(error);
      });
}
const uusInfo =  function() {
     get(child(dbRef, `kyssad/${kategooriaNr}`)).then((snapshot) => {
        if(snapshot.exists()) {
            let info = snapshot.val(); 
            let keys = Object.keys(info);               
            const index = keys.findIndex(item => item === juhuslikValik);
            let kysimus = (info[keys[index]]);
            massiiv = [];
            massiiv.push(kysimus.kyss);
            massiiv.push(kysimus.v1);
            massiiv.push(kysimus.v2);
            massiiv.push(kysimus.v3);
            massiiv.push(kysimus.v4);
            massiiv.push(kysimus.nF);
            rightAnswer = massiiv[4];
            let questions = massiiv.slice(1,5);
            let randomizedQs = getShuffledArr(questions)
            massiiv[1]=randomizedQs[0];
            massiiv[2]=randomizedQs[1];
            massiiv[3]=randomizedQs[2];
            massiiv[4]=randomizedQs[3];
            return massiivistKysimuseni(massiiv);
            } else {
                console.log("No data available :(");
              }
            }).catch((error) => {
              console.error(error);
            
    })
}

function yksikM2ng() {
    avaleht.classList.add('hide');
    raskustase.classList.remove('hide');
    avaleheNupp.classList.remove('hide');
    return
}
function loosirattavaade() {
    loosiratas.classList.remove('hide');
}
function getRand(){
    return m2nguVali.splice(Math.random() * m2nguVali.length | 0, 1)[0];
  }
/* function kategooriaPopup() {
    document.getElementById('kategooriaPopup').classList.add('hide');
} */

const kysimus = function() {
    console.log(m2nguVali);
    loosiratas.classList.add('hide');  
    //setTimeout('kategooriaPopup()', 5000);  
    kysimuseleht.classList.remove('hide');
    kategooriaNr = getRand();
    skoorike.classList.remove('hide');
    return kategooriaJargiKysimused();   
    
}
let startCountDown;
const massiivistKysimuseni = function(n2idis){
    document.getElementById('kysimus').innerHTML=n2idis[0];
    document.getElementById('variant1').innerHTML=n2idis[1];
    document.getElementById('variant2').innerHTML=n2idis[2];
    document.getElementById('variant3').innerHTML=n2idis[3];
    document.getElementById('variant4').innerHTML=n2idis[4];
    startCountDown = setInterval(countDown, 1000)
    return
}

function mineAvalehele() { // v6iks kuidagi paremini selle nullimise teha, esialgu nii
if(confirm('Tahad minna tagasi avalehele?')==true) {
    vastatudKysimused = [];
    juhuslikValik = '';
    kysimusedDbst = [];
    avaleht.classList.remove('hide');
    raskustase.classList.add('hide');
    loosiratas.classList.add('hide');
    kysimuseleht.classList.add('hide');
    nerdFactContainer.classList.add('hide');
    btnEnabler();
    nextQ.classList.add('hide');
    avaleheNupp.classList.add('hide');
    skoorike.classList.add('hide');
    skoorike.innerHTML = '';
    totalScore = 0;
    m2nguVali1 = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    m2nguVali2 = [1, 1, 2, 2, 3, 3, 4, 4, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
    return
} else {return}
}
avaleheNupp.addEventListener('click', mineAvalehele)
yksikNupp.addEventListener('click', yksikM2ng);
loosirattaNupp.addEventListener('click', kysimus); 
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
const skoorike = document.getElementById('skoorike');
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
        //console.log('aeg',timeLeft);
        clearInterval(startCountDown);
        totalScore += timeLeft;
        //console.log('skoor: ',totalScore);
        skoorike.innerHTML=`Skoor: ${totalScore}`;
        timeLeft = 60;
        alert('õige'); 
        event.target.style.cssText = "background-color: green;"; 
        showNerdFact();
        btnDisabler();
        kysimusedDbst = [];
        if(m2nguVali.length === 0){
            alert(`braavo, said k6ik kysimused vastatud! Sinu kogutud punktisummaks tuli ${totalScore}`); 
        } else {
            nextQ.classList.remove('hide');}

    } else { 
        ++valedVastused;
        m2nguVali.push(kategooriaNr);
        clearInterval(startCountDown);
        timeLeft = 60;
        if(valedVastused === maxVigu){
            alert('vastasid liiga palju kordi valesti. :( loodetavasti kunagi tuleb siia skoor, mille saad edetabelisse lykata');
            if(v1btn.innerHTML == rightAnswer){
                v1btn.style.cssText = "background-color: green;"
            } else if(v2btn.innerHTML == rightAnswer){
                v2btn.style.cssText = "background-color: green;"
            } else if(v3btn.innerHTML == rightAnswer){
                v3btn.style.cssText = "background-color: green;"
            } else if(v4btn.innerHTML == rightAnswer){
                v4btn.style.cssText = "background-color: green;"
            };
            event.target.style.cssText = "background-color: red;";
            btnDisabler();
            showNerdFact();
        } else {
        alert('vale');    
        kysimusedDbst = [];

        if(v1btn.innerHTML == rightAnswer){
            v1btn.style.cssText = "background-color: green;"
        } else if(v2btn.innerHTML == rightAnswer){
            v2btn.style.cssText = "background-color: green;"
        } else if(v3btn.innerHTML == rightAnswer){
            v3btn.style.cssText = "background-color: green;"
        } else if(v4btn.innerHTML == rightAnswer){
            v4btn.style.cssText = "background-color: green;"
        };
        event.target.style.cssText = "background-color: red;";
        btnDisabler();
        showNerdFact();
        nextQ.classList.remove('hide');}
    };
}
v1btn.addEventListener('click', checkAnswer);
v2btn.addEventListener('click', checkAnswer);
v3btn.addEventListener('click', checkAnswer);
v4btn.addEventListener('click', checkAnswer);
const uueleRingile = () => {
    btnEnabler();
    kysimuseleht.classList.add('hide');
    nextQ.classList.add('hide');
    nerdFactContainer.classList.add('hide');
    skoorike.classList.add('hide');
    loosirattavaade();
}
nextQ.addEventListener('click', uueleRingile);

/////////////////////////////////////////////////////////////////////////
// Nedfacti kuvamine
const nerdFactContainer = document.getElementById('nerdFactContainer');
const nF = document.getElementById('nF');
const showNerdFact = () => {
    nerdFactContainer.classList.remove('hide');
    nF.innerHTML = "Fakte nohikutele: " + massiiv[5];
}
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
// Kasutaja Kysimus Firebase andmebaasi

window.kysimusKasutajalt = function() {
    const submitCategory = document.getElementById('submitCat').value;
    const submitQuestion = document.getElementById("submittedQuestion");
    const submitV1 = document.getElementById("v1");
    const submitV2 = document.getElementById("v2");
    const submitV3 = document.getElementById("v3");
    const submitV4 = document.getElementById("v4");
    const submitNf = document.getElementById("nfact");
    const submitJuser = document.getElementById("juser");
    const uusKyss = push(ref(db, `kyssadKasutajatelt/`+submitCategory)); 
    set(child(uusKyss, "kyss"), submitQuestion.value);
    set(child(uusKyss, "v1"), submitV1.value);
    set(child(uusKyss, "v2"), submitV2.value);
    set(child(uusKyss, "v3"), submitV3.value);
    set(child(uusKyss, "v4"), submitV4.value);
    set(child(uusKyss, "nF"), submitNf.value);
    set(child(uusKyss, "juser"), submitJuser.value);
    submitQuestion.value = '';
    submitV1.value = '';
    submitV2.value = '';
    submitV3.value = '';
    submitV4.value = '';
    submitNf.value='';
    submitJuser.value='';
    alert('meie t2name')
}

//kysimusKasutajalt(2, 'Mis teed veel?', 'Vastan', 'Mõtlen küsimusi', 'Arendan', 'Katsetan', 'Eks ta ole.', "siim")
/////////////////////////////////////////////////////////////////////////
// Punktimajandus
//let startCountDown = setInterval(countDown, 1000)
let timeLeft = 60
let totalScore = 0
function countDown(){
    timeLeft--;
    if(timeLeft === 0){
        clearInterval(startCountDown);
        console.log('aeg sai otsa')
    }
}

