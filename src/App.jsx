import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BiCurrentLocation, BsSearch } from 'react-icons/all';
import DarkMode from './components/DarkMode';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // console.log(event);
      const url = `http://api.weatherapi.com/v1/forecast.json?key=fead2aef88e342489ed130154231804&q=${location}&days=6&aqi=no&alerts=no&lang=fr`;

      //   setLoading(true);
      try {
        const response = await axios.get(url);

        setData(response?.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      //   setLoading(false);
    }
  };

  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const fetchWeatherData = async () => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=fead2aef88e342489ed130154231804&q=${userLocation.latitude},${userLocation.longitude}&days=6&aqi=no&alerts=no&lang=fr`;
    const response = await fetch(url);
    const data = await response.json();
    setData(data);
    // console.log(data);
    setLocation(data.name);
  };

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      fetchWeatherData();
    }
    // eslint-disable-next-line
  }, [userLocation]);

  const handleUserLocation = () => {
    if (navigator.geolocation) {
      console.log('test');
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocation('');
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div
      className='app grid justify-center justify-items-center bg-[#1e1e1e]
      items-center
      '
    >
      {/* <DarkMode /> */}
      <div className='flex flex-col mt-5 md:mt-5 formContainer w-max'>
        <form className='flex justify-center relative'>
          <input
            className='rounded-[8px] px-4 py-3 uppercase w-70 sm:w-96 items-center focus:placeholder-transparent focus:outline-[#ff9800] focus:outline-1'
            type='text'
            placeholder='Enter Location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                searchLocation(e);
              }
            }}
          />
          <button type='button' className='absolute right-11 top-3 w-[55px] text-[#ff9800] ' onClick={handleUserLocation}>
            <BiCurrentLocation className='text-2xl' />
          </button>
          <button type='submit' className='ml-4 px-3 py-1 bg-[#ff9800] text-white rounded-[200px]'>
            <BsSearch className='text-2xl ' />
          </button>
        </form>
      </div>

      {Object.keys(data).length !== 0 && (
        <div className='grid gap-5'>
          <div className=' flex justify-center'>
            <div className='card col-start-1 rounded-lg justify-items-center text-white w-[400px] h-[350px] grid grid-cols-2 items-center mt-[-8px] mb-[35px]'>
              <img src={data?.current.condition.icon} alt='logo weather' className='w-[150px] self-center' />
              <h2 className='text-8xl col-start-1 '>{data?.current.temp_c}&deg;c</h2>
              <h4 className='text-xl font-bold text-center col-start-1'>
                {data?.location.name}, {data?.location.country}
              </h4>
              <p className='col-start-1'>{data?.current.condition.text}</p>
            </div>
          </div>
          <div className='ml-2 mr-2 grid text-center grid-cols-1 align-center lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-7 row-start-2 grid-flow-dense'>
            {data.forecast.forecastday.slice(0).map((day) => (
              <div key={day.date} className='containerForecast flex justify-center'>
                <div className='flex flex-col mb-[15px] w-[200px] h-[200px] rounded-lg  bg-[#ff9800] text-white mt-[20px] '>
                  <h1>{formatDate(day.date)}</h1>
                  <img className='w-[85px] self-center' src={day?.day.condition.icon} alt='logo weather' />
                  <h2 className='justify-start font-bold text-2xl '>{Math.round(day.day.avgtemp_c)}&deg;c</h2>
                  <p className='self-start pl-2'>Max: {Math.round(day.day.maxtemp_c)}&deg;c</p>
                  <p className='self-start pl-2'>Min: {Math.round(day.day.mintemp_c)}&deg;c</p>
                  <p></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
