import React from 'react';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { createPoll } from '../libs/CreatePollAuth';

function CreatedPoll() {
  const [loading, setLoading] = useState(false);

  const inputArr = [
    {
      type: 'text',
      id: 1,
      value: '',
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    const id = arr.length + 1;
    setArr((s) => {
      return [
        ...s,
        {
          type: 'text',
          id,
          value: '',
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const [dataPoll, setDataPoll] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const storePolling = async () => {
    try {
      setLoading(true);
      const choice = arr.map((item) => {
        return item.value;
      });
      const result = await createPoll({
        ...dataPoll,
        choices: choice,
      });
      console.log(result);

      if (result.status) {
        setLoading(false);
        setTimeout(() => {
          alert('sukses membuat polling');
          window.location.href = '/poll';
        }, 1000);
      } else if (!result.status) {
        alert('gagal membuat polling');
        window.location.href = '/create-poll';
      }
    } catch (e) {
      console.log({ e });
    }
  };
  const deleteInputChoise = async (e) => {
    const id = e.target.value - 1;

    let arrUpdate = arr;
    await arrUpdate.splice(id, 1);
    setArr(arrUpdate);
    setArr((s) => {
      return [...s];
    });
  };
  return (
    <>
      <Navbar />
      <div className="form">
        <h2>Create Poll</h2>
        <form className="form-wrapper">
          <div className="form-username">
            <label htmlFor="">Title:</label>
            <br />
            <input type="text" onChange={(e) => setDataPoll({ ...dataPoll, title: e.target.value })} />
          </div>
          <div className="form-desc">
            <label htmlFor="">Description:</label>
            <br />
            <input type="text" onChange={(e) => setDataPoll({ ...dataPoll, description: e.target.value })} />
          </div>
          <div className="form-deadline">
            <label htmlFor="">Deadline:</label>
            <br />
            <input type="datetime-local" onChange={(e) => setDataPoll({ ...dataPoll, deadline: e.target.value })} />
          </div>
          <div className="form-choices">
            <label htmlFor="">Choices:</label>
            <br />
            {arr.map((item, i) => {
              return (
                <div className="input-group mb-3" key={i}>
                  <input autoComplete="off" className="form-control" onChange={handleChange} value={item.value} id={i} type={item.type} size="16" />{' '}
                  <button className="" onClick={deleteInputChoise} value={++i}>
                    X
                  </button>
                </div>
              );
            })}
            <button type="button" onClick={addInput} className="">
              Add Choise (+)
            </button>
          </div>
          <button type="button" className="cta-link" onClick={storePolling}>
            Create
          </button>
        </form>
      </div>
    </>
  );
}
export default CreatedPoll;
