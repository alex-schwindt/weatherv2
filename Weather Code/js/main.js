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

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,rain_sum,wind_speed_10m_max,wind_gusts_10m_max&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,weather_code,uv_index,is_day&current=relative_humidity_2m,temperature_2m,wind_speed_10m,precipitation,rain,showers,snowfall,apparent_temperature,wind_gusts_10m,weather_code,is_day&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`

      return fetch(weatherUrl)
    })
    .then(res => res.json())
    .then(data => {
      console.log("Weather data:", data)
      document.querySelector('.currentTitle').style.display = 'block'
      document.querySelector('.currentTemp').innerText = `Current Temperature: ${data.current.temperature_2m} \u00B0F \n`
      document.querySelector('.relHumid').innerText = `Current Humidity: ${data.current.relative_humidity_2m}% \n`
      document.querySelector('.relTemp').innerText = `Feels Like Temperature: ${data.current.apparent_temperature} \u00B0F \n`
     
      // Choose icon based on weather code
        let iconSrc = ''
        switch(data.current.weather_code){
          case 0: iconSrc = 'img/sun.png'; break; // Clear
          case 1: iconSrc = 'img/sun.png'; break; // Mainly clear
          case 2: iconSrc = 'img/partlyCloudy.png'; break; // Partly cloudy
          case 3: iconSrc = 'img/cloudy.png'; break; // Overcast
          // Add more cases for other weather codes as needed
          default: iconSrc = 'img/PHOTO-default.jpg'; // Fallback image
        }
        document.querySelector('.currentImg').src = iconSrc
        document.querySelector('.currentImg').alt = 'Weather icon'
        document.querySelector('.currentImg').style.display = 'block'

      // 7-Day Forecast Section  
      for(let i = 0; i < 7; i++){
        document.querySelector(`.day${i}High`).innerText = `High ${data.daily.temperature_2m_max[i]}\u00B0F \n`
        document.querySelector(`.day${i}Low`).innerText = `Low ${data.daily.temperature_2m_min[i]}\u00B0F \n`
        let date = new Date(data.daily.time[i] + "T00:00:00Z")
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        document.querySelector(`.day${i}Name`).innerText = days[date.getUTCDay()]

        // Choose icon based on weather code
        let iconSrc = ''
        switch(data.daily.weather_code[i]){
          case 0: iconSrc = 'img/sun.png'; break; // Clear
          case 1: iconSrc = 'img/sun.png'; break; // Mainly clear
          case 2: iconSrc = 'img/partlyCloudy.png'; break; // Partly cloudy
          case 3: iconSrc = 'img/cloudy.png'; break; // Overcast
          // Add more cases for other weather codes as needed
          default: iconSrc = 'img/PHOTO-default.jpg'; // Fallback image
        }
        document.querySelector(`.day${i}CurrentImg`).src = iconSrc
        document.querySelector(`.day${i}CurrentImg`).alt = 'Weather icon'
        // Show the box
        document.querySelectorAll('.sevenDay')[i].style.display = 'block'
      }
      document.querySelector('.sevenDayTitle').style.display = 'block'
      document.querySelector('.currentTitle').style.display = 'block'
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}


