import axios from 'axios';
const UrlApi = 'http://127.0.0.1:8000/api/';

const me = async (JWTToken) => {
  try {
    const dataMe = await axios({
      method: 'post',
      url: `${UrlApi}auth/me`,
      headers: {
        Authorization: `Bearer ${JWTToken}`,
      },
    });
    return dataMe;
  } catch (error) {
    console.log('error', error);
    return 'error';
  }
};

export { me };
