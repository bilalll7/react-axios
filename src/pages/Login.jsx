import React, { useState } from 'react';
import { ActionLogin } from '../libs/AuthLogin';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    username: '',
    password: '',
  });

  const [isLoading, setisLoading] = useState(false);

  const [isError, setisError] = useState('');

  const handleInput = (data, Atributename) => {
    setCredential({
      ...credential, // spreading the unchanged values
      [Atributename]: data.target.value, // changing the state of changed value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    //validasi data
    // jika null
    if (credential.username === '' || credential.username.trim() === '') {
      setisError('Harap isi username!');

      setTimeout(() => {
        setisError('');
      }, 3000);
    }

    //call api login
    const actionLogin = await ActionLogin(credential);
    if (actionLogin.data) {
      console.log('token', actionLogin.data.access_token);
      localStorage.setItem('access_token', actionLogin.data.access_token);
      navigate('/poll');
    }
    if (actionLogin == 'error') {
      alert('error');
    }

    // true taruh nke localstorage
    // redux;

    setTimeout(() => {
      setisLoading(false);
    }, 500);
  };
  return (
    <>
      <div className="form">
        <h2>Login</h2>
        <form action="" className="form-wrapper">
          <div className="form-username">
            <label htmlFor="">Username:</label>
            <br />
            <input type="text" onChange={(e) => handleInput(e, 'username')} className="input-form" placeholder="Username" />
          </div>
          <div className="form-password">
            <label htmlFor="">Password:</label>
            <br />
            <input type="password" onChange={(e) => handleInput(e, 'password')} className="input-form" placeholder="Password" />
          </div>
          <button type="button" onClick={handleSubmit} className="cta-link">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
