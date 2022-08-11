import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import './style.scss';

export default function SignUp() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
      fullname: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
        <button type="submit">Log in</button>
      </form>
      <span>
        Already have an account?
        {' '}
        <Link to="/login">Log in</Link>
      </span>
    </div>
  );
}
