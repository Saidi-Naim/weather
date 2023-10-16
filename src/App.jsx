import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BiCurrentLocation, BsSearch } from 'react-icons/all';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const url = `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${location}&days=6&aqi=no&alerts=no&lang=fr`;

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
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${userLocation.latitude},${
      userLocation.longitude
    }&days=7&aqi=no&alerts=no&lang=fr`;
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

  const handleUserLocation = () => {
    if (navigator.geolocation) {
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
      <div className='flex flex-col mt-5 md:mt-5 formContainer w-max'>
        <form className='flex justify-center relative'>
          <input
            className='rounded-[8px] px-4 py-3 capitalize w-70 sm:w-96 items-center focus:placeholder-transparent focus:outline-[#ff9800] focus:outline-1'
            type='text'
            placeholder='Enter Location'
            value={location}
            onChange={(e) => {
              const inputValue = e.target.value;
              const specialCharactersRegex = /[^a-zA-Z0-9\s]/;
              if (specialCharactersRegex.test(inputValue)) {
                // Affichez un message d'erreur ou effectuez une action appropriée
                setErrorMessage(true);
                console.log('Caractères spéciaux détectés. Veuillez entrer un emplacement valide.');
              } else {
                // Mettez à jour la valeur de l'emplacement
                setLocation(inputValue);
              }
            }}
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
      {errorMessage ? <div className='text-red-400 py-2'>Caractères spéciaux détectés.</div> : null}

      {Object.keys(data).length !== 0 && (
        <div className='grid gap-5'>
          <div className=' flex justify-center'>
            <div className='card col-start-1 rounded-lg justify-items-center text-white w-[400px] h-[350px] grid grid-cols-2 items-center mt-[-8px] mb-[35px]'>
              <img src={data?.current.condition.icon} alt='logo weather' className='w-[150px] self-center' />
              <h1 className='text-8xl col-start-1 '>{data?.current.temp_c}&deg;c</h1>
              <h2 className='text-xl font-bold text-center col-start-1'>
                {data?.location.name}, {data?.location.country}
              </h2>
              <p className='col-start-1'>{data?.current.condition.text}</p>
              <p className='col-start-2'>Feels: {data?.current.feelslike_c}</p>
            </div>
          </div>
          <div className='ml-2 mr-2 grid text-center grid-cols-1 align-center lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-7 row-start-2 grid-flow-dense'>
            {data.forecast.forecastday.slice(0).map((day) => (
              <div key={day.date} className='containerForecast flex justify-center'>
                <div className='flex flex-col mb-[15px] w-[200px] h-[200px] rounded-lg  bg-[#f2f2f2a7] backdrop-blur- text-white mt-[20px] '>
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
