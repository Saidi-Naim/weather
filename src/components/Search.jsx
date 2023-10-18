import React, { useEffect } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';

const Search = ({ location, errorMessage, setErrorMessage, setLocation, userLocation, setUserLocation, setData, data, searchLocation }) => {
  const fetchWeatherData = async (latitude, longitude) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${
      import.meta.env.VITE_API_KEY
    }&q=${latitude},${longitude}&days=7&aqi=no&alerts=no&lang=en`;
    const response = await fetch(url);
    const newData = await response.json();
    setData(newData);
    setLocation(newData.name);
  };

  const handleUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });

        fetchWeatherData(position.coords.latitude, position.coords.longitude);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    if (userLocation.latitude && userLocation.longitude) {
      fetchWeatherData(userLocation.latitude, userLocation.longitude);
    }
  }, [userLocation]);

  return (
    <div className='fixed col-start-1 top-0 flex flex-col mt-5 md:mt-5 formContainer w-full justify-center '>
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
                setErrorMessage(true);
              } else {
                setErrorMessage(false);
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
      {errorMessage ? <div className='row-start-1 text-red-400 py-2 w-full text-center'>Caractères spéciaux détectés.</div> : null}
    </div>
  );
};

export default Search;
