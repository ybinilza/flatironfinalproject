import React from 'react';
import './SignupPage.css';
import { useFormik } from 'formik';
import * as yup from "yup";

function SignupPage({ onLogin }) {

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter a username").max(15),
    email: yup.string().email("Invalid email").required("Must enter an email"),
    password: yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      //console.log(formik)
      console.log(values)

      try {
        const response = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const user = await response.json();
          onLogin(user);
        } else {
          const errorData = await response.json();
          formik.setErrors(errorData.errors || {});
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    },
  });

  return (
    <div>
      <div className="signup-container">
        <form onSubmit={formik.handleSubmit}>
          <h2>Sign Up</h2>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            autoComplete="off"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          <div>{formik.errors.username}</div>

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <div>{formik.errors.email}</div>

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <div>{formik.errors.password}</div>

          <button type="submit" disabled={formik.isSubmitting}>
            Sign Up
          </button>
        </form>
      </div>
      {formik.isSubmitting && <p>Loading...</p>}
      {Object.keys(formik.errors).length > 0 && (
        <div>
          <p>Error:</p>
          <ul>
            {Object.keys(formik.errors).map((fieldName, index) => (
              <li key={index}>{formik.errors[fieldName]}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SignupPage;
