let audioURL = "";

function searchWord() {
  const word = document.getElementById("searchInput").value.trim();
  if (!word) return alert("Type a word");

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => {
      if (!res.ok) throw new Error("Word not found");
      return res.json();
    })
    .then(data => displayResult(data[0]))
    .catch(() => alert("❌ Word not found"));
}

function displayResult(data) {
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("word").textContent = data.word;
  document.getElementById("phonetic").textContent =
    data.phonetic || "";

    
  audioURL = "";
  document.getElementById("meanings").innerHTML = "";

  if (data.phonetics) {
    const audioObj = data.phonetics.find(p => p.audio);
    if (audioObj) audioURL = audioObj.audio;
  }

  data.meanings.forEach(meaning => {
    const div = document.createElement("div");
    div.className = "meaning";

    div.innerHTML = `
      <h4>${meaning.partOfSpeech}</h4>
      <p><strong>Definition:</strong> ${meaning.definitions[0].definition}</p>
      ${
        meaning.definitions[0].example
          ? `<p><strong>Example:</strong> ${meaning.definitions[0].example}</p>`
          : ""
      }
    `;

    document.getElementById("meanings").appendChild(div);
  });
}

function playAudio() {
  if (!audioURL) {
    alert("No pronunciation available");
    return;
  }
  new Audio(audioURL).play();
}
// Trigger search when Enter is pressed in the input
const searchInputField = document.getElementById("searchInput");
searchInputField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchWord();
  }
});
