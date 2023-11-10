import React from 'react';
import { resetPassword } from '../libs/ResetAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    old_password: '',
    new_password: '',
  });

  const [isLoading, setisLoading] = useState(false);

  const handleInput = (data, getReset) => {
    setPassword({
      ...password, // spreading the unchanged values
      [getReset]: data.target.value, // changing the state of changed value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true);

    //validasi data
    // jika null
    // if (credential.username === '' || credential.username.trim() === '') {
    //   setisError('Harap isi username!');

    //   setTimeout(() => {
    //     setisError('');
    //   }, 3000);
    // }

    //call api login
    const actionReset = await resetPassword(password);
    if (actionReset.data) {
      console.log('token', actionReset.data.access_token);
      localStorage.getItem('access_token');
      alert('password berhasil di reset anda akan diarahkan ke halaman login');
      window.location.href = '/';
    }
    if (actionReset == 'error') {
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
      <Navbar />
      <div className="form">
        <h2>Reset Password</h2>
        <form action="" className="form-wrapper">
          <div className="form-username">
            <label htmlFor="">Old Password:</label>
            <br />
            <input type="text" onChange={(e) => handleInput(e, 'old_password')} className="input-form" placeholder="Old Password" />
          </div>
          <div className="form-password">
            <label htmlFor="">New Password:</label>
            <br />
            <input type="password" onChange={(e) => handleInput(e, 'new_password')} className="input-form" placeholder="New Password" />
          </div>
          <button type="button" onClick={handleSubmit} className="cta-link">
            Reset
          </button>
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
