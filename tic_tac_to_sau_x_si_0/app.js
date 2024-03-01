
 function start () {
let cells = document.querySelectorAll(".cell");
let xclass = "x";
let oclass = "circle";
let xand0tur = true;
let reset = document.querySelector(".reset");
let wincontent = document.querySelector(".win-text");
let winncombination = [ [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]]
let board = document.querySelector(".board");
let player1 = document.querySelector(".player-1");
let player2 = document.querySelector(".player-2");
let score1 = document.querySelector(".score-1");
let score2 = document.querySelector(".score-2");
let winobj = {
    "player1" : 0 ,
     "player2" : 0,
}
board.classList.add(xclass);
cells.forEach(cell =>{
    cell.addEventListener("click", xandofunct , {once : true});
});
reset.addEventListener("click" , resetfunct);

function xandofunct (e) {
    let cell = e.target;
   if(xand0tur) {
      cell.classList.add(xclass);
      xand0tur = false;
      player1.style.color = "rgba(128, 128, 128,.2)";
      player2.style.color = "red";
      if(isdraw()) {
        wincontent.textContent = "draw";
    } 
      if(determinewinner(xclass)){
          winobj["player1"]++;
          wincontent.textContent = "X has won";
          board.style.pointerEvents = "none";
          score1.textContent = winobj["player1"];
          wincontent.style.color = "blue";
      }
   } else {
        cell.classList.add(oclass);
        xand0tur = true;
        player2.style.color = "rgba(128, 128, 128,.2)";
        player1.style.color = "blue";
       if(determinewinner(oclass)){
           winobj["player2"]++;
          wincontent.textContent =  "O has won!";
          board.style.pointerEvents = "none";
          score2.textContent = winobj["player2"];
          wincontent.style.color = "red";
    }
   }
   sethover();
}
 
function determinewinner (classlist) {
  return  winncombination.some( combination =>{
        return  combination.every(index => {
            return cells[index].classList.contains(classlist);
        })
    })
}
function resetfunct () {
    for(let i=0;i<cells.length;i++){
        cells[i].classList.remove("x");
        cells[i].classList.remove("circle");
        cells[i].addEventListener("click", xandofunct , {once : true});
    }
    xand0tur = true;
    board.style.pointerEvents = "all";
    player1.style.color = "blue";
    player2.style.color = "rgba(128, 128, 128,.2)";
    board.classList.add(xclass);
    board.classList.remove(oclass);
    wincontent.textContent = "Let's play ";
    wincontent.style.color = "black";
} 
function isdraw () {
    return [...cells].every(cell =>{
        return cell.classList.contains(xclass) || cell.classList.contains(oclass);
 })} 

 function sethover () {
     board.classList.remove(xclass);
     board.classList.remove(oclass);
     if(xand0tur) {
         board.classList.add(xclass);
     } else {
         board.classList.add(oclass);
     }
 }
}
start();