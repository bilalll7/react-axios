import React from 'react';

function Navbar() {
  return (
    <>
      <nav className="container">
        <div className="wrapper-menu">
          <div className="left-menu">
            <h2>
              Yuk <span>Pilih</span>
            </h2>
          </div>
          <ul className="right-menu flex">
            <li>
              <a href="/poll">Home</a>
            </li>
            <li>
              <a href="/create-poll">Create</a>
            </li>
            <li>
              <a href="/reset-password">ResetPassword</a>
            </li>
            <li>
              <a href="/">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
