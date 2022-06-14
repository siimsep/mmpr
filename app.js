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
        kergeRaskusEdekas();
        raskeRaskusEdekas();
        openModal(modal);
        createsound('pop_up_nupp');        
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
        closeModal(modal);
        
    })
})
function openModal(modal){
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active')
}
function closeModal(modal){
    if (modal == null) return;
    createsound('nupp');
    modal.classList.remove('active');
    overlay.classList.remove('active');
    kergeKasutaja.innerHTML = '';
    raskeKasutaja.innerHTML = '';
}
/////////////////////////////////////////////////////////////////////////
const avaleheNupp = document.getElementById('avalehele')
const yksikNupp = document.getElementById('yksikM2ng');
const avaleht = document.getElementById('avaleht');
const kysimuseleht = document.getElementById('kysimuseleht');
const avalehenupud = document.getElementById('avalehenupud');
/////////////////////////////////////////////////////////////////////////
// Raskustaseme valimine 
const raskustase = document.getElementById('raskustasemevaade');
const noobButton = document.getElementById('noob');
const expertButton = document.getElementById('expert');
let valedVastused = 0;
let maxVigu;
let maxVigu1 = 3;
let maxVigu2 = 3;
let m2nguVali;
let m2nguVali1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let m2nguVali2 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
let raskusTaseNr;
noobButton.addEventListener('click', function() {
    createsound('nupp');
    raskustase.style.setProperty('display', 'none');
    avaleht.style.setProperty('display', 'none');
    m2nguVali = m2nguVali1;
    maxVigu = maxVigu1;
    raskusTaseNr = 1;
    kysimus()
});
expertButton.addEventListener('click', function() {
    createsound('nupp');
    raskustase.style.setProperty('display', 'none');
    avaleht.style.setProperty('display', 'none');
    maxVigu = maxVigu2;
    m2nguVali = m2nguVali2
    raskusTaseNr = 2;
    kysimus()
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
// Kysimus Firebase andmebaasi
/* function kirjutaKysimus(catId, kyss, v1, v2, v3, v4, nF) {
const uusKyss = push(ref(db, "kyssad/"+catId)); 
set(child(uusKyss, "kyss"), kyss);
set(child(uusKyss, "v1"), v1);
set(child(uusKyss, "v2"), v2);
set(child(uusKyss, "v3"), v3);
set(child(uusKyss, "v4"), v4);
set(child(uusKyss, "nF"), nF);
} */
//kirjutaKysimus(2, 'Siin on küsimus?', 'Vale 1', 'Vale 2', 'Vale 3', 'Õige', 'Nii-nimetatud nerd-fact lisaks')
/////////////////////////////////////////////////////////////////////////
// Kasutaja Kysimus Firebase andmebaasi


const kysimusKasutajalt = async function() {
    const submitCategory = document.getElementById('submitCat').value;
    const submitQuestion = document.getElementById("submittedQuestion");
    const submitV1 = document.getElementById("v1");
    const submitV2 = document.getElementById("v2");
    const submitV3 = document.getElementById("v3");
    const submitV4 = document.getElementById("v4");
    const submitMemo = document.getElementById('memo');
    const submitNf = document.getElementById("nfact");
    const submitJuser = document.getElementById("juser");
    if (submitQuestion.value == '') {
        alert('Küsimus on puudu!! :(');
        return
    }
    if (submitV4.value == '') {
        alert('Vastus on puudu!! :(');
        return
    }    
    const uusKyss = push(ref(db, `kyssadKasutajatelt/`+submitCategory)); 
    set(child(uusKyss, "kyss"), submitQuestion.value);
    set(child(uusKyss, "v1"), submitV1.value);
    set(child(uusKyss, "v2"), submitV2.value);
    set(child(uusKyss, "v3"), submitV3.value);
    set(child(uusKyss, "v4"), submitV4.value);
    set(child(uusKyss, "memo"), submitMemo.value);
    set(child(uusKyss, "nF"), submitNf.value);
    set(child(uusKyss, "juser"), submitJuser.value);
    submitQuestion.value = '';
    submitV1.value = '';
    submitV2.value = '';
    submitV3.value = '';
    submitV4.value = '';
    submitMemo.value = '';
    submitNf.value='';
    submitJuser.value='';
    document.getElementById("sendQsuccess").style.setProperty('display', 'block');
    await wait(3000);
    document.getElementById("sendQsuccess").style.setProperty('display', 'none');
  }
const sendQ = document.getElementById("sendQ");
sendQ.addEventListener("click", kysimusKasutajalt);
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
}

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
    createsound('nupp');
    avalehenupud.style.setProperty('display', 'none')
    raskustase.style.setProperty('display', 'block');
    avaleheNupp.classList.remove('hide');
    return
}
function getRand(){
    return m2nguVali.splice(Math.random() * m2nguVali.length | 0, 1)[0];
  }

