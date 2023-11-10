import axios from 'axios';
const UrlApi = 'http://127.0.0.1:8000/api/';

const ActionLogin = async ({ username, password }) => {
  try {
    const dataLogin = await axios({
      method: 'post',
      url: `${UrlApi}auth/login`,
      data: {
        username,
        password,
      },
    });
    return dataLogin;
  } catch (error) {
    console.log('error', error);
    return 'error';
  }
};

export { ActionLogin };
