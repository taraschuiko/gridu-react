import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Authentication from '../../contexts/Authentication';
import './style.scss';
import twitterIcon from '../../assets/twitter.svg';
import Tweet from '../Tweet';

export type TweetObject = {
  id: string,
  author_id: string,
  text: string
}

export default function LogIn() {
  const authContext = useContext(Authentication.Context);
  const [tweets, setTweets] = useState<TweetObject[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3001/tweets').then((r) => setTweets(r.data));
  }, []);

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
            <div className="initials">
              {authContext.user.name.match(/\b(\w)/g)!.join('')}
            </div>
          </div>
        ) : (
          <div className="auth">
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </header>
      <main>
        <div className="create-tweet">
          <textarea name="tweet" />
          <button type="button">Tweet</button>
        </div>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </main>
    </div>
  );
}
