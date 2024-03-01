
let selectgamemode = document.querySelector("#chose-your");
let cells = document.querySelectorAll(".cell");
let board = document.querySelector(".board");
let score1 = document.querySelector(".score-1");
let score2 = document.querySelector(".score-2");
let wincontent = document.querySelector(".win-text");
let xclass = "x";
let oclass = "circle";
start();
function gamemodfunct (gamemod) {
    let mod = gamemod.value;
    if(mod === "2player") {
        for(let i=0;i<cells.length;i++){
            cells[i].style.pointerEvents = "all";
        }
        resetfornextgamemod();
        start();
    } else {
        resetfornextgamemod();
        startGame();
    }
}
 function resetfornextgamemod () {
      for(let i=0;i<cells.length;i++){
          cells[i].classList.remove(xclass);
          cells[i].classList.remove(oclass);
      }
      board.classList.remove(xclass);
      board.classList.remove(oclass);
      board.style.pointerEvents = "all";
      score1.textContent = "0";
      score2.textContent = "0";
      wincontent.textContent = "Let's play ";
 }
function start () {
    let xand0tur = true;
    let reset = document.querySelector(".reset");
    let winncombination = [ [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
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

    
function startGame () {
    let reset = document.querySelector(".reset");
    let allpositions = [0,1,2,3,4,5,6,7,8];
    let winncombination = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
    let winobj = {
        "player1" : 0 ,
         "player2" : 0,
    }
    board.classList.add(xclass);
    for(let i=0;i<cells.length;i++){
        cells[i].addEventListener("click" , xsiofunction , {once: true}); 
    }
    
    reset.addEventListener("click" , resetfunction);
    
    function xsiofunction (e) {
       let cell = e.target;
       let index = allpositions.indexOf( parseInt(e.target.classList[1].slice(-1)));
       allpositions.splice(index,1);
       cell.classList.add(xclass);
      if(determinewinner(xclass)){
          wincontent.textContent = "x win ";
          for(let i=0;i<cells.length;i++){
              cells[i].style.pointerEvents = "none";
          }
          winobj["player1"]++;
          score1.textContent = winobj["player1"];
      } else{
       botturn();
       if(determinedraw()){
        wincontent.textContent = "draw";
        board.style.pointerEvents = "none";
    }
      }
    }
    
    function botturn () {
        if(allpositions.length > 1){
        let random = Math.floor(Math.random() * allpositions.length);
        console.log(random);
        cells[allpositions[random]].classList.add(oclass);
        cells[allpositions[random]].style.pointerEvents = "none";
        let index1 = allpositions.indexOf(allpositions[random]);
        allpositions.splice(index1,1);
        if(determinewinner(oclass)) {
            winobj["player2"]++;
            wincontent.textContent = "0 won ";
            score2.textContent = winobj["player2"];
            for(let i=0;i<cells.length;i++){
                cells[i].style.pointerEvents = "none";
            }
        } 
        console.log(allpositions);
    } 
    }
    
    function determinewinner (classlist) {
        return  winncombination.some( combination =>{
              return  combination.every(index => {
                  return cells[index].classList.contains(classlist);
              })
          })
      }
    
    function determinedraw () {
        return [...cells].every(cell =>{
            return cell.classList.contains(xclass) || cell.classList.contains(oclass);
        })
    }
    
    function resetfunction () {
        for(let i=0;i<cells.length;i++){
            cells[i].addEventListener("click" , xsiofunction , {once: true}); 
            cells[i].classList.remove(oclass);
            cells[i].classList.remove(xclass);
            cells[i].style.pointerEvents = "all";
        }
        allpositions = [0,1,2,3,4,5,6,7,8];
        board.style.pointerEvents = "all";
        wincontent.textContent = "lets play ";
    }
    }