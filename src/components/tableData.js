import React, { Fragment, useState, useEffect } from 'react';
import { Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; 




const TableData = () => {
    const [contactList, setContactList] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
  
    const fetchContactList = async () => {
      try {
        const response = await axios.post('http://localhost:5555/api/fetchallcontact', {
          limit: 5,
          page: currentPage,
        });
  
        const { contact, totalPages } = response.data;
        setContactList(contact);
        setTotalPages(totalPages);
      } catch (error) {
        console.error('Error fetching contact list:', error);
      }
    };
  
    useEffect(() => {
      fetchContactList();
    }, [currentPage]); // Fetch data whenever the current page changes
  
    const handleSearch = (event) => {
      setSearchKeyword(event.target.value);
      // You can add additional logic here to filter the data based on the searchKeyword
    };
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const AddPeople = () => {
        navigate('/add-contact');
    };

  // Inside the TableData component
const editContact = (contactId, contactData) => {
    navigate(`/edit-contact/${contactId}`, { state: { contactData } });
  };
  
      
      
    

    const deleteContact = (id) => {
        confirmAlert({
          title: 'Are you sure?',
          message: 'Do you want to delete this entry?',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                // Make the delete API call here
                axios
                  .post('http://localhost:5555/api/deleteContact', {
                    data: { id }, // Send the id in the request body
                  })
                  .then((res) => {
                    if (res.data.message) {
                        fetchContactList();
                      // Handle the success case here, if needed
                    }
                  })
                  .catch((error) => {
                    // Handle any errors that occurred during the API call
                    console.error('Error deleting contact:', error);
                  });
              },
            },
            {
              label: 'Cancel',
            },
          ],
        });
      };
    
  
  
    return (
      <Fragment>
        <h4 >Contact-Us</h4>
        <div className="card">
          <div className="card-body">
            <p className="card-description d-flex justify-content-between">
              <div className="d-flex align-items-center position-relative my-1">
                <input
                  type="text"
                  data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder="Search.."
                  value={searchKeyword}
                  onChange={handleSearch}
                />
              </div>
              <button type="button" className="btn btn-primary" onClick={AddPeople}>
                Add Contact
              </button>
            </p>
            <div className="table-responsive">
              <table className="table table-striped gy-7 gs-7">
                <thead>
                  <tr className="fw-bold fs-6 text-gray-800 border-bottom-2 border-gray-200">
                    <th className="min-w-200px">Id</th>
                    <th className="min-w-400px">Full Name</th>
                    <th className="min-w-100px">Email</th>
                    <th className="min-w-200px">Mobile No.</th>
                    <th className="min-w-200px">Subject</th>
                    <th className="min-w-200px">Message</th>
                    <th className='fw-bolder'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contactList.map((contact) => (
                    <tr key={contact._id}>
                      <td>{contact._id}</td>
                      <td>{contact.fullName}</td>
                      <td>{contact.email}</td>
                      <td>{contact.mobileNo}</td>
                      <td>{contact.subject}</td>
                      <td>{contact.message}</td>
                      
                      <td>
                                                    <div className='d-flex '>
                                                   
<div style={{ cursor: 'pointer' }} onClick={() => editContact(contact._id, contact)}>
  <a href="#" className="btn btn-success">Edit</a>
</div>



                                                        <div style={{ cursor: 'pointer', marginLeft: '20px' }} onClick={() => deleteContact(contact._id)}> <a href="#" className="btn btn-dark">Delete</a>
                                                        </div>

                                                    </div>
                                                </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </Fragment>
    );
  };
  
  export default TableData;
