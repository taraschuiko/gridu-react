import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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

  const getTweets = () => { axios.get('http://localhost:3001/tweets').then((r) => setTweets(r.data)); };

  useEffect(getTweets, []);

  const formik = useFormik({
    initialValues: {
      newTweet: '',
    },
    validationSchema: Yup.object().shape({
      newTweet: Yup.string().required('Please enter your tweet').min(1, 'Too short').max(140, 'Too long'),
    }),
    onSubmit: ({ newTweet }, { resetForm }) => {
      axios.post('http://localhost:3001/tweets', {
        id: `${+tweets[tweets.length - 1].id + 1}`,
        author_id: authContext?.user?.id,
        text: newTweet,
      }).then(() => {
        resetForm();
        getTweets();
      });
    },
  });

  return (
    <div className="home">
      <Header />
      <main>
        {authContext?.user && (
          <form className="create-tweet" onSubmit={formik.handleSubmit}>
            <textarea name="newTweet" value={formik.values.newTweet} onChange={formik.handleChange} className={formik.errors.newTweet && 'invalid-field'} />
            <span color="red">{formik.errors.newTweet}</span>
            <button type="submit">Tweet</button>
          </form>
        )}
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} />
        ))}
      </main>
    </div>
  );
}
