import React, { useState } from "react"
import { useFormik } from 'formik'
import * as yup from 'yup'

function Signup({ setUser }) {
    const [isTaken, setIsTaken] = useState(false)
    const [error , setError ]= useState(null)

    // Validation using yup schema builder
    const formSchema = yup.object().shape({
        username: yup.string().required('Username is required').max(15, '15 characters max'),
        email: yup.string().email('Invalid').required('Must enter email'),
        password: yup.string().min(6, 'at least 6 characters').required('Password is required'),
        confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    })

    const formik = useFormik({
        initialValues: { username: '', email: '', password: '', confirm: '', },

        validationSchema: formSchema,

        onSubmit: (values) => {
            // same shape as initial values
            // console.log(values);
            setError(null);
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
            .then(response => {
                if (response.ok) {
                    response.json()
                    .then(user => setUser(user))
                } else if (response.status === 400) {
                    setIsTaken(true)
                } else {
                    setError('An error occurred during sign-up.'); // Handle other errors
                }
            })
            .catch(error => {
                console.error('Sign-up error:', error);
                setError('An error occurred during sign-up.');
            });
        }
    });


    const handleResetForm = () => {
        formik.resetForm()
        setIsTaken(false)
        setError(null);
    };

    return (
        <div className="form-group">
            <h1>User Signup Form</h1>
            <br />
            <form onSubmit={formik.handleSubmit}>
                <label 
                className='lable'  
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
                value={formik.values.username} 
                />
                <p style={{ color: 'red' }}>{formik.errors.username}</p>

                <label htmlFor='email'>Email</label>
                <br />
                <input
                className='input' 
                id='email' 
                name='email' 
                type='email'
                onChange={formik.handleChange} 
                value={formik.values.email} />
                <p style={{ color: 'red' }}>{formik.errors.email}</p>

                <label htmlFor='password'>Password</label>
                <br />
                <input
                className='input' 
                id='password' 
                name='password' 
                type='password' 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value={formik.values.password} 
                />
                <p style={{ color: 'red' }}>{formik.errors.password}</p>

                <label htmlFor='password_confirmation'>Confirm Password</label>
                <br />
                <input
                className='input' 
                id='confirm' 
                name='confirm' 
                type='password' 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                value={formik.values.confirm} />
                <p style={{ color: 'red' }}>{formik.errors.confirm}</p>

                <button className='button' type='submit'>SignUp</button>
                {isTaken && <p style={{ color: 'red' }}>Username is already taken</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button  className='button' type="button" onClick={handleResetForm}>Reset Form</button>
            </form>
        </div>
    )
}

export default Signup