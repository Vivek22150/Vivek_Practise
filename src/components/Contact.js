import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import "bootstrap/dist/css/bootstrap.min.css";
import clsx from 'clsx';
import * as Yup from 'yup';
import axios from 'axios';

const Contact = () => {
  const initialValues = {
    fullName: '',
    mobileNo: '',
    email: '',
    subject: '',
    message: '',
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    mobileNo: Yup.string().required('Mobile No. is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:5555/api/contactUs', values);
      console.log(response.data); // The API response

      // Show success message to the user (you can use a toast or any other UI component)
      alert('Contact-Us Saved Successfully');
      navigate('/');
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Add Contact Page</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="fullName">Full Name:</label>
              <Field type="text" id="fullName" name="fullName" />
              <ErrorMessage name="fullName" component="div" />
            </div>
            <div>
              <label htmlFor="mobileNo">Mobile No.:</label>
              <Field type="text" id="mobileNo" name="mobileNo" />
              <ErrorMessage name="mobileNo" component="div" />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <Field type="text" id="email" name="email" />
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <label htmlFor="subject">Subject:</label>
              <Field type="text" id="subject" name="subject" />
              <ErrorMessage name="subject" component="div" />
            </div>
            <div>
              <label htmlFor="message">Message:</label>
              <Field as="textarea" id="message" name="message" />
              <ErrorMessage name="message" component="div" />
            </div>
            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Contact;
