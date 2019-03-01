const weather = document.querySelector(".js-weather");


const API_KEY = "97649e666d867598790f35d22987b2be";
const COORDS = 'coords';

function getWeather (lat,lng) {
    fetch (`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @${place}`;
    });
    //then은 데이터가 완전이 들어온후 함수를 실행함.
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}


function handleGeoSuccess(positon) {
    const latitude = positon.coords.latitude; //위도
    const longitude = positon.coords.longitude; //경도
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {

}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}


function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if (loadCoords === null) {
        askForCoords () ;
   } else {
       const parseCoords = JSON.parse(loadCoords);
       getWeather(parseCoords.latitude, parseCoords.longitude);
   }
}

function init() {
    loadCoords();
}

init();