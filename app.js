

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
function loosirattavaade() {
    loosiratas.classList.remove('hide');
}
function kysimus() {
    loosiratas.classList.add('hide')
    kysimuseleht.classList.remove('hide');
}
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