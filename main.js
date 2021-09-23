const api = {
    key: "b4db8b2d62f139dd58c1919f9a9de044",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}


const searchBox = document.querySelector('#city');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
        // console.log(searchBox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseUrl}?q=${query}&units=metric&appid=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector(".cityName");
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector(".date");
    date.innerText = dateBuilder(now);

    let temp = document.querySelector(".temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let weather_el = document.querySelector(".weather");
    weather_el.innerText = `${weather.weather[0].main}`;


    let weather_img = document.querySelector(".img_url");
    weather_img.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    let hilow = document.querySelector(".hilow");
    hilow.innerText = `${Math.round(weather.main.temp_max)}°c / ${Math.round(weather.main.temp_min)}°c `


}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "Septemeber", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month}, ${year}`;
}