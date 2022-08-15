import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
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
        <input type="email" name="email" placeholder="Email" onChange={formik.handleChange} value={formik.values.email} />
        <input type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} />
        <input type="text" name="username" placeholder="Username" onChange={formik.handleChange} value={formik.values.username} />
        <input type="text" name="fullname" placeholder="Full name" onChange={formik.handleChange} value={formik.values.fullname} />
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