const popup = document.getElementById('kategooriaPopup');
let popupinit = popup.innerHTML;
const showCategory = async function(nr) {
    createsound('maakonna_ilmumine')
     if(nr == 1) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/harju.png"/><img class="county zoomword" src="images/harjutekst.png"/>`;
    } else if (nr == 2) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/hiiu.png"/><img class="county zoomword" src="images/hiiutekst.png"/>`;
    } else if (nr == 3) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/idaviru.png"/><img class="county zoomword" src="images/idatekst.png"/>`;
    } else if (nr == 4) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/jarvemaa.png"/><img class="county zoomword" src="images/jarvatekst.png"/>`;
    }
    else if (nr == 5) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/jogeva.png"/><img class="county zoomword" src="images/jogevatekst.png"/>`;
    }
    else if (nr == 6) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/laanemaa.png"/><img class="county zoomword" src="images/laanetekst.png"/>`; 
    }else if (nr == 7) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/laaneviru.png"/><img class="county zoomword" src="images/laanevirutekst.png"/>`;
    } else if (nr == 8) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/parnu.png"/><img class="county zoomword" src="images/parnutekst.png"/>`;
    } else if (nr == 9) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/polva.png"/><img class="county zoomword" src="images/polvatekst.png"/>`;
    } else if (nr == 10) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/raplamaa.png"/><img class="county zoomword" src="images/raplatekst.png"/>`;
    } else if (nr == 11) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/saare.png"/><img class="county zoomword" src="images/saaretekst.png"/>`;
    } else if (nr == 12) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/tartumaa.png"/><img class="county zoomword" src="images/tartutekst.png"/>`;
    } else if (nr == 13) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/valga.png"/><img class="county zoomword" src="images/valgatekst.png"/>`;
    } else if (nr == 14) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/viljandi.png"/><img class="county zoomword" src="images/viljanditekst.png"/>`;
    } else if (nr == 15) {
        await wait(500);
        popup.innerHTML += `<img class="county fade-in" src="images/voru.png"/><img class="county zoomword" src="images/vorutekst.png"/>`;
    }    
}
const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
const showMap = function(somewhere) {
    

    if (!m2nguVali.includes(1)) {
        somewhere.innerHTML += `<img class="county" src="images/harju.png"/>` 
    } 
    if ((countOccurrences(m2nguVali, 1)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/harju.png"/>` 
    }
    if (!m2nguVali.includes(2)) {
        somewhere.innerHTML += `<img class="county" src="images/hiiu.png"/>`
    }
    if ((countOccurrences(m2nguVali, 2)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/hiiu.png"/>`
    }
    if (!m2nguVali.includes(3)) {
        somewhere.innerHTML += `<img class="county" src="images/idaviru.png"/>`
    }
    if ((countOccurrences(m2nguVali, 3)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/idaviru.png"/>`
    }
    if (!m2nguVali.includes(4)) {
        somewhere.innerHTML += `<img class="county" src="images/jarvemaa.png"/>`;
    }
    if ((countOccurrences(m2nguVali, 4)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/jarvemaa.png"/>`
    }
    if (!m2nguVali.includes(5)) {
        somewhere.innerHTML += `<img class="county" src="images/jogeva.png"/>`;
    } 
     if ((countOccurrences(m2nguVali, 5)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/jogeva.png"/>`
    }
    if (!m2nguVali.includes(6)) {
        somewhere.innerHTML += `<img class="county"  src="images/laanemaa.png"/>`;
    } 
    if ((countOccurrences(m2nguVali, 6)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/laanemaa.png"/>`
    } 
    if (!m2nguVali.includes(7)) {
        somewhere.innerHTML += `<img class="county"  src="images/laaneviru.png"/>`;
    } 
    if ((countOccurrences(m2nguVali, 7)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/laaneviru.png"/>`
    }
    if (!m2nguVali.includes(8)) {
        somewhere.innerHTML += `<img class="county"  src="images/parnu.png"/>`;
    } 
    if ((countOccurrences(m2nguVali, 8)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/parnu.png"/>`
    }
    if (!m2nguVali.includes(9)) {
        somewhere.innerHTML += `<img class="county"  src="images/polva.png"/>`;
    } 
    if ((countOccurrences(m2nguVali, 9)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/polva.png"/>`
    }
    if (!m2nguVali.includes(10)) {
        somewhere.innerHTML += `<img class="county"  src="images/raplamaa.png"/>`;
    } 
    if ((countOccurrences(m2nguVali, 10)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/raplamaa.png"/>`
    }
    if (!m2nguVali.includes(11)) {
        somewhere.innerHTML += `<img class="county"  src="images/saare.png"/>`;
    } 
    if ((countOccurrences(m2nguVali, 11)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/saare.png"/>`
    }
    if (!m2nguVali.includes(12)) {
        somewhere.innerHTML += `<img class="county"  src="images/tartumaa.png"/>`;
    } 
    if ((countOccurrences(m2nguVali, 12)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/tartumaa.png"/>`
    }
    if (!m2nguVali.includes(13)) {
        somewhere.innerHTML += `<img class="county"  src="images/valga.png"/>`;
    } 
    if ((countOccurrences(m2nguVali, 13)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/valga.png"/>`
    }
    if (!m2nguVali.includes(14)) {
        somewhere.innerHTML += `<img class="county"  src="images/viljandi.png"/>`;
    } 
    if ((countOccurrences(m2nguVali, 14)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/viljandi.png"/>`
    }
    if (!m2nguVali.includes(15)) {
        somewhere.innerHTML += `<img class="county"  src="images/voru.png"/>`;
    } 
    if ((countOccurrences(m2nguVali, 14)===1) && (raskusTaseNr === 2)){
        somewhere.innerHTML += `<img class="countygrey" src="images/voru.png"/>`
    }
}
const kysimus = async function() {
    await showMap(popup);
    kategooriaNr = getRand();
    showCategory(kategooriaNr);
    popup.style.setProperty("display", "flex");
    //await wait(1000);
    await wait(2000);
    popup.style.setProperty("display", "none")
    popup.innerHTML = popupinit;
    //kysimuseleht.classList.remove('hide');
    skoorike.classList.remove('hide');
    timeLeft = 20;
    return kategooriaJargiKysimused();       
}

let startCountDown;
const massiivistKysimuseni = function(n2idis){
    document.getElementById('kysimus').innerHTML=n2idis[0];
    document.getElementById('variant1').innerHTML=n2idis[1];
    document.getElementById('variant2').innerHTML=n2idis[2];
    document.getElementById('variant3').innerHTML=n2idis[3];
    document.getElementById('variant4').innerHTML=n2idis[4];
    kysimuseleht.style.setProperty('display', 'block')
    startCountDown = setInterval(countDown, 1000);
    //createsound("timer");
    playAudio();
    return
}

function mineAvalehele() { // v6iks kuidagi paremini selle nullimise teha, esialgu nii
    pauseAudio();
    vastatudKysimused = [];
    juhuslikValik = '';
    kysimusedDbst = [];
    avaleht.style.setProperty('display', 'flex');
    avalehenupud.style.setProperty('display', 'block');
    raskustase.style.setProperty('display', 'none');
    kysimuseleht.style.setProperty('display', 'none')
    nerdFactContainer.classList.add('hide');
    btnEnabler();
    nextQ.style.setProperty("display", "none")
    //nextQ.classList.add('hide');
    avaleheNupp.classList.add('hide');
    skoorike.classList.add('hide');
    skoorike.innerHTML = '';
    totalScore = 0;
    m2nguVali1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    m2nguVali2 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15];
    valedVastused = 0;
    skoorEdetabelisse.classList.add('hide');
    skoorEdetabelisseInput.classList.remove('hide');
    skoorEdetabelisseHtmlDiv.innerHTML = ("");  // !!!!!!!!!!
    const gameEnd = document.getElementById('gameEnd');
    gameEnd.classList.add('hide');
    closeModal(skoorEdetabelisse);
    
}
avaleheNupp.addEventListener('click', mineAvalehele)
yksikNupp.addEventListener('click', yksikM2ng);

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
let timerbar = document.getElementById("timerbar");
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
const checkAnswer = async (event) =>{
    timerbar.style.setProperty("display", "none");
    pauseAudio();
    let vastatudVariant = event.target.innerHTML;  
    if(vastatudVariant == rightAnswer) {
        createsound('oige');
        clearInterval(startCountDown);
        totalScore += timeLeft;
        skoorike.innerHTML=`Skoor: ${totalScore}`;
        timeLeft = 20; 
        event.target.style.cssText = "background-color: #04AA6D; color: white"; 
        await wait(500);
        showNerdFact();
        btnDisabler();
        kysimusedDbst = [];
        if(m2nguVali.length === 0){
            await wait(2000);
            skoorEdetabelisse.classList.remove('hide');
            skoorEdetabelisseHtmlDiv.classList.remove("hide");
            showMap(skoorEdetabelisseHtmlDivImg);
            createsound('celebration');
            skoorEdetabelisseHtmlDiv.innerHTML += (`Palju õnne, mäng sai läbi. <br><br>Sinu skooriks tuli: ${totalScore}<br>`);
            openModal(skoorEdetabelisse);

        } else {
            nextQ.style.setProperty("display", "flex")    
        }
    } else { 
        createsound('vale');
        ++valedVastused;
        m2nguVali.push(kategooriaNr);
        clearInterval(startCountDown);
        timeLeft = 20;
        if(valedVastused === maxVigu){
            skoorEdetabelisse.classList.remove('hide');
            skoorEdetabelisseHtmlDiv.classList.remove("hide");
            showMap(skoorEdetabelisseHtmlDivImg);
            skoorEdetabelisseHtmlDiv.innerHTML += (`Vastasid liiga palju kordi valesti, sinu mängu skooriks tuli: ${totalScore}<br>`);
            if(v1btn.innerHTML == rightAnswer){
                v1btn.style.cssText = "background-color: #04AA6D; color: white;"
            } else if(v2btn.innerHTML == rightAnswer){
                v2btn.style.cssText = "background-color: #04AA6D; color: white;"
            } else if(v3btn.innerHTML == rightAnswer){
                v3btn.style.cssText = "background-color: #04AA6D; color: white;"
            } else if(v4btn.innerHTML == rightAnswer){
                v4btn.style.cssText = "background-color: #04AA6D; color: white;"
            };
            event.target.style.cssText = "background-color: rgb(221, 98, 78);";
            await wait(2500)
            openModal(skoorEdetabelisse);
            btnDisabler();
            showNerdFact();
        } else {
        kysimusedDbst = [];
        if(v1btn.innerHTML == rightAnswer){
            v1btn.style.cssText = "background-color: #04AA6D; color: white;"
        } else if(v2btn.innerHTML == rightAnswer){
            v2btn.style.cssText = "background-color: #04AA6D; color: white;"
        } else if(v3btn.innerHTML == rightAnswer){
            v3btn.style.cssText = "background-color: #04AA6D; color: white;"
        } else if(v4btn.innerHTML == rightAnswer){
            v4btn.style.cssText = "background-color: #04AA6D; color: white;"
        };
        event.target.style.cssText = "background-color: rgb(221, 98, 78); color: white;";
        await wait(500);
        showNerdFact();
        btnDisabler();
        nextQ.style.setProperty("display", "flex")    
    }
    };
}
v1btn.addEventListener('click', checkAnswer);
v2btn.addEventListener('click', checkAnswer);
v3btn.addEventListener('click', checkAnswer);
v4btn.addEventListener('click', checkAnswer);
const uueleRingile = () => {
    btnEnabler();
    createsound('nupp');
    kysimuseleht.style.setProperty('display', 'none')
    nextQ.style.setProperty("display", "none")
    //nextQ.classList.add('hide');
    nerdFactContainer.classList.add('hide');
    skoorike.classList.add('hide');
    timerbar.style.setProperty("display", "block");
    kysimus()
}
nextQ.addEventListener('click', uueleRingile);

/////////////////////////////////////////////////////////////////////////
// Taimer pausi tekitamiseks
function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
/////////////////////////////////////////////////////////////////////////
// Nedfacti kuvamine
const nerdFactContainer = document.getElementById('nerdFactContainer');
const nF = document.getElementById('nF');
const showNerdFact = () => {
    nerdFactContainer.classList.remove('hide');
    nF.innerHTML = massiiv[5];
}
/////////////////////////////////////////////////////////////////////////
// Kasutaja skoor Firebase andmebaasi
const skoorEdetabelisseInput = document.getElementById('skoorEdetabelisseInput');
window.skoorFirebase = async function() {
    const edeTabelisse = push(ref(db, `edetabel/${raskusTaseNr}`));
    const m2ngijaNimi = document.getElementById('m2ngijaNimi').value;
    set(child(edeTabelisse, 'm2ngijaNimi'), m2ngijaNimi);
    set(child(edeTabelisse, 'skoor'), totalScore);
    skoorEdetabelisseHtmlDiv.classList.add('hide');
    skoorEdetabelisseInput.classList.add('hide');
    gameEnd.classList.remove('hide');
}

const modaaliKodunupp = document.getElementById('mineAvaleheleModaalist');
modaaliKodunupp.addEventListener('click', mineAvalehele)

//kysimusKasutajalt(2, 'Mis teed veel?', 'Vastan', 'Mõtlen küsimusi', 'Arendan', 'Katsetan', 'Eks ta ole.', "siim")
/////////////////////////////////////////////////////////////////////////
// Punktimajandus
//let startCountDown = setInterval(countDown, 1000)
let timeLeft = 20
let totalScore = 0
function countDown(){
    timeLeft--;
    if(timeLeft == 0){
        clearInterval(startCountDown);
        console.log('aeg sai otsa')
    }
}
/////////////////////////////////////////////////////////////////////////
// Edetabel
let info = null;
const kergeKasutaja = document.getElementById("kergeKasutaja")
const raskeKasutaja = document.getElementById("raskeKasutaja")

const kergeRaskusEdekas = function() {
    get(child(dbRef, `edetabel/1`)).then((snapshot) => {
        if (snapshot.exists()) {
            info = snapshot.val();
            //let keys = Object.keys(info); 
            let nm = Object.values(info); 
            nm.sort((a, b) => {
                return b.skoor - a.skoor;
            });     
            for (let i =0;i<5;i++){       
            let r = nm[i]; 
            kergeKasutaja.innerHTML += r.m2ngijaNimi + ` ` + r.skoor +`<br>`;
            }
            
        } else {
            console.log("No data available :X");
        }
      }).catch((error) => {
        console.error(error);
      });
}
const raskeRaskusEdekas = function() {
     get(child(dbRef, `edetabel/2`)).then((snapshot) => {
        if (snapshot.exists()) {
            info = snapshot.val();
            //let keys = Object.keys(info); 
            let nm = Object.values(info);     
            nm.sort((a, b) => {
                return b.skoor - a.skoor;
            });

            for (let i =0;i<5;i++){       
            let r = nm[i]; 
            raskeKasutaja.innerHTML += r.m2ngijaNimi + ` ` + r.skoor +`<br>`;
            }
            
        } else {
            console.log("No data available :X");
        }
      }).catch((error) => {
        console.error(error);
      });   
}

/////////////////////////////////////////////////////////////////////////
// Audio on-off icon toggle
var silence = false;

function muteAudio() {
silence = !silence
}
const ico = document.getElementById("audioIcon");

function chngimg() {
    var img = ico.src;
    if (img.indexOf('yessound.png')!=-1) {
        ico.src  = 'images/nosound.png';
    }
     else {
       ico.src = 'images/yessound.png';
   }

}
ico.addEventListener("click", function(){
    //ico.classList.toggle("fa-volume-xmark");
    muteAudio();
    chngimg();
})
//////////////////////////////////////////////////////////////////////
var html5_audiotypes={ //define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
    "mp3": "audio/mpeg",
    "wav": "audio/wav"
}
function createsound(sound){
    var audioElement = new Audio(`audio/${sound}.mp3`);
    if (silence) audioElement.muted = true;
    else audioElement.muted = false;
            audioElement.play();
}
var x = document.getElementById("myAudio"); 
function playAudio() { 
    if (silence) x.muted = true;
    else x.muted = false;
    x.play(); 
} 
function pauseAudio() { 
  x.pause(); 
} 
