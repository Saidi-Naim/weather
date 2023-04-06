import React, { useState } from 'react';
import './loginStyle.css';

const Login = () => {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const userNamee = 'naim';
  const passwordd = 'camila';

  const handleLogin = () => {
    // userName === userNamee ? setLogin(true) : setLogin(false);

    setIsOpen(true);
  };
  const handleLogOut = () => {
    setLogin(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userName === userNamee && password === passwordd) {
      alert('Formulaire soumis avec succès !');
      setLogin(false);
      closeModal();
    } else {
      alert('Veuillez remplir tous les champs du formulaire.');
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleUserName = ({ currentTarget }) => {
    setUserName(currentTarget.value);
    console.log(currentTarget.value);
  };
  const handlePassword = ({ currentTarget }) => {
    setPassword(currentTarget.value);
    console.log(currentTarget.value);
  };
  console.log(userName);
  return (
    <div>
      {login ? <button onClick={handleLogin}>Login</button> : <button onClick={handleLogOut}>Log Out</button>}

      {isOpen ? (
        <div className='modalContainer'>
          <div className='modal'>
            <div className='content'>
              <button onClick={closeModal}>X</button>
              <form>
                <label>
                  Nom:
                  <input onInput={handleUserName} type='text' />
                </label>
                <label>
                  Password:
                  <input onInput={handlePassword} type='password' />
                </label>
                <button type='submit' onClick={handleSubmit}>
                  Submit
                </button>
                <p>{userName}</p>
              </form>
              <p>{handleUserName}</p>
            </div>
          </div>
        </div>
      ) : (
        closeModal
      )}
    </div>
  );
};

export default Login;
