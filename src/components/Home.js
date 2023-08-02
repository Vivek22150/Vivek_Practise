
import React, { Fragment } from 'react';
import {Button,Table} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Employee from './Employee';
import Add from './Add';
import {Link,useNavigate} from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';


const Home = () => {
    const initialValues = {
      email: '',
      checkbox: false,
       radio: '',
       select: '',
       file: null,
       multiSelect: []
    };
  
    const validationSchema = Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
    });
  
    const onSubmit = (values) => {
      // Handle form submission here
      console.log(values);
    };
  
    const formik = useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });
  
    return (
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && (
            <div>{formik.errors.email}</div>
          )}
        </div>
        
      {/* <div>
        <label htmlFor="checkbox">Checkbox:</label>
        <input
          type="checkbox"
          id="checkbox"
          name="checkbox"
          checked={formik.values.checkbox}
          onChange={formik.handleChange}
        />
      </div> */}

      <div>
        <label htmlFor="radio">Radio:</label>
        <div>
          <input
            type="radio"
            id="radioOption1"
            name="radio"
            value="option1"
            checked={formik.values.radio === 'option1'}
            onChange={formik.handleChange}
          />
          <label htmlFor="radioOption1">Option 1</label>
        </div>
        <div>
          <input
            type="radio"
            id="radioOption2"
            name="radio"
            value="option2"
            checked={formik.values.radio === 'option2'}
            onChange={formik.handleChange}
          />
          <label htmlFor="radioOption2">Option 2</label>
        </div>
      </div>

      <div>
        <label htmlFor="select">Select:</label>
        <select
          id="select"
          name="select"
          value={formik.values.select}
          onChange={formik.handleChange}
        >
          <option value="">Select an option</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>


      <div>
        <label htmlFor="file">File Upload:</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={(event) => {
            formik.setFieldValue('file', event.currentTarget.files[0]);
          }}
        />
      </div>

      <div>
        <label htmlFor="multiSelect">Multi-Select:</label>
        <select
          multiple
          id="multiSelect"
          name="multiSelect"
          value={formik.values.multiSelect}
          onChange={formik.handleChange}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>      

        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default Home;
  
