let canvas = document.querySelector(".board");
let  ctx = canvas.getContext("2d");
let scorespan = document.querySelector(".score");
let scoreh1 = document.querySelector(".h1score");
let scale = 30;
var  speed = 100;
// ctx.fillStyle = "#FFF";
// ctx.fillRect(250,250,scale*2,scale);
 var snake;
let rows = canvas.height / scale;
let columns = canvas.width / scale;
 window.addEventListener("keydown" , (event) =>{
   let key = event.key.slice(5);
   snake.changeDirection(key);
 });
var fruit ;
let coordonate ;
(function setup () {
    snake = new Snake();
    fruit = new Fruit();
    fruit.location();
   window.setInterval(() =>{
      ctx.clearRect(0,0,canvas.height , canvas.width);
      fruit.draw();
      snake.update();
      snake.draw();
      // if(snake.lose()) {
      //    scoreh1.textContent = "you lose";
      //    snake.xspeed = 0;
      //    snake.yspeed = 0;
      // }
      if(snake.eat()) {
         fruit.location();
      }
   }, speed); 
} ());


function Snake () {
   this.x = 0;
   this.y = 0;
   this.xspeed = scale;
   this.yspeed = 0;
   this.total = 0;
   this.tail = [];
   this.score = 0;
   this.draw = function () {
       ctx.fillStyle = "blue";

       for(let i=0;i<this.tail.length;i++){
         ctx.fillRect(this.tail[i].x , this.tail[i].y , scale , scale);
       }
       ctx.fillRect(this.x , this.y , scale , scale);
   }
   this.update = function () {

     for(let i=0;i<this.tail.length-1;i++){
        this.tail[i] = this.tail[i+1];
     }
     this.tail[this.total -1] = { x : this.x , y : this.y}
   //   console.log(this.tail);
      this.x += this.xspeed;
      this.y += this.yspeed;

      if(this.x > canvas.width) {
         this.x = 0;
      }
      if(this.y > canvas.height) {
         this.y = 0;
      }
      if(this.x < 0) {
         this.x = canvas.width;
      }  
      if(this.y < 0) {
         this.y= canvas.height;
      }

      
   }
   this.changeDirection = function(key) {
   switch(key) {
      case "Up" :
         this.xspeed = 0;
         this.yspeed = -scale;
         break;
      case "Down" :
         this.xspeed = 0;
         this.yspeed = scale;
         break;
      case "Left" : 
         this.xspeed = -scale;
         this.yspeed = 0;
         break;
      case "Right" :
         this.xspeed = scale;
         this.yspeed =0;
         break;
      default :
        console.log("ai belit pula");
        break;
   }
   }
   this.eat = function () {
      if(this.x === fruit.xfruit  && this.y === fruit.yfruit){
         this.score+=5;
         this.total++;
         scorespan.textContent = this.score;
         return true;
      }
   }
   // this.lose = function () {
   //    for(let i=0;i<this.tail.length;i++){
   //       if(this.tail[-1].x === this.tail[i].x && this.tail[-1].y === this.tail[i].y) {
   //          return true;
   //       }
   //    }
   // }
}
function Fruit () {
  this.location = function () { 
      this.xfruit = Math.floor(Math.random() * rows) * scale;
      this.yfruit = Math.floor(Math.random() * columns) * scale;
  }
this.draw = function () {
   ctx.fillStyle = "red";
   ctx.fillRect(this.xfruit , this.yfruit , scale , scale);
} 
}