import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import Authentication from '../../contexts/Authentication';
import './style.scss';

export default function LogIn() {
  const authContext = useContext(Authentication.Context);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      if (authContext) {
        authContext.login(values.username);
        navigate('/', { replace: true });
      }
    },
  });

  return (
    <div className="login">
      <form onSubmit={formik.handleSubmit}>
        <h1>Log in</h1>
        <input type="username" name="username" placeholder="Username" onChange={formik.handleChange} value={formik.values.username} />
        <input type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} />
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
