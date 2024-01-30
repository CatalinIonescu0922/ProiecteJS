 let raspunsuri = document.querySelector(".respunsuri");
let raspunsurih2 = document.querySelectorAll(".ras-1");
let startbtn = document.querySelector(".start-btn");
let starttime;
let endtime;
let duration;
let detali = document.querySelector(".detail");
console.log(raspunsurih2);
let intrebari = [
    "Cate strofe are Luceafrul? ",
    "Care este cel mai mare munte din lume? ",
    "Cine a condus rusia in cel de al doilea razboi mondial?  ",
    "Ce tara a condus gengis han?",
    "Cati km de autostrada are romania? ",
    "Cati presedinti a avut USA?",
]
let corectgresit = document.querySelector(".corect-h1");
let raspunsuriarray = [
    "Eminescu",
    "98",
    "Himalaya",
    "Stalin",
    "Mongolia",
    "850km",
    "49",
]
let corect = document.querySelector(".corect");
let socr = document.querySelector(".scor");
let scorindex = {
    "scor" : 1,
    "airaspuns" : false, 
    "verificare" : 0,
    "raspusurivar" : 0,
}
let corectgresitarray = [

]

let allraspunsuri = [
    ["97" , "99" ,"98" ,"100"],
    ["Bucegi" , "Pirinei" ,"Urali" , "Himalaya"],
    ["Hitller" , "Stalin" , "Musolini" , "Churchill"],
    ["China" , "Rusia" , "Mongolia" , "Japonia"],
    ["915km" , "875km" , "825km" , "850km"],
    ["47" , "45" , "49" , "50"],
]
let intrebaremain = document.querySelector(".main-intrebare");
 let nextIntrebare = document.querySelector(".next");
raspunsuri.addEventListener("click" , isCorect);
startbtn.addEventListener("click" , startTimer);
detali.addEventListener("click" , afisareDetali);
// for(let i=0;i<=raspunsurih2.length;i++){
//     raspunsurih2[i].addEventListener("click" , isCorect)
// }

function isCorect (e) {
    let click = e.target;
      let raspuns = click.textContent;
      if(raspuns === raspunsuriarray[scorindex.verificare]){
          corect.classList.add("add");
          socr.textContent = scorindex.scor++;
          corectgresit.textContent = "Corect";
          corectgresit.style.color = "green";
          corectgresitarray.push(`Intrebarea ${scorindex.verificare +1} : Correct`);
      } else{
         corect.classList.add("add");
         corectgresit.textContent  = "Gresit";
         corectgresit.style.color = "red";
         corectgresitarray.push(`Intrebarea ${scorindex.verificare +1} : Gresit `);
      }
      if(scorindex.verificare === (raspunsuriarray.length -1)) {
           endtime = new Date();
           duration = (endtime.getTime() - starttime.getTime())/1000;
           console.log(duration);
           let felicitarih2 = document.querySelector(".duration");
           felicitarih2.textContent = `Ai terminat intrebarile in  ${duration} secunde si ai obtinut ${scorindex.scor -1} puncte din ${raspunsuriarray.length} `;
           let felicitarimain = document.querySelector(".felicitari");
           felicitarimain.style.transform = "scale(1)";
      }
    //   raspunsuri.style.pointerEvents = "none";
    scorindex.airaspuns = true;
    raspunsuri.style.pointerEvents = "none";
    console.log(corectgresitarray);
}

nextIntrebare.addEventListener("click" , urmatoareaIntrebare );

function urmatoareaIntrebare () {
     if(scorindex.airaspuns === true) {
        // raspunsuri.style.pointerEvents = "all";
          scorindex.airaspuns = false;
          scorindex.verificare++;
        //   scorindex.scor = scorindex.verificare + 1;
          populateraspunsuri();
          intrebaremain.textContent = intrebari[scorindex.raspusurivar];
          scorindex.raspusurivar++;
          corect.classList.remove("add");
          raspunsuri.style.pointerEvents = "all";
     } else {
         console.log("nu treci mai departe ");
     }
}

function populateraspunsuri () {
   raspunsurih2[0].textContent = allraspunsuri[scorindex.raspusurivar][1];
   raspunsurih2[1].textContent = allraspunsuri[scorindex.raspusurivar][3];
   raspunsurih2[2].textContent = allraspunsuri[scorindex.raspusurivar][2];
   raspunsurih2[3].textContent = allraspunsuri[scorindex.raspusurivar][0];
// console.log(allraspunsuri[scorindex.raspusurivar++][0])
}
function startTimer () {
    let startContainer = document.querySelector(".start");
    startContainer.style.transform = "scale(0)"; 
    starttime = new Date();
}
function afisareDetali (){
    let all = `<h1 class = "x"> x </h1>`;
    let detaliMain = document.querySelector(".detali-main");
    detaliMain.style.transform = " translate(-50%,-50%) scale(1)";
    for(let i=0;i<corectgresitarray.length;i++){
       all += ` <h1> ${ corectgresitarray[i]} , raspunsul corect ${raspunsuriarray[i]} </h1>`; 
    }
    console.log(all);
    detaliMain.innerHTML = all;
    let close = document.querySelector(".x");
    close.addEventListener("click" , ()=>{
        detaliMain.style.transform = " translate(-50%,-50%) scale(0)";
    })
}