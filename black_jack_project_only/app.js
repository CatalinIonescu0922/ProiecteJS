 // variabel zone 
let hit =document.querySelector(".hit-btn");
let stand = document.querySelector(".stand-btn");
let deal = document.querySelector(".deal-btn");
let yourcontainer = document.querySelector(".your-container"); 
let yourcontainer2 = document.querySelector(".your2-container");
let hit2 = document.querySelector(".hit2-btn");
let stand2 = document.querySelector(".stand2-btn");
let yourscore = document.querySelector(".score");
let yourscore2 = document.querySelector(".your2-score");
let resetblj = document.querySelector(".reset-blj");
let general = document.querySelector(".settings");
let generalcontainer = document.querySelector(".bj-owerall-score");
let resetlocalStorage = document.querySelector(".reset-localstorage");
let winlosedraws = {
    "win1" : 0,
    "win2" : 0,
    "draws" : 0,
}
let scoreobject = {
    "cards" : {"2.png" : 2,"3.png" : 3,"4.png" : 4,"5.png" : 5,"6.png" : 6,"7.png" : 7,"8.png" : 8,"9.png" : 9,"10.png" : 10,"J.png"  : 10,"Q.png" : 10,"K.png" : 10,"11.png" : [1,11] },
    score1 : 0,
    score2 : 0
}
let imagearray = [ "2.png","3.png","4.png","5.png","6.png","7.png","8.png","9.png","10.png","11.png","J.png","Q.png","K.png"];
let audio = new Audio("swish.m4a");
let resetaudio = new Audio("cash.mp3");
let dealarray = [0,0];
let hitarray1 = [0];
let hitarray2 = [0];


