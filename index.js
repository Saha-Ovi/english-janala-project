const loadData=()=>
{
    const url="https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
    .then(response=>response.json())
    .then(data=>displayData(data.data))
}
loadData();

const displayData=(lessons)=>
{
    const levelContainer=document.getElementById("lesson-container");
   lessons.forEach(lesson=>
   {
        // console.log(lesson.level_no);
        const btnDiv=document.createElement("div");
        btnDiv.innerHTML=`
           <button class="btn btn-outline btn-primary">
           <i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}
           </button>
        
        `
        levelContainer.append(btnDiv);
   }
   )
}