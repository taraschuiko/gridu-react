import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Authentication from '../../contexts/Authentication';
import './style.scss';
import Tweet from '../Tweet';
import Header from '../Header';

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
      <Header />
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
