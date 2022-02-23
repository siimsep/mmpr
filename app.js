const yksikNupp = document.getElementById('yksikM2ng');
const juhistenupp = document.getElementById('juhistenupp');
const juhised = document.getElementById('juhised');
const avaleht = document.getElementById('avaleht');
const loosiratas = document.getElementById('loosiratas');
const loosirattaNupp = document.getElementById('loosirattanupp');
const kysimuseleht = document.getElementById('kysimuseleht');
yksikNupp.addEventListener('click', yksikM2ng);
juhistenupp.addEventListener('click', n2itaJuhiseid)
loosirattaNupp.addEventListener('click', kysimus); // l6plikult peaks keerutuse v2ljakutsumine tulema siia hoopis


function yksikM2ng() {
    avaleht.classList.add('hide');
    loosiratas.classList.remove('hide')
}
function kysimus() {
    loosiratas.classList.add('hide')
    kysimuseleht.classList.remove('hide');
}
function n2itaJuhiseid() {
    if(juhised.classList.value === 'hide') {
        juhised.classList.remove('hide');
    } else {
        juhised.classList.add('hide')
    }
}