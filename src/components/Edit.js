import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Contact.css';
import {useLocation} from 'react-router'

const Edit = () => {
    const location = useLocation()
    const [contactData, setContactData] = useState(null);
    const navigate = useNavigate(); // Hook for navigation
  
    const contactId = location.pathname.split('/').pop();

  useEffect(() => {
    console.log(contactData)
    if (location.state && location.state.contactData) {
      setContactData(location.state.contactData);
    }
  }, [contactId]);

  const initialValues = {
    fullName: contactData ? contactData.fullName : '',
    mobileNo: contactData ? contactData.mobileNo : '',
    email: contactData ? contactData.email : '',
    subject: contactData ? contactData.subject : '',
    message: contactData ? contactData.message : '',
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    mobileNo: Yup.string().required('Mobile No. is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const apiUrl = 'http://localhost:5555/api/updateContact';
      const requestData = {
        id: contactData._id,
        ...values,
      };

      const response = await axios.put(apiUrl, requestData);
      console.log(response.data);

      alert('Contact-Us Updated Successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating contact:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-form">
      <div className="contact-card">
        <h1>{contactData ? 'Edit Contact' : 'Add Contact'}</h1>
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

export default Edit;
