import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
  const appStyle = {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'lightblue',
    padding: '50px',
    border: '2px solid black',
    width: '700px',
    margin: 'auto',
    marginTop: '50px',
  }
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  const apiKey = 'b4012a55044ad1ace993d31baaf5c4c5';

  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!city) return

    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric',
        },
      })
      setWeatherData(response.data)
      setError(null)
    } catch (err) {
      setWeatherData(null)
      setError('City not found, please try again.')
    }
  }

  return (
    <div className="App container" style={appStyle}>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  )
}

export default App

