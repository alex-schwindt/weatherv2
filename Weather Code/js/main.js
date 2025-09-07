//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

function getFetch(){
  const choice = document.querySelector('input').value
  const geocodeUrl = `https://geocode.maps.co/search?q=${choice}&api_key=68abbc7071f1d087138091juie41857`

  fetch(geocodeUrl)
    .then(res => res.json())
    .then(data => {
      console.log("Geocode data:", data[0])  

      // extract lat/lon from geocode API
      const lat = data[0].lat
      const lon = data[0].lon  

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,relative_humidity_2m,apparent_temperature`

      return fetch(weatherUrl)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Weather data:", data)
      console.log(data.current.temperature_2m)
      let tempCels = data.current.temperature_2m
      let tempFar = (tempCels * (9/5) + 32)
      let relativeHumidity = data.current.relative_humidity_2m
      document.querySelector('.currentTemp').innerText = `Current Temperature: ${Math.round(tempFar)} \u00B0F`
      console.log(tempFar)
      document.querySelector('.relHumid').innerText = `Current Humidity: ${relativeHumidity}%`
      console.log(relativeHumidity)
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}


