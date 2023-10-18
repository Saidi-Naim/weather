import React from 'react';

const Details = ({ dayData, data, show, setShow }) => {
  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      {dayData ? (
        <div className='flex col-start-1 mt-20'>
          <div className=' flex justify-center items-center text-white w-full'>
            <div className='card flex flex-col justify-center items-center gap-2 col-start-1 rounded-lg text-white w-[400px] h-[350px]  mt-[-8px] mb-[35px]'>
              <img src={dayData?.day?.condition.icon} alt='logo weather' className='w-[150px] self-center mt-20' />
              <h1 className='text-8xl col-start-1 '>{Math.round(dayData?.day?.avgtemp_c)}&deg;c</h1>
              <h2 className='text-xl font-bold text-center col-start-1'>
                {data?.location?.name}, {data?.location?.country}
              </h2>
              <p className='col-start-1'>{data?.current?.condition.text}</p>
              <button onClick={handleShow}>More Details</button>
            </div>
            <div className={`${show ? 'flex' : 'hidden'} flex-col gap-5 text-lg`}>
              <p className='col-start-2'>
                Humidité: <span className=' font-bold text-xl'>{dayData?.day?.avghumidity}</span>
              </p>
              <p className='col-start-2'>
                Temp. Max: <span className=' font-bold text-xl'>{dayData?.day?.maxtemp_c}</span>
              </p>
              <p className='col-start-2'>
                Temp. Min: <span className=' font-bold text-xl'>{dayData?.day?.mintemp_c}</span>
              </p>
              <p className='col-start-2'>
                UV: <span className=' font-bold text-xl'>{dayData?.day?.uv}</span>
              </p>
            </div>
          </div>
        </div>
      ) : (
        Object.keys(data).length !== 0 && (
          <div className='flex col-start-1 mt-20'>
            <div className=' flex justify-center items-center text-white w-full'>
              <div className='card flex flex-col justify-center items-center gap-2 col-start-1 rounded-lg text-white w-[400px] h-[350px]  mt-[-8px] mb-[35px]'>
                <img src={data?.current?.condition.icon} alt='logo weather' className='w-[150px] self-center' />
                <h1 className='text-8xl col-start-1 '>{Math.round(data?.current?.temp_c)}&deg;c</h1>
                <h2 className='text-xl font-bold text-center col-start-1'>
                  {data?.location?.name}, {data?.location?.country}
                </h2>
                <p className='col-start-1'>{data?.current?.condition.text}</p>
                <button className='w-[40%] font-bold hover:scale-110 transition-all duration-75' onClick={handleShow}>
                  More Details
                </button>
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
    </>
  );
};

export default Details;
