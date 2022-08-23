import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Authentication from '../../contexts/Authentication';
import './style.scss';

export default function LogIn() {
  const authContext = useContext(Authentication.Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (authContext?.user) {
      navigate('/', { replace: true });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Username is required').min(1, 'Too short').max(512, 'Too long'),
      password: Yup.string().required('Password is required').min(8, 'Too short').max(256, 'Too long'),
    }),
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
        <input type="username" name="username" placeholder="Username" onChange={formik.handleChange} value={formik.values.username} className={formik.errors.username && 'invalid-field'} />
        <span>{formik.errors.username}</span>
        <input type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} className={formik.errors.password && 'invalid-field'} />
        <span>{formik.errors.password}</span>
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
