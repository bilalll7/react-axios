import axios from 'axios';
const UrlApi = 'http://127.0.0.1:8000/api/';

const createPoll = async ({ title, description, deadline, choices }) => {
  try {
    const JWTToken = localStorage.getItem('access_token');
    const dataCreate = await axios({
      method: 'post',
      url: `${UrlApi}poll`,
      headers: {
        Authorization: `Bearer ${JWTToken}`,
      },
      data: {
        title,
        description,
        deadline,
        choices,
      },
    });
    return dataCreate;
  } catch (error) {
    console.log('error', error);
    return 'error';
  }
};

export { createPoll };
