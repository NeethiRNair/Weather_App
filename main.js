const api = {
    key: "c97e8a070f7a38c840693ec6a737458c",
    base: "https://api.openweathermap.org/data/2.5/"
}
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress',searchLoc);

function searchLoc(event){
    if(event.keyCode == 13){
        getResults(searchBox.value);
    }
}
function getResults(loc){
    fetch(`${api.base}weather?q=${loc}&appid=${api.key}`).then(weather => {
        return weather.json()
    }).then(showResult);
}
function showResult(weather){
    console.log(weather)
    let location = document.querySelector('.location .city');
    location.innerHTML = `${weather.name}, ${weather.sys.country}`;
    
    let locDate = document.querySelector('.location .date');
    locDate.innerHTML = formatDate(); 
    
    let temp = document.querySelector('.current .temperature');
    temp.innerHTML = `${Math.round(weather.main.temp - 273.15)}<span>°C</span>`;
    
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = `${weather.weather[0].main}`;
    
    let minmax = document.querySelector('.current .hi-low');
    minmax.innerHTML = `${Math.round(weather.main.temp_max - 273.15)}°C / ${Math.round(weather.main.temp_min - 273.15)}°C`;

    
}

function formatDate(){
    let date = new Date();
    days=['Sunday','Monday','Tuesday','wednesday','Thursday','Friday','Saturday'];
    day= days[date.getDay()];
    months=['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November','December'];
    month = months[date.getMonth()];
    year = date.getFullYear();
    d = date.getDate();
    return `${day}, ${d} ${month} ${year}`;
}

(()=>{
    getResults('kottayam');
    if (navigator.geolocation) {
        // geolocation is available
        console.log(navigator)
      } 
      else {
          console.log("no location")
        // geolocation is not supported
      }
    
})();