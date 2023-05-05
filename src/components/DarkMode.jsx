import React, { useState } from 'react';

const DarkMode = () => {
  const [checked, setChecked] = useState(false);

  const switchDark = () => {
    setChecked((prevDarkMode) => !prevDarkMode);
    return;
  };
  return (
    <>
      <input type='checkbox' />
    </>
  );
};

export default DarkMode;
