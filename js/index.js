const myCanvas = document.querySelector("canvas");
const ctx = myCanvas.getContext("2d")
document.querySelector("#game-board").style.display = "none";

myCanvas.style.border = "2px solid black"

let gameOver = false
let animateId;


const bgImg = new Image();
bgImg.src = "https://i.pinimg.com/originals/f0/09/bc/f009bc4398d345fd1a46504d69ddc07a.png"
const bgImg2 = new Image();
bgImg2.src = "https://i.pinimg.com/originals/f0/09/bc/f009bc4398d345fd1a46504d69ddc07a.png"
const car = new Image();
car.src = "https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/ba727526b3c3125.png"
const fireBall = new Image();
fireBall.src = "https://media.tenor.com/_dUxi3qy-KIAAAAj/fire-fireball.gif"
const fireBall2 = new Image();
fireBall2.src = "https://media.tenor.com/_dUxi3qy-KIAAAAj/fire-fireball.gif"
const fireBall3 = new Image();
fireBall3.src = "https://media.tenor.com/_dUxi3qy-KIAAAAj/fire-fireball.gif"

let bgSpeed = 0;
let bg2Speed = -myCanvas.height;

let fireSpd = -400;
let fireSpd2 = -80;
let fireSpd3 = -800;

let plyDirX = 2
let plyDirY = 2
const plySpeed = 5
let isMovingLeft = false
let isMovingRight = false

let isMovingStart = true 



let score = 0
let highestScore = 0;
let overScr = document.querySelector(".score");
overScr.innerText = `Your Highest Score: ${highestScore}`

window.onload = () => {
  
  document.getElementById('start-button').onclick = () => {
    startGame();    
    document.querySelector(".game-intro").style.display = "none";
    document.querySelector("#game-board").style.display = 'block'; 
           
  };

  function animate () {
    const intro = document.querySelector(".game-intro")
    
    if (intro.style.display === "block") {
      gameOver = false
      
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (isMovingLeft && plyDirX > 40) {
      plyDirX -= plySpeed
    }
    else if (isMovingRight && plyDirX < 311) {
      plyDirX += plySpeed
    } else if (isMovingStart){
      plyDirX = (myCanvas.width/2)-25
    }
    
    
    ctx.drawImage(bgImg, -myCanvas.width/2-250, bgSpeed, 1300, 1900)
    ctx.drawImage(bgImg2, -myCanvas.width/2-250, bg2Speed, 1300, 1900)

    ctx.drawImage(car, plyDirX, 400, 60, 80)

    ctx.drawImage(fireBall, 280, fireSpd, 50, 70)   
    if (fireSpd > 600) {
      fireSpd = -400
    }   
    ctx.drawImage(fireBall2, 70, fireSpd2, 50, 70)
    if (fireSpd2 > 700) {
      fireSpd2 = -400
    }   
    ctx.drawImage(fireBall3, (myCanvas.width/2)-25, fireSpd3, 50, 70)
    if (fireSpd3 > 800) {
      fireSpd3 = -200
    }   

    fireSpd += 4
    fireSpd2 += 6
    fireSpd3 += 3
    
    bgSpeed += 2;
    bg2Speed += 2;
    
    if (bgSpeed > myCanvas.height) {
      bgSpeed = -myCanvas.height-1250
    }
    if (bg2Speed > myCanvas.height) {
      bg2Speed = -myCanvas.height-1250
    }
    

    if (fireSpd2 > 400 && fireSpd2 < 450 && plyDirX < 110 && plyDirX > 30 ) {
      gameOver = true;
    }
    if (fireSpd > 400 && fireSpd < 450 && plyDirX < 300 && plyDirX > 230 ) {
      gameOver = true;
    }
    if (fireSpd3 > 400 && fireSpd3 < 450 && plyDirX < 230 && plyDirX > 110 ) {
      gameOver = true;
    }

    ctx.font = 'bold 48px verdana'
    
    ctx.fillText(score, 20, 48,)
    ctx.fillStyle = "white"
    score += 1;
    if (highestScore < score) {
      highestScore = score;
    }
    console.log(highestScore)

    if(!gameOver){
      animateId = requestAnimationFrame(animate)
    } else {
      fireSpd = -400;
    fireSpd2 = -80;
    fireSpd3 = -800;    
    
    isMovingLeft = false
    isMovingRight = false
    isMovingStart = true     

    highestScore = score
    score = 0;
    overScr.innerText = `Your Highest Score: ${highestScore}`
       
      cancelAnimationFrame(animateId)
      document.querySelector(".game-intro").style.display = "block";
      document.querySelector("#game-board").style.display = 'none';      
    }
      
    document.addEventListener('keypress', event => {
      if (event.key === 'a') {       
        isMovingLeft = true
        isMovingStart = false 
      }
      if (event.key === 'd') {       
        isMovingRight = true
        isMovingStart = false
      }
    })
    document.addEventListener('keyup', () => {     
      isMovingLeft = false
      isMovingRight = false
    })
    
    
  }

  function startGame() {
    animate()         
  }
};







