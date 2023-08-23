const inputEl = document.getElementById('input');
const wordMeaningEl = document.getElementById('word-meaning');
const titleEL = document.getElementById('title');
const meaningEL = document.getElementById('meaning');
const audioEL = document.getElementById('audio');
const infoEL = document.getElementById('info');


const fetchAPI = async(word) => {
    try {
        infoEL.style.display = 'block';
        wordMeaningEl.style.display = 'none';
        infoEL.innerText = `Searching for the meaning of "${word}"...`
        const url =`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await fetch(url);
        const data = await response.json();
        if (data.title) {
            infoEL.style.display = 'none';
            wordMeaningEl.style.display = 'flex';
            titleEL.innerText = word;
            meaningEL.innerText = "N/A";
            audioEL.style.display = 'none';
        } else {
            infoEL.style.display = 'none';
            wordMeaningEl.style.display = 'flex';
            audioEL.style.display = 'inline-flex';
            titleEL.innerText = data[0].word;
            meaningEL.innerText = data[0].meanings[0].definitions[0].definition;
            audioEL.src = data[0].phonetics[0].audio;
        }
    } catch (error) {
        console.log(error);
        infoEL.innerText = `An error occured, try again later.`;
    }
}

inputEl.addEventListener('keyup', (e) => {
    if (e.target.value && e.key === 'Enter') {
        fetchAPI(e.target.value);
    }
})