console.log("script loaded!")

let game=document.querySelector(".game");
let currentscore=document.querySelector("#currentscore")
let highscore=document.querySelector("#highscore");
let controls=document.querySelectorAll(".controls i[data-key]")

let gameover=false;
let foodX,foodY;
let snakeX=5, snakeY=4;
let velocityX=0,velocityY=0;
let snakemain=[];
let setintervalid;
let score=0;
let highestscore=localStorage.getItem("highscore") || 0;

highscore.innerText = `High Score : ${highestscore}`;


const foodposition=()=>{
    foodX=Math.floor(Math.random()*30)+1;
    foodY=Math.floor(Math.random()*30)+1;
}

const handlegame=()=>{
    clearInterval(setintervalid)
    alert("Game over! Press Ok to replay!");
    location.reload();
    
}

const keyposition=(e)=>{
    console.log("key pressed",e.key)
    const pressedKey = e.key;
    if (pressedKey === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
      } else if (pressedKey === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
      } else if (pressedKey === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
      } else if (pressedKey === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
      }
}

controls.forEach(key => {
    key.addEventListener("click", () => keyposition({key: key.getAttribute('data-key')}));
});
  
const startgame=()=>{
    
    if (gameover) return handlegame();

    let htmlis=`<div class="snakefood" style="grid-area: ${foodY}/${foodX}"></div>`;

    for (let i = 1; i < snakemain.length; i++) {
        if (snakeX === snakemain[i][0] && snakeY === snakemain[i][1]) {
            gameover = true;
            break;
        }
    }


    if(snakeX===foodX && snakeY===foodY){
        foodposition();
        snakemain.push([foodX,foodY]);
        score++;
        highestscore = score >= highestscore ? score: highestscore;
        localStorage.setItem("highscore",highestscore)
        currentscore.innerText=`Score : ${score}`;
        highscore.innerText=`High Score : ${highestscore}`;

    }
    
    for(i=snakemain.length-1;i>0;i--){
        snakemain[i]=snakemain[i-1];
    }
    snakemain[0]=[snakeX,snakeY] //setting snakemain to current position
    
    snakeX+=velocityX;
    snakeY+=velocityY;

    if(snakeX<=0 || snakeX>30 || snakeY<=0 || snakeY>30){
         gameover=true;
    }

    for(i=0;i<snakemain.length;i++){
    htmlis+=`<div class="head" style="grid-area: ${snakemain[i][1]}/${snakemain[i][0]}"></div>`;
    }
    game.innerHTML=htmlis;
}

foodposition();
setintervalid=setInterval(startgame,125);
document.addEventListener("keydown", (e) => {
    console.log("Key pressed:", e.key);
    keyposition(e);
});
