import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Authentication from '../../contexts/Authentication';
import './style.scss';

export default function SignUp() {
  const authContext = useContext(Authentication.Context);

  const navigate = useNavigate();

  useEffect(() => {
    if (authContext?.user) {
      navigate('/', { replace: true });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
      fullname: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required('Email is required').email('Enter a valid email'),
      username: Yup.string().required('Username is required').min(1, 'Too short').max(512, 'Too long'),
      password: Yup.string().required('Password is required').min(8, 'Too short').max(256, 'Too long'),
      fullname: Yup.string().required('Full name is required').min(1, 'Too short').max(512, 'Too long'),
    }),
    onSubmit: (values) => {
      if (authContext) {
        authContext.signup(values.username, values.email);
        navigate('/', { replace: true });
      }
    },
  });

  return (
    <div className="signup">
      <form onSubmit={formik.handleSubmit}>
        <h1>Sign up</h1>
        <input type="email" name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} className={formik.errors.email && 'invalid-field'} />
        {formik.errors.email}
        <input type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} className={formik.errors.password && 'invalid-field'} />
        {formik.errors.password}
        <input type="text" name="username" placeholder="Username" onChange={formik.handleChange} value={formik.values.username} className={formik.errors.username && 'invalid-field'} />
        {formik.errors.username}
        <input type="text" name="fullname" placeholder="Full name" onChange={formik.handleChange} value={formik.values.fullname} className={formik.errors.fullname && 'invalid-field'} />
        {formik.errors.fullname}
        <button type="submit">Sign up</button>
      </form>
      <span>
        Already have an account?
        {' '}
        <Link to="/login">Log in</Link>
      </span>
    </div>
  );
}
