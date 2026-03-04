// synonym
const createElement=(arr)=>
    {
        const htmlElement=arr.map(el=>`<span class=btn>${el}</span>`)
        // console.log(htmlElement);
        console.log(htmlElement.join(" "));
        return htmlElement.join(" ");
    } 

    // pronunciation
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner=(status)=>
{
    if(status==true)
    {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }

    else
    {
         document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadLesson = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayLesson(data.data));
};

const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};

const loadLevelWord = (id) => {
    manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // remove active from all lesson button
      removeActive();
      // active class added
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      displayLevelWord(data.data);
    });
};

const loadWordDetails = async (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const response = await fetch(url);
  const details = await response.json();
  // console.log(details.data);
  displayWordDetails(details.data);
};

const displayWordDetails = (words) => {
//   console.log(words);
  const wordDetails = document.getElementById("details-container");
  wordDetails.innerHTML = `
          <div class="space-y-5">
              <div>
                <h2 class="font-bold-bold text-3xl">
                  ${words.word} (<i class="fa-solid fa-microphone-lines"></i> : ${words.pronunciation})
                </h2>
              </div>
              <div>
                <h2 class="font-semibold-semibold text-xl">Meaning</h2>
                <p class="font-bangla font-medium">${words.meaning}</p>
              </div>
              <div>
                <h2 class="font-semibold-semibold text-xl">Example</h2>
                <p class="font-medium">
                  ${words.sentence}
                </p>
              </div>
              <div>
                <h2 class="font-bangla font-bold">সমার্থক শব্দ গুলো</h2>
                <div>${createElement(words.synonyms)}</div>
              </div>
            </div>
    `;

  document.getElementById("word_modal").showModal();
};

const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("lesson-container");
  levelContainer.innerHTML = "";
  lessons.forEach((lesson) => {
    // console.log(lesson.level_no);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
           <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
           <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
           </button>
        
        `;
    levelContainer.append(btnDiv);
  });
};
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  //  if words have no array
  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div class=" py-6 px-3 text-center col-span-full font-bangla space-y-5 ">
            <img class="mx-auto" src="./assets/alert-error.png" alt="">
            <p class="text-2xl text-medium text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p class="text-4xl text-bold">নেক্সট Lesson এ যান</p>
          </div>
    
    `;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
           <div  class="bg-white p-5 rounded-xl text-center">
                <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
                <p class="text-[20px] text-black">Meaning /Pronunciation</p>
                <div class="text-2xl text-[#18181B]">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}</div>
                <div class="flex justify-between items-center">
                    <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        
        `;
    wordContainer.append(card);
    manageSpinner(false);
  });
};

loadLesson();

// search value function
document.getElementById("search-btn").addEventListener("click",()=>
{
    removeActive();
    const input=document.getElementById("search-input");
    const searchValue=input.value.trim().toLowerCase();
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(response=>response.json())
    .then(data=>
    {
        const allWords=data.data;
        const filterWords=allWords.filter(words=>words.word.toLowerCase().includes(searchValue));
        displayLevelWord(filterWords);
    }
    )
})
