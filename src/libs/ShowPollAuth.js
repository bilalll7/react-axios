import axios from 'axios';
import { useParams } from 'react-router-dom';
const UrlApi = 'http://127.0.0.1:8000/api/';
const polling = async (JWTToken) => {
  try {
    const pollingsData = await axios({
      method: 'get',
      url: `${UrlApi}poll`,
      headers: {
        Authorization: `Bearer ${JWTToken}`,
      },
    });
    return pollingsData;
  } catch (error) {
    console.log('error', error);
    return 'error';
  }
};
export { polling };
