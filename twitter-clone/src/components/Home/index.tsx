import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Authentication from '../../contexts/Authentication';
import './style.scss';
import twitterIcon from '../../assets/twitter.svg';
import userIcon from '../../assets/user.svg';

export default function LogIn() {
  const authContext = useContext(Authentication.Context);

  return (
    <div className="home">
      <header>
        <div className="title">
          <img src={twitterIcon} alt="Twitter icon" />
          <h1>Another Twitter Clone</h1>
        </div>
        {authContext?.user ? (
          <div className="user">
            <span>{authContext.user.name}</span>
            <img src={userIcon} alt="user" />
          </div>
        ) : (
          <div className="auth">
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </header>
    </div>
  );
}
