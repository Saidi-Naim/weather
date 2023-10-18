import React from 'react';

const Forecast = ({ dayData, data, setDayData }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  const handleDay = (daydata) => {
    setDayData(daydata);
  };
  return (
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
  );
};

export default Forecast;
