
let board = document.querySelector(".board");
let cells = document.querySelectorAll(".cell");
let wintext = document.querySelector(".win-text");
let reset = document.querySelector(".reset");
let xclass = "x";
let oclass = "circle";
let allpositions = [0,1,2,3,4,5,6,7,8];
let winncombination = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];

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
      wintext.textContent = "x win ";
      for(let i=0;i<cells.length;i++){
          cells[i].style.pointerEvents = "none";
      }
  } else{
   botturn();
   if(determinedraw()){
    wintext.textContent = "draw";
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
        wintext.textContent = "0 won ";
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
    wintext.textContent = "lets play ";
}