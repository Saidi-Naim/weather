import React from 'react';

const Modal = () => {
  return (
    <div>
      <main className='w-96 h-96 rounded-[50%] blur-[10px] bg-[rgba(255,255,255,0.65)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 border-solid border-black'>
        <header className='titleModal text-xl text-white'>hello</header>
      </main>
    </div>
  );
};

export default Modal;
