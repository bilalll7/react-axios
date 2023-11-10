import React from 'react';
import { getAllPolls } from '../libs/PollsAuth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { me } from '../libs/MeAuth';
import axios from 'axios';
import Navbar from '../components/Navbar';
function Polls() {
  const [polls, setPoll] = useState([]);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const JWTToken = localStorage.getItem('access_token');
  const fetchData = async () => {
    const data = await me(JWTToken);
    setUser(data.data);
  };

  const LoadDetail = (id) => {
    navigate('/poll/' + id);
  };
  const deletePoll = (id) => {
    if (window.confirm('Apakah anda yakin ingin menghapus data?')) {
      axios.delete('http://127.0.0.1:8000/api/poll/' + id, { headers: { Authorization: `Bearer ${JWTToken}` } }).then((response) => {
        alert('Berhasil Menghapus Poll');
        window.location.reload();
        const poll = response.data;
        setPoll(poll);
        console.log(poll);
      });
    }
  };
  const getPoll = async () => {
    const getAllPoll = await getAllPolls(JWTToken);
    setPoll(getAllPoll.data);
    console.log(getAllPoll.data);
  };
  useEffect(() => {
    getPoll();
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        {polls && typeof polls != 'string' ? (
          Object.entries(polls).map(([key, subject], i) => (
            <div className="row">
              <div className="card">
                <h1>{subject.title}</h1>
                <h5>
                  created_by:{subject.creator} | deadline:{subject.deadline}
                </h5>
                <p>{subject.description}</p>
                <button type="button" className="btn" onClick={() => LoadDetail(subject.id)}>
                  Votes
                </button>
              </div>
            </div>
          ))
        ) : polls ? (
          <p>Data Poll Belum Ada</p>
        ) : (
          <p>loading</p>
        )}
      </div>
    </>
  );
}

export default Polls;
