import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import './style.scss';

export default function LogIn() {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="login">
      <form onSubmit={formik.handleSubmit}>
        <h1>Log in</h1>
        <input type="username" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Log in</button>
      </form>
      <span>
        Don&apos;t have an account?
        {' '}
        <Link to="/signup">Sign up</Link>
      </span>
    </div>
  );
}
