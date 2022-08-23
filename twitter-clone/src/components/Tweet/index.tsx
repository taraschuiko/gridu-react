import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TweetObject } from '../Home';

export default function Tweet({ tweet }: {tweet: TweetObject}) {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${tweet.author_id}`).then((r) => setUserName(r.data.name));
  }, []);

  return (
    <div className="tweet">
      <div className="initials">
        {userName ? userName.match(/\b(\w)/g)!.join('') : ''}
      </div>
      <div className="tweet__content">
        <p className="tweet__author">{userName}</p>
        <p dangerouslySetInnerHTML={{ __html: tweet.text }} />
      </div>
    </div>
  );
}
