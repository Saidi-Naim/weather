import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BiCurrentLocation, BsSearch } from 'react-icons/all';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [dayData, setDayData] = useState(null);
  const [show, setshow] = useState(false);

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      const url = `http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${location}&days=6&aqi=no&alerts=no&lang=en`;

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
    }&days=7&aqi=no&alerts=no&lang=en`;
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
  const handleDay = (daydata) => {
    setDayData(daydata);
    console.log(daydata);
  };
  const handleShow = () => {
    setshow(!show);
  };

  const weatherBackgrounds = {
    Sunny: 'bg-yellow-200',
    Rainy: 'bg-blue-500',
    Clear: 'bg-gradient-to-r from-sky-500 to-indigo-500',
    // Ajoutez d'autres conditions et classes CSS ici
  };

  const getBackgroundColorClass = (condition) => {
    return weatherBackgrounds[condition] || 'bg-gray-200'; // Classe CSS par défaut
  };

  const backgroundClass = getBackgroundColorClass(data.current.condition.text);
  return (
    <div className={`app w-full grid grid-cols-1 ${backgroundClass}`}>
      <div className='fixed col-start-1 top-0 flex mt-5 md:mt-5 formContainer w-full justify-center'>
        <form className='flex justify-center'>
          <div className='relative flex'>
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
            <button type='button' className='absolute right-0 top-3 w-[30px] text-[#ff9800] ' onClick={handleUserLocation}>
              <BiCurrentLocation className='text-2xl' />
            </button>
          </div>

          <button type='submit' className='ml-4 px-3 py-1 bg-[#ff9800] text-white rounded-[200px]' onClick={fetchWeatherData}>
            <BsSearch className='text-2xl ' />
          </button>
        </form>
        {errorMessage ? <div className='row-start-1 text-red-400 py-2'>Caractères spéciaux détectés.</div> : null}
      </div>

      {dayData ? (
        <div className='flex col-start-1 mt-20'>
          <div className=' flex justify-center items-center text-white w-full'>
            <div className='card flex flex-col justify-center items-center gap-4 col-start-1 rounded-lg text-white w-[400px] h-[350px]  mt-[-8px] mb-[35px]'>
              <img src={dayData?.day.condition.icon} alt='logo weather' className='w-[150px] self-center' />
              <h1 className='text-8xl col-start-1 '>{Math.round(dayData?.day.avgtemp_c)}&deg;c</h1>
              <h2 className='text-xl font-bold text-center col-start-1'>
                {data?.location.name}, {data?.location.country}
              </h2>
              <p className='col-start-1'>{data?.current.condition.text}</p>
              <button onClick={handleShow}>Click</button>
            </div>
            <div className={`${show ? 'flex' : 'hidden'} flex-col gap-5 text-lg`}>
              <p className='col-start-2'>
                Humidité: <span className=' font-bold text-xl'>{dayData?.day.avghumidity}</span>
              </p>
              <p className='col-start-2'>
                Temp. Max: <span className=' font-bold text-xl'>{dayData?.day.maxtemp_c}</span>
              </p>
              <p className='col-start-2'>
                Temp. Min: <span className=' font-bold text-xl'>{dayData?.day.mintemp_c}</span>
              </p>
              <p className='col-start-2'>
                UV: <span className=' font-bold text-xl'>{dayData?.day.uv}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        Object.keys(data).length !== 0 && (
          <div className='flex col-start-1 mt-20'>
            <div className=' flex justify-center items-center text-white w-full'>
              <div className='card flex flex-col justify-center items-center gap-4 col-start-1 rounded-lg text-white w-[400px] h-[350px]  mt-[-8px] mb-[35px]'>
                <img src={data?.current.condition.icon} alt='logo weather' className='w-[150px] self-center' />
                <h1 className='text-8xl col-start-1 '>{Math.round(data?.current.temp_c)}&deg;c</h1>
                <h2 className='text-xl font-bold text-center col-start-1'>
                  {data?.location.name}, {data?.location.country}
                </h2>
                <p className='col-start-1'>{data?.current.condition.text}</p>
                <button onClick={handleShow}>click</button>
              </div>
              <div className={`${show ? 'flex' : 'hidden'} flex-col gap-5 text-lg`}>
                <p className='col-start-2'>
                  Humidité: <span className=' font-bold text-xl'>{data?.current.humidity}</span>
                </p>
                <p className='col-start-2'>
                  Temp. Max: <span className=' font-bold text-xl'>{data?.current.temp_c}</span>
                </p>
                <p className='col-start-2'>
                  Temp. Ressenti: <span className=' font-bold text-xl'>{data?.current.feelslike_c}</span>
                </p>
                <p className='col-start-2'>
                  UV: <span className=' font-bold text-xl'>{data?.current.uv}</span>
                </p>
              </div>
            </div>
          </div>
        )
      )}
      <div className=' ml-2 mr-2 flex justify-center flex-wrap text-center align-center lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-7 row-start-2 grid-flow-dense'>
        {data?.forecast?.forecastday.slice(0).map((day) => (
          <div onClick={() => handleDay(day)} key={day.date} className='containerForecast flex justify-center'>
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
  );
}

export default App;
