import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import rain from './assets/rain.jpg';
import lo from './assets/106826.jpg';
import Loader from './components/Loader/Loader';
import Login from './components/Login/Login';
import { FaLocationArrow } from 'react-icons/fa';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('Bruxelles');
  const [backgroundd, setBackground] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3aef15b8b5c1213f29a8b834a1a39eab&units=metric`;
      setLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      event.preventDefault();
    }
  };

  useEffect(() => {
    searchLocation();
  }, [location]);

  useEffect(() => {
    searchLocation({ key: 'Enter' });
  }, []);

  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const handleUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        },
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const fetchWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${userLocation.latitude}&lon=${userLocation.longitude}&appid=3aef15b8b5c1213f29a8b834a1a39eab&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
    setLocation(data.name);
  };

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      fetchWeatherData();
    }
  }, [userLocation]);

  const iconcode = data.weather && data.weather.length > 0 ? data.weather[0].icon : null;
  const iconurl = iconcode ? `http://openweathermap.org/img/wn/${iconcode}@2x.png` : null;

  useEffect(() => {
    switch (data.weather && data.weather[0].main) {
      case 'Clear':
        setBackground(lo);
        break;
      case 'Clouds':
        setBackground(rain);
        break;
      case 'Rain':
      case 'Drizzle':
      case 'Mist':
        setBackground(rain);
        break;
      default:
        setBackground(lo);
        break;
    }
  }, [data]);

  const handleChecked = () => {
    setChecked(!checked);
  };

  return (
    <div className={checked ? 'light' : 'dark'}>
      <div className='search'>
        <div>
          <input
            className='inputLocation'
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyDown={searchLocation}
            placeholder='Enter Location'
            type='text'
            // style={{
            //   backgroundImage:
            //     'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"></path></svg>\')',
            // }}
          />
          <FaLocationArrow className='locationIcon' onClick={handleUserLocation} />
        </div>

        {/* <button onClick={handleUserLocation}>Your Location</button> */}
      </div>
      <label className='switch'>
        <input type='checkbox' onChange={handleChecked} />
        <span class='slider'></span>
      </label>
      <Login />

      <div className='container'>
        {loading ? (
          <Loader />
        ) : Object.keys(data).length !== 0 ? (
          <>
            <div className='top'>
              <div className='location'>
                <p>
                  {data.name}, {data.sys.country}
                </p>
              </div>
              <div className='temp'>
                <h1>{Math.round(data.main.temp)}°C</h1>
              </div>
              <div className='description'>
                {iconurl ? <img className='wicon' src={iconurl} alt='Weather icon' /> : null}
                <p>{data.weather[0].description}</p>
              </div>
            </div>
            <div className='bottom'>
              <div className='feels'>
                <p className='bold'>{data.main.feels_like}°C</p>
                <p>Feels Like</p>
              </div>
              <div className='humidity'>
                <p className='bold'>{data.main.humidity}%</p>
                <p>Humidity</p>
              </div>
              <div className='winds'>
                <p className='bold'>{Math.round(data.wind.speed)} Km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </>
        ) : (
          <div className='no-data'>Enter a location to get weather information.</div>
        )}
      </div>
    </div>
  );
}

export default App;
