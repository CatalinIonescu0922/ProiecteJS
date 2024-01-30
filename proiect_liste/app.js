
window.addEventListener("scroll" , ()=>{
    let nav = document.querySelector(".nav");
    let container = document.querySelector(".container1");
    let height = window.pageYOffset;
    console.log(height)
    let titlu = document.querySelector(".titlu");
    let para1 = document.querySelector(".para-1");
    let img1 = document.querySelector(".poza1");
    let para2 = document.querySelector(".para-2");
    let para3 = document.querySelector(".para-3");
    let titlu2 = document.querySelector(".titlu-2");
    let para4 = document.querySelector(".para-4");
    let poza2 = document.querySelector(".poza2");
    let titlu3 = document.querySelector(".titlu-3");
    let para5 = document.querySelector(".para-5");
    let cevafun = document.querySelector(".ceva-fun");
    nav.style.transform = `translateY(${height*.8}px)`;
    container.style.transform = `translateY(${height*-.5}px)`;
    if(height>270){
        titlu.classList.add("active");
        para1.classList.add("active");
    }
    if(height<245) {
        titlu.classList.remove("active");
        para1.classList.remove("active");
    }
    if(height>420) {
        img1.classList.add("active");
        para2.classList.add("active");
        para3.classList.add("active");
    }
    if(height<360){
        img1.classList.remove("active");
        para2.classList.remove("active");
        para3.classList.remove("active");
    }
    if(height>1100){
        titlu2.classList.add("active");
        para4.classList.add("active");
        poza2.classList.add("active");
    }
    if(height<1080){
        titlu2.classList.remove("active");
        para4.classList.remove("active");
        poza2.classList.remove("active");
    }
    if(height>1800){
        titlu3.classList.add("active");
        para5.classList.add("active");
        cevafun.classList.add("active");
    }
    if(height<1760){
        titlu3.classList.remove("active");
        para5.classList.remove("active");
        cevafun.classList.remove("active");
    }
    if(height>1650){
        backtop.classList.add("active");
    }
    if(height<1300){
        backtop.classList.remove("active");
    }

})
let backtop = document.querySelector(".back-to-top");
backtop.addEventListener("click" , () =>{
    window.scrollTo({
        top : 0,
        left: 0,
        behavior : "smooth"
    });
})
let test = document.querySelector(".test");
let testwrapper = document.querySelector(".test-wrapper");
let megacontainer = document.querySelector(".mega-container");
test.addEventListener("click" , ()=>{
    testwrapper.classList.add("active");
    megacontainer.classList.add("active");
    testfunction1();
}) 

function testfunction1() {
let raspunsuri = document.querySelector(".respunsuri");
let raspunsurih2 = document.querySelectorAll(".ras-1");
let startbtn = document.querySelector(".start-btn");
let starttime;
let endtime;
let duration;
let detali = document.querySelector(".detail");
console.log(raspunsurih2);
let intrebari = [
    "Cum sunt elemntele listei? ",
    "Cum se face accesul unui nod al listei? ",
    "Ce tip de memorie se aloca nodurilor listei?  ",
    "Din cate parti sunt alcatuite valorile unei liste?",
]
let corectgresit = document.querySelector(".corect-h1");
let raspunsuriarray = [
    "Noduri",
    "Variabile dinamice",
    "Prin parcurgerea nodurilor precedente",
    "HEAP",
    "2",
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
    ["Variabile " , "Variabile statice" ,"Variabile dinamice" ,"Niciunul dintre raspunsurile prezentate"],
    ["Niciunul dintre raspunsurile prezentate" , "Prin metoda Heizenberg" ,"Prin accesarea directa a nodului" , "Prin parcurgerea nodurilor precedente"],
    ["STACK" , "HEAP" , "Niciunul dintre raspunsurile prezentate" , "LEEP"],
    ["3" , "1" , "2" , "4"],
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
      console.log(raspuns);
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
    let all = `<h1 class = "x"> <i class="far fa-times-circle"></i> </h1>`;
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
}
 let seeproblems = document.querySelector(".see-problems");
 let imageslideshow = document.querySelector(".imageslideshow");
 seeproblems.addEventListener("click" , sevedefunction);
 function sevedefunction () {
     imageslideshow.classList.add("sevede");
 }
 function nusevedefunction(){
     imageslideshow.classList.remove("sevede");
 }
// aici se afla slideshow

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active1", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active1";
}