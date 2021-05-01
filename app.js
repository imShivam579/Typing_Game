const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerELement = document.getElementById("timer");
//Adding EventListener
quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");
  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");
      correct = false;
    }
  });
  if (correct) getNextQuote();
});
function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((Response) => Response.json())
    .then((data) => data.content);
}
async function getNextQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerText = "";
  quote.split("").forEach((Element) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = Element;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}
let startTime;
function startTimer() {
  timerELement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timerELement.innerText = Math.floor(getTimerTime());
  }, 1000);
}
function getTimerTime() {
  return Math.floor(new Date() - startTime) / 1000;
}
getNextQuote();