// function zone
function hitfunction () {
   let imageblj =  document.createElement("img");
    let randomnumber = Math.floor( Math.random() * 13);
    let randomcard = imagearray[randomnumber];
    imageblj.src = randomcard;
    if(randomcard == "11.png" && scoreobject["score1"]+11 <= 21){  
        scoreobject["score1"]+=scoreobject["cards"][randomcard][1];
       yourscore.textContent =  scoreobject["score1"];
    } else  if(randomcard == "11.png" && scoreobject["score1"]+11 >21){
        scoreobject["score1"]+=scoreobject["cards"][randomcard][0];
        yourscore.textContent =  scoreobject["score1"];
    } else{
        scoreobject["score1"]+= scoreobject["cards"][randomcard];
        if(scoreobject["score1"] > 21) {
            yourscore.textContent = "bust !";
        } else {
           yourscore.textContent =  scoreobject["score1"];
        }
    }
   yourcontainer.appendChild(imageblj);
   audio.play();
   hitarray1[0] = 1;
}
function hitfunction2 () {
   let imageblj =  document.createElement("img");
   let randomnumber = Math.floor( Math.random() * 13);
   let randomcard = imagearray[randomnumber];
   imageblj.src = randomcard;
   if(randomcard == "11.png" && scoreobject["score2"]+11 <= 21){ 
    scoreobject["score2"]+=scoreobject["cards"][randomcard][1];
   yourscore2.textContent =  scoreobject["score2"];
} else  if(randomcard == "11.png" && scoreobject["score2"]+11 > 21){
    scoreobject["score2"]+=scoreobject["cards"][randomcard][0];
    yourscore2.textContent =  scoreobject["score2"];
} else{
    scoreobject["score2"]+= scoreobject["cards"][randomcard];
    if(scoreobject["score2"] > 21) {
        yourscore2.textContent = "bust !";
    } else {
       yourscore2.textContent =  scoreobject["score2"];
    }
}
  yourcontainer2.appendChild(imageblj);
  audio.play();
  hitarray2[0]= 1;
}
function standfunction () {
  if(hitarray1[0] === 1) {
       hit.style.pointerEvents = "none";
       stand.style.pointerEvents = "none";
       dealarray[0] =1;} 
       else {
           alert("inca nu ai dat hit la nici o carte nu poti da stand");
       }
}
function standfunction2 () {
    if(hitarray2[0] === 1) {
       hit2.style.pointerEvents = "none";
       stand2.style.pointerEvents = "none";
       dealarray[1]=1;} 
       else{
           alert("inca nu ai dat hit la nici o carte nu poti da stand");
       }
}
function resetBLJ () {  
   
   if(dealarray[0] === 1 && dealarray[1] === 1){
       let win1 = document.querySelector(".win1-span");
       let win2 = document.querySelector(".win2-span");
       let draws = document.querySelector(".draws-span");
       let wincontent = document.querySelector(".bj-win-lose");
       wincontent.style.color = "green";
       yourscore.textContent = "0";
       yourscore2.textContent = "0";
       let player1img = yourcontainer.querySelectorAll("img");
       let player2img = yourcontainer2.querySelectorAll("img");
       for(let i=0;i<player1img.length;i++){
           player1img[i].remove();
       }
       for(let i=0;i<player2img.length;i++){
           player2img[i].remove();
       }
       hit.style.pointerEvents = "all";
       hit2.style.pointerEvents = "all";
       stand.style.pointerEvents = "all";
       stand2.style.pointerEvents = "all";
       if( scoreobject["score1"] <=21 && scoreobject["score2"] <= 21 &&  scoreobject["score1"] > scoreobject["score2"]){
            winlosedraws["win1"]++;
            win1.textContent = winlosedraws["win1"];
           wincontent.textContent = "player 1 won!  ";
           winlosedrawslocalstorage("win1");
       } else if(scoreobject["score1"] <=21 && scoreobject["score2"] <= 21 &&  scoreobject["score1"] < scoreobject["score2"]){
        winlosedraws["win2"]++;
        win2.textContent = winlosedraws["win2"];
        wincontent.textContent = "player 2 won!";
        winlosedrawslocalstorage("win2");
       } else if(scoreobject["score1"] > 21 && scoreobject["score2"] <= 21){
        winlosedraws["win2"]++;
        win2.textContent = winlosedraws["win2"];
        wincontent.textContent = "player 2 won!";
        winlosedrawslocalstorage("win2");
       } else if(scoreobject["score1"] <= 21 && scoreobject["score2"] > 21){
        winlosedraws["win1"]++;
        win1.textContent = winlosedraws["win1"];
        wincontent.textContent = "player 1 won!  ";
        winlosedrawslocalstorage("win1");
       } else if(scoreobject["score1"] === scoreobject["score2"]){
        winlosedraws["draws"]++;
        draws.textContent = winlosedraws["draws"];
        wincontent.textContent = "  both player draw  ";
        winlosedrawslocalstorage("draws");
       } else if(scoreobject["score1"] > 21 && scoreobject["score2"] > 21){
        winlosedraws["draws"]++;
        draws.textContent = winlosedraws["draws"];
        wincontent.textContent = "  both player draw  ";
        winlosedrawslocalstorage("draws");
       } 
       scoreobject["score1"] = 0;
       scoreobject["score2"] = 0;
       resetaudio.play();
       dealarray = [0,0];
       hitarray1 = [0];
       hitarray2 = [0];
       }  else {
           alert("un player(sau amandoi) nu a dat inca stand asa ca nu poti acsesa inca functia deal");
       }
   }
   function winlosedrawslocalstorage (winlosedra) {
    if(localStorage[winlosedra] === undefined) {
        localStorage.setItem(winlosedra , 1);
    } else {
        localStorage[winlosedra]++;
    }
}
function popfunct () {
    let player1score = document.querySelector(".player-1-win");
    let player2score = document.querySelector(".player-2-win");
    let drawsscore = document.querySelector(".player-draws");
    player1score.textContent = `Player ul 1 a castigat in total ${localStorage["win1"] || 0} meciuri`;
    player2score.textContent = `Player ul 2 a castigat in total ${localStorage["win2"] || 0} meciuri `; 
    drawsscore.textContent = `Cei doi playeri au remizat de   ${localStorage["draws"] || 0} ori`; 

    generalcontainer.classList.add("pop");
}
function removefunct (e) {
  if(e.target.classList.contains("bj-owerall-score")) {
      generalcontainer.classList.remove("pop");
  } 
}
function resetlocalstorage () {
    localStorage.clear();
    generalcontainer.classList.remove("pop");
}
// event listener zone 
hit.addEventListener("click" , hitfunction);
stand.addEventListener("click" , standfunction);
hit2.addEventListener("click", hitfunction2);
stand2.addEventListener("click" , standfunction2);
resetblj.addEventListener("click" , resetBLJ);
general.addEventListener("click" , popfunct);
generalcontainer.addEventListener("click" , removefunct);
resetlocalStorage.addEventListener("click" , resetlocalstorage);

