import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Search from './components/Search';
import Forecast from './components/Forecast';
import Details from './components/Details';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [dayData, setDayData] = useState(null);
  const [show, setShow] = useState(false);
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const searchLocation = async (event) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_API_KEY}&q=${location}&days=6&aqi=no&alerts=no&lang=en`;

    //   setLoading(true);
    try {
      const response = await axios.get(url);

      setData(response?.data);
    } catch (error) {
      console.log(error);
    }
    //   setLoading(false);
  };

  return (
    <div className={`app w-full grid grid-cols-1 `}>
      <Search
        location={location || ''}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
        setLocation={setLocation}
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        setData={setData}
        data={data}
        searchLocation={searchLocation}
      />
      <Forecast dayData={dayData} setDayData={setDayData} data={data} />
      <Details dayData={dayData} data={data} show={show} setShow={setShow} />
    </div>
  );
}

export default App;
