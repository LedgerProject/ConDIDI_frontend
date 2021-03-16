import React from 'react'; 
import { useFormik } from "formik"; 
import * as Yup from 'yup'; 


const SignUp = () => {

    const formik = useFormik({
        initialValues: {
          name: '', 
          email: '', 
          password: '', 
        }, 

        validationSchema: Yup.object({
          name: Yup.string()
            .min(2, 'Too short!')
            .max(15, 'Too long!')
            .required('Required'), 
          email: Yup.string().email('Invalid email').required('Required'), 
          password: Yup.string()
            .min(5, 'Too short!')
            .max(20, 'Too long!')
        }),

        onSubmit: values => {
            alert(JSON.stringify(values, null, 1)); 
            console.log(JSON.stringify(values)); 

            const requestOptions = {
              method: 'POST', 
              headers: {'Content type': 'application/json'},
              body: JSON.stringify({title: 'React POost Request Example'})
            }; 
            fetch('https://jsonplaceholder.typicode.com/todos/1', requestOptions)
              .then(response => response.json())
              .then(json => console.log(json))
        }, 
    }); 

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">name</label>
            <input
                id="name"
                name="name"
                type="name"
                onChange={formik.handleChange}
                value={formik.values.name}
            />
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.errors.password ? <div>{formik.errors.password}</div> : null}

            <button type="submit">Create User</button>

        </form>
      
    );
} 

export default SignUp; 