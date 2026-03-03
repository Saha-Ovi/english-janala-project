const loadData=()=>
{
    const url="https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then(response=>response.json())
    .then(data=>displayData(data.data))
}

const loadLevelWord=(id)=>
{
    const url=`https://openapi.programming-hero.com/api/level/${id}`;
    
    fetch(url)
    .then(response=>response.json())
    .then(data=>displayLevelWord(data.data))



}



const displayData=(lessons)=>
{
    const levelContainer=document.getElementById("lesson-container");
    levelContainer.innerHTML="";
   lessons.forEach(lesson=>
   {
        // console.log(lesson.level_no);
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`
           <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
           <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
           </button>
        
        `
        levelContainer.append(btnDiv);
   }
   )
}
const displayLevelWord=(words)=>
{
    const wordContainer=document.getElementById("word-container");
    wordContainer.innerHTML="";
    words.forEach(word=>{
        const card=document.createElement("div");
        card.innerHTML=`
           <div  class="bg-white p-5 rounded-xl text-center">
                <h2 class="font-bold text-2xl">${word.word}</h2>
                <p class="text-[20px] text-black">Meaning /Pronounciation</p>
                <div class="text-2xl text-[#18181B]">${word.meaning}/${word.pronunciation}</div>
                <div class="flex justify-between items-center">
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        
        `
        wordContainer.append(card);
    })
}

loadData();