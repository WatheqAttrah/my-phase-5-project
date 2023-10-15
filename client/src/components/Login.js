import React from "react"
import { useFormik } from 'formik'
import * as yup from 'yup'

function Login({ setUser }) {

  const formSchema = yup.object().shape({
    username: yup.string().required('Must enter username'),
    password: yup.string().required('Must enter password')
  })

  const formik = useFormik({
    initialValues: {username: '', password: '',},

    validationSchema: formSchema,

    onSubmit: (values) => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
      })
      .then(r=> {if (r.ok) {
        r.json().then(u=> setUser(u))
      }
    })
    }
  })

  return (
    <div>
      <h1>User Login</h1>
      <br />
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='username'>username</label>
        <br />
        <input id='username' name='username' type='text' onChange={formik.handleChange} value={formik.values.username}/>
        <p style={{ color: 'red' }}>{formik.errors.username}</p>

        <label htmlFor='password'>password</label>
        <br />
        <input id='password' name='password' type='password' onChange={formik.handleChange} value={formik.values.password}/>
        <p style={{ color: 'red' }}>{formik.errors.password}</p>

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login