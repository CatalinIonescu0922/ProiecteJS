const api = {
    key : "a42bb239639cc616a00a1ffad85c675f",
    baseurl : "https://api.openweathermap.org/data/2.5/"
}

let searchcity = document.querySelector(".search-city");

searchcity.addEventListener("keypress" , searchfunct) ;

function searchfunct (e) {
    if(e.keyCode === 13) {
        getData(searchcity.value);
    }
}
function getData (location) {
    fetch(`${api.baseurl}weather?q=${location}&units=metric&APPID=${api.key}`)
      .then(weather =>{
         return weather.json();
       }).then(displayResults);
}

function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector(".city");
    city.textContent = `${weather.name},  ${weather.sys.country}`;
    let now = new Date();
    let datestring = now.toString();
    let date = datestring.slice(0,15);
    let time = document.querySelector(".time");
    time.textContent = date;
    let temp = document.querySelector(".exact-temperature");
    temp.innerHTML = `${Math.floor(weather.main.temp)}<span>°c</span>`;
    let description = document.querySelector(".descriprion");
    description.textContent = weather.weather[0].description;
    let feel = document.querySelector(".feel");
    feel.textContent =`${Math.floor(weather.main.feels_like)}`;
    let min = document.querySelector(".min");
    min.textContent = weather.main.temp_min;
    let max= document.querySelector(".max");
    max.textContent = weather.main.temp_max;
}