import React from 'react';
import axios from 'axios';
const UrlApi = 'http://127.0.0.1:8000/api/';
const getAllPolls = async (JWTToken) => {
  try {
    const JWTToken = localStorage.getItem('access_token');
    const dataPoll = await axios({
      method: 'get',
      url: `${UrlApi}poll`,
      headers: {
        Authorization: `Bearer ${JWTToken}`,
      },
    });
    return dataPoll;
  } catch (error) {
    console.log('error', error);
    return 'error';
  }
};
export { getAllPolls };
