import axios from 'axios';
const UrlApi = 'http://127.0.0.1:8000/api/';
const JWTToken = localStorage.getItem('access_token');
const ActionVotes = async ({ poll_id, choice_id }) => {
  try {
    const dataVotes = await axios({
      method: 'post',
      url: `${UrlApi}poll/${poll_id}/vote/${choice_id}`,
      headers: {
        Authorization: `Bearer ${JWTToken}`,
      },
    });
    return dataVotes;
  } catch (error) {
    console.log('error', error);
    return 'error';
  }
};

export { ActionVotes };
