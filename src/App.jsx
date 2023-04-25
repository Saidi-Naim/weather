import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BsSearch } from 'react-icons/all';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const searchLocation = async (event) => {
    event.preventDefault();
    // console.log(event);
    const url = `http://api.weatherapi.com/v1/forecast.json?key=fead2aef88e342489ed130154231804&q=${location}&days=5&aqi=no&alerts=no`;

    //   setLoading(true);
    try {
      const response = await axios.get(url);

      setData(response?.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    //   setLoading(false);
  };

  return (
    <div className='app grid justify-center items-center'>
      {/* <h1 className='py-4 text-5xl text-[purple] font-serif'>Search Location</h1> */}
      <div className='flex flex-col mt-5 md:mt-5 formContainer border-black border-solid'>
        <form onSubmit={searchLocation} className='flex justify-center '>
          <input
            className='px-4 py-3 uppercase w-full sm:w-96 text-center items-center border-solid border-2 border-slate-200 focus:placeholder-transparent focus:outline-purple-400 '
            type='text'
            placeholder='Enter Location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type='submit' className='px-4 py-3 bg-purple-500 text-white'>
            <BsSearch className='text-2xl' />
          </button>
        </form>
      </div>

      {Object.keys(data).length !== 0 && (
        <div className='grid gap-5'>
          <div className='align-center flex justify-center'>
            <div className='card col-start-3 rounded-lg justify-center bg-purple-500 text-white w-[400px] h-[350px] flex flex-col items-center mt-10 '>
              <h4 className='text-xl font-bold text-center'>
                {data?.location.name}, {data?.location.country}
              </h4>
              <img src={data?.current.condition.icon} alt='logo weather' className='w-[150px] self-center' />
              <h2 className='text-3xl font-bold'>{data?.current.temp_c}&deg;</h2>
              <p>{data?.current.condition.text}</p>
            </div>
          </div>
          <div className=' ml-2 mr-2 grid text-center  grid-cols-1 align-center lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3 gap-7 row-start-2 grid-flow-dense'>
            {data.forecast.forecastday.map((day) => (
              <div key={day.date} className='containerForecast flex justify-center'>
                <div className='flex flex-col mb-[15px] w-[200px] h-[200px] rounded-lg  bg-purple-500 text-white mt-[20px] '>
                  <h1>{day.date}</h1>
                  <img className='w-[90px] self-center' src={day?.day.condition.icon} alt='logo weather' />
                  <h2>{day.day.avgtemp_c.toFixed()}&deg;</h2>
                  <h2>Max: {day.day.maxtemp_c}&deg;</h2>
                  {console.log(day)}
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
