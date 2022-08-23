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
  const [newTweet, setNewTweet] = useState('');

  const getTweets = () => { axios.get('http://localhost:3001/tweets').then((r) => setTweets(r.data)); };

  useEffect(getTweets, []);

  const createNewTweet = () => {
    axios.post('http://localhost:3001/tweets', {
      id: `${+tweets[tweets.length - 1].id + 1}`,
      author_id: authContext?.user?.id,
      text: newTweet,
    }).then(() => {
      setNewTweet('');
      getTweets();
    });
  };

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
        {authContext?.user && (
          <div className="create-tweet">
            <textarea name="tweet" value={newTweet} onChange={(e) => setNewTweet(e.target.value)} />
            <button type="button" onClick={createNewTweet}>Tweet</button>
          </div>
        )}
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </main>
    </div>
  );
}
