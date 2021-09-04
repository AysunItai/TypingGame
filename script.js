const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

  fetch(`https://random-word-api.herokuapp.com/all`)
  .then(res=>res.json())
  .then(data=>{
     randomWord=data[Math.floor(Math.random() * data.length)]
      word.innerHTML=randomWord;
      text.addEventListener('input', e => {
        const insertedText=e.target.value;
        if(insertedText===randomWord){
            randomWord=data[Math.floor(Math.random() * data.length)];
      word.innerHTML=randomWord;
            updateScore();
            e.target.value='';
           if(difficulty==='hard'){
               time += 2;
           }else if(difficulty==='medium'){
               time +=3;
           }else{
               time +=5;
           }
            updateTime();
    
        }
    
    })

})



//Init score
let score=0;

//Init time
let time=10;



//focus on text on start
text.focus();

//set diffuculty
let difficulty=localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty'):'medium';

//set difficulty select value
difficultySelect.value=localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty'):'medium';


// Start counting down
const timeInterval = setInterval(updateTime,1000);

//Update Score
function updateScore(){
    score++;
    scoreEl.innerHTML=score;
}
//Update Time
function updateTime(){
   if(word.innerHTML){
   time--;
   timeEl.innerHTML=time + 's';
   if(time === 0){
       clearInterval(timeInterval);
       //end game
       gameOver();
   }
   }
}
//Game over,show end screen;
function gameOver(){
    endgameEl.innerHTML=`
    <h1>Time ran out</h1>
    <p>Your Final Score is: ${score}</p>
    <button class="reload-btn" onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display="flex";
}



//Event Listeners
text.addEventListener('input', e => {
    const insertedText=e.target.value;
    if(insertedText===randomWord){
        addWordToDom();
        updateScore();
        e.target.value='';
       if(difficulty==='hard'){
           time += 2;
       }else if(difficulty==='medium'){
           time +=3;
       }else{
           time +=5;
       }
        updateTime();

    }
});
//settings button click

settingsBtn.addEventListener('click', ()=>{
    settings.classList.toggle('hide');
})

//settings select
settingsForm.addEventListener('change', e=>{
    difficulty=e.target.value;
    localStorage.setItem('difficulty',difficulty);

    
})
