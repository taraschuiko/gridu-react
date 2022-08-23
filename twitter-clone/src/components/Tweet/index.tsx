import axios from 'axios';
import React, { useEffect, useState } from 'react';
import sanitizeHtml from 'sanitize-html';
import { TweetObject } from '../Home';
import UserIcon from '../UserIcon';
import './style.scss';

export default function Tweet({ tweet }: {tweet: TweetObject}) {
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${tweet.author_id}`).then((r) => setUserName(r.data.name));
  }, []);

  return (
    <div className="tweet">
      {userName && <UserIcon userName={userName} />}
      <div className="tweet__content">
        <p className="tweet__author">{userName}</p>
        <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(tweet.text) }} />
      </div>
    </div>
  );
}
