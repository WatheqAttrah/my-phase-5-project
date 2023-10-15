import React, { useState } from "react"
import { useFormik } from 'formik'
import * as yup from 'yup'

function Login({ setUser }) {
  const [error, setError] = useState(null);

  const formSchema = yup.object().shape({
    username: yup.string().required('Must enter username'),
    password: yup.string().required('Must enter password')
  })

  const formik = useFormik({
    initialValues: { username: '', password: '', },

    validationSchema: formSchema,

    onSubmit: (values) => {
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
        .then(response => {
          if (response.ok) {
            response.json().then(user => setUser(user))
          } else {
            // Handle errors here
            setError('Login failed. Please check your credentials.');
          }
        })
        .catch(error => {
          console.error('Login error:', error);
          setError('An error occurred while trying to log in.');
        });
    }
  });

  return (
    <div className="form-group">
      <h1>User Login</h1>
      <br />
      <form onSubmit={formik.handleSubmit}>

        <label
          className='label'
          htmlFor='username'>
          Username
        </label>
        <br />
        <input
          className='input'
          id='username'
          name='username'
          type='text'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        <p style={{ color: 'red' }}>{formik.errors.username}</p>

        <label
          className='label'
          htmlFor='password'>
          Password
        </label>
        <br />
        <input
          className='input'
          id='password' name='password'
          type='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        <p style={{ color: 'red' }}>{formik.errors.password}</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}


        <button className='button' type='submit'>
          Login
        </button>
      </form>
    </div>
  )
}

export default Login