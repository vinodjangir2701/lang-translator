const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const lang = document.querySelector('#lang');

translateBtn.addEventListener("click", () => {
  translateText();
});

inputText.addEventListener("keydown", (e) => {
  if(e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    translateText();
  }
})

async function translateText() {
  const text = inputText.value.trim();

  if (!text) {
    outputText.textContent = "Please enter text";
    return;
  }

  try {
    // const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=hi&dt=t&q=${encodeURIComponent(text)}`;
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang.value}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    const translatedText = data[0].map(item => item[0]).join("");
    outputText.textContent = translatedText;

  } catch (error) {
    outputText.textContent = "Translation failed!";
    console.error(error);
  }
}
