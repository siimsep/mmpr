/////////////////////////////////////////////////////////////////////////
// Kasutaja Kysimus Firebase andmebaasi
window.kysimusKasutajalt = function() {
  const submitCategory = document.getElementById('submitCat').value;
  const submitQuestion = document.getElementById("submittedQuestion");
  const submitV1 = document.getElementById("v1");
  const submitV2 = document.getElementById("v2");
  const submitV3 = document.getElementById("v3");
  const submitV4 = document.getElementById("v4");
  const submitMemo = document.getElementById('memo');
  const submitNf = document.getElementById("nfact");
  const submitJuser = document.getElementById("juser");
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
  alert('meie t2name')
}
