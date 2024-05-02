import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [location, setLocation] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        
        const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=22235551491d9d050a2778bce484bbc6&units=metric`);
        const currentWeatherData = await currentWeatherResponse.json();
        setCurrentWeather(currentWeatherData);

        
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=122235551491d9d050a2778bce484bbc6&units=metric`);
        const forecastData = await forecastResponse.json();
        setForecast(forecastData);

        setLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocation('');
  };

  return (
    <div className="App">
      <h1>Wetter App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={location}
          onChange={handleLocationChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {currentWeather && (
        <div>
          <h2>Current Weather</h2>
          <p>Temperature: {currentWeather.main?.temp} °C</p>
          <p>Description: {currentWeather.weather?.[0]?.description}</p>
          <p>Wind Speed: {currentWeather.wind?.speed} m/s</p>
        </div>
      )}
      {forecast && forecast.list && (
  <div>
    <h2>Weather Forecast</h2>
    {forecast.list.map((item, index) => (
      <div key={index}>
        <p>Date: {item.dt_txt}</p>
        <p>Temperature: {item.main?.temp} °C</p>
        <p>Description: {item.weather?.[0]?.description}</p>
        <p>Wind Speed: {item.wind?.speed} m/s</p>
      </div>
    ))}
  </div>
)}
    </div>
  );
}

export default App;
