import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { me } from '../libs/MeAuth';
import { ActionVotes } from '../libs/VotesAuth';

function ShowPoll() {
  const [polls, setPoll] = useState([]);
  const [data, setData] = useState({});
  const [user, setUser] = useState([]);
  const [voting, setVoting] = useState([]);
  const [choiceId, setChoiceId] = useState();
  const [isVote, setIsVote] = useState(false);
  const [loadingVote, setLoadingVote] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const JWTToken = localStorage.getItem('access_token');
  const fetchData = async () => {
    const data = await me(JWTToken);
    setUser(data.data);
  };
  //get detail poll
  const getPoll = async () => {
    axios.get('http://127.0.0.1:8000/api/poll/' + id, { headers: { Authorization: `Bearer ${JWTToken}` } }).then((response) => {
      const poll = response.data;
      setPoll(poll);
      setData(response.data);
      console.log(poll);
    });
  };
  const vote = async () => {
    try {
      setLoadingVote(true);

      const result = await ActionVotes({
        poll_id: id,
        choice_id: choiceId,
      });
      // console.log(result.message);
      if (result.status) {
        setLoadingVote(false);
        alert('Sukses Voted');
        navigate(`/poll/${id}/vote/${choiceId}`);
      } else if (!result.status) {
        if (result.message == 'already vote') {
          alert('anda sudah pernah mengisi vote ini');
        } else {
          alert('ada beberapa kesalahan. tidak dapat menyimpan vote');
          console.log({ result });
        }
      }
    } catch (e) {
      setLoadingVote(true);
      console.log({ e });
    }
  };

  useEffect(() => {
    getPoll();
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      {!isVote ? (
        <div className="container">
          {polls.map((poll, i) => {
            return (
              <div className="row">
                {console.log(poll.title)}

                <div className="card">
                  <h1>{poll.title}</h1>
                  <h5>
                    created_by:{poll.creator} | deadline:{poll.deadline}
                  </h5>
                  <div className="form-check">
                    {poll.choices.map((choice, i) => {
                      return (
                        <div key={i}>
                          <>
                            <input className="form-check-input" type="radio" name="flexRadioDefault" id={i} value={choice?.id} onChange={(e) => setChoiceId(e.target.value)} />
                            {choice?.choice}
                            <label className="form-check-label ms-1" htmlFor={i}></label>
                          </>
                        </div>
                      );
                    })}
                  </div>
                  {user.role === 'user' ? (
                    <button type="button" className="btn" onClick={vote}>
                      Votes
                    </button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default ShowPoll;
