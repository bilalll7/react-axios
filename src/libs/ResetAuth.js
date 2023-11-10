import axios from 'axios';
const UrlApi = 'http://127.0.0.1:8000/api/';
const JWTToken = localStorage.getItem('access_token');
// console.log('process.env', process.env.BASE_URL);
const resetPassword = async (old_password, new_password) => {
  try {
    const dataReset = await axios({
      method: 'post',
      url: `${UrlApi}auth/reset_password`,
      headers: {
        Authorization: `Bearer ${JWTToken}`,
      },
      data: old_password,
      new_password,
    });
    return dataReset;
  } catch (error) {
    console.log('error', error);
    return 'error';
  }
};

export { resetPassword };
