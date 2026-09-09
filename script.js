const screens = [...document.querySelectorAll(".screen")];
const progress = document.getElementById("progressBar");

const els = {
  dob: document.getElementById("dob"),
  dobError: document.getElementById("dobError"),
  unlock: document.getElementById("unlockBtn"),
  answer: document.getElementById("answer"),
  answerError: document.getElementById("answerError"),
  answerStatus: document.getElementById("answerStatus"),
  answerBtn: document.getElementById("answerBtn"),
  count: document.getElementById("count"),
  wish: document.getElementById("wishText"),
  question: document.getElementById("questionText"),
  photoCaption: document.getElementById("photoCaption"),
  videoIntro: document.getElementById("videoIntro"),
  finalTitle: document.getElementById("finalTitle"),
  finalMessage: document.getElementById("finalMessage"),
  signature: document.getElementById("signature"),
  replay: document.getElementById("replay")
};

document.querySelectorAll("[data-name]").forEach(e => e.textContent = CONFIG.name);
els.wish.textContent = CONFIG.wish;
els.question.textContent = CONFIG.question;
els.photoCaption.textContent = CONFIG.photoCaption;
els.videoIntro.textContent = CONFIG.videoIntro;
els.finalTitle.textContent = CONFIG.finalTitle;
els.finalMessage.textContent = CONFIG.finalMessage;
els.signature.textContent = CONFIG.signature;

function goTo(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  const index = screens.findIndex(s => s.id === id);
  progress.style.width = `${((index) / (screens.length - 1)) * 100}%`;
  if(id === "letter") typeWish();
  window.scrollTo(0,0);
}

function typeWish(){
  if(els.wish.dataset.typed) return;
  const text = CONFIG.wish;
  els.wish.textContent = "";
  let i = 0;
  const timer = setInterval(() => {
    els.wish.textContent += text[i++];
    if(i >= text.length){
      clearInterval(timer);
      els.wish.dataset.typed = "1";
    }
  }, 16);
}

els.unlock.addEventListener("click", () => {
  if(!els.dob.value){
    els.dobError.textContent = "Please enter the date first ✦";
    return;
  }
  if(els.dob.value !== CONFIG.birthday){
    els.dobError.textContent = "Hmm… that's not the secret date. Try again ♡";
    return;
  }
  els.dobError.textContent = "";
  goTo("letter");
});

document.querySelectorAll("[data-next]").forEach(btn => {
  btn.addEventListener("click", () => goTo(btn.dataset.next));
});

els.answer.addEventListener("input", () => {
  els.count.textContent = `${els.answer.value.length} / 220`;
  els.answerError.textContent = "";
});

els.answerBtn.addEventListener("click", () => {
  const answer = els.answer.value.trim();
  if(answer.length < 2){
    els.answerError.textContent = "Give me at least a tiny answer ✦";
    return;
  }

  els.answerError.textContent = "";
  els.answerStatus.textContent = "";

  // If a Google Apps Script Web App URL is configured, save the answer
  // to your Google Sheet without leaving this page.
  if (CONFIG.answerWebhook && CONFIG.answerWebhook.trim()) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = CONFIG.answerWebhook;
    form.target = "answerSubmitFrame";
    form.style.display = "none";

    const answerField = document.createElement("input");
    answerField.name = "answer";
    answerField.value = answer;

    const nameField = document.createElement("input");
    nameField.name = "name";
    nameField.value = CONFIG.name;

    form.appendChild(answerField);
    form.appendChild(nameField);
    document.body.appendChild(form);
    form.submit();
    form.remove();

    els.answerStatus.textContent = "Answer saved ✨";
  } else {
    // The site still works if you haven't connected the answer form yet.
    els.answerStatus.textContent = "Answer received here ✨";
  }

  goTo("photo");
});

els.replay.addEventListener("click", () => {
  els.dob.value = "";
  els.answer.value = "";
  els.count.textContent = "0 / 220";
  els.answerError.textContent = "";
  els.answerStatus.textContent = "";
  progress.style.width = "0%";
  goTo("lock");
});

const starLayer = document.getElementById("stars");
for(let i=0;i<55;i++){
  const s=document.createElement("i");
  s.className="star";
  s.style.left=Math.random()*100+"%";
  s.style.top=Math.random()*100+"%";
  s.style.animationDelay=(Math.random()*3)+"s";
  s.style.animationDuration=(2+Math.random()*4)+"s";
  starLayer.appendChild(s);
}

document.getElementById("birthdayPhoto").addEventListener("error", e => {
  e.target.alt = "Add your photo as assets/birthday-photo.jpg";
});
