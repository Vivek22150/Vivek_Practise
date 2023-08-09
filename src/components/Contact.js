import React, { Fragment, useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Contact.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  const { id } = useParams();
  const location = useLocation();
  const isEdit = id && location.state && location.state.contactData;

  const initialValues = {
    fullName: isEdit ? location.state.contactData.fullName : '',
    mobileNo: isEdit ? location.state.contactData.mobileNo : '',
    email: isEdit ? location.state.contactData.email : '',
    subject: isEdit ? location.state.contactData.subject : '',
    message: isEdit ? location.state.contactData.message : '',
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
      if (isEdit) {
        const response = await axios.put(`http://localhost:5555/api/updateCoontact`, { id,
        ...values});
       
        console.log(response.data);
        alert('Contact-Us Updated Successfully');
      } else {
        const response = await axios.post('http://localhost:5555/api/contactUs', values);
        console.log(response.data);
      }
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
    <div className="contact-form">
      <div className="contact-card">
        <h1>{isEdit ? 'Edit Contact Page' : 'Add Contact Page'}</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
            <div className="form-group">
              <label htmlFor="fullName" className="label">
                Full Name:
              </label>
              <Field type="text" id="fullName" name="fullName" className="form-control" />
              <ErrorMessage name="fullName" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNo" className="label">
                Mobile No.:
              </label>
              <Field type="text" id="mobileNo" name="mobileNo" className="form-control" />
              <ErrorMessage name="mobileNo" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="label">
                Email:
              </label>
              <Field type="text" id="email" name="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="subject" className="label">
                Subject:
              </label>
              <Field type="text" id="subject" name="subject" className="form-control" />
              <ErrorMessage name="subject" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="label">
                Message:
              </label>
              <Field as="textarea" id="message" name="message" className="form-control" />
              <ErrorMessage name="message" component="div" className="error-message" />
            </div>
            <div className="form-group submit-button">
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                Update
              </button>
            </div>
          </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
