const loadWetherData = async () => {
  const input = document.getElementById("search-input");
  const inputText = input.value;
  input.value = "";
  if (inputText.length >= 2) {
    const url = `http://api.weatherstack.com/current?access_key=7697cb9b58cd32191ce52d6b54553d64&query=${inputText}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    displayData(data);
  } else {
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `<h1>please enter a city name</h1>`;
    // console.log("");
  }
};

const displayData = (data) => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
  <img src="${data.current.weather_icons[0]}" alt="">
    <h1>${data.location.name}</h1>
    <h2>${data.current.temperature}C</h2>
    <h3>${data.current.weather_descriptions[0]}</h3>
    <p onclick="wetherDetails('${data.location.name}')">Show more info</p>
  `;
  document.getElementById("weather-details").textContent = "";
};

const wetherDetails = async (city) => {
  const url = `http://api.weatherstack.com/current?access_key=7697cb9b58cd32191ce52d6b54553d64&query=${city}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  const details = document.getElementById("weather-details");
  details.innerHTML = `
  <h1>City: ${data.location.name}</h1><br/>
  <h2>Temperature: ${data.current.temperature}</h2><br/>
  <h2>Weather: ${data.current.weather_descriptions[0]}</h2><br/>
  <p>observation time: ${data.current.observation_time}</p><br/>
  <p>Local time: ${data.location.localtime}<br/>
  <p>Time Zone: ${data.location.timezone_id}
  <p>Country: ${data.location.country}</p>
  `;
};
