import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import twitterIcon from '../../assets/twitter.svg';
import Authentication from '../../contexts/Authentication';
import UserIcon from '../UserIcon';
import './style.scss';

export default function Header() {
  const authContext = useContext(Authentication.Context);
  return (
    <header>
      <div className="title">
        <img src={twitterIcon} alt="Twitter icon" />
        <h1>Another Twitter Clone</h1>
      </div>
      {authContext?.user ? (
        <div className="user">
          <span>{authContext.user.name}</span>
          <UserIcon userName={authContext.user.name} />
        </div>
      ) : (
        <div className="auth">
          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      )}
    </header>
  );
}
