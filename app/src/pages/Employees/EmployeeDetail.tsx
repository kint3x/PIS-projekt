import { useParams} from "react-router-dom";
import useFetch from "../../utils/useFetch";
import React from 'react'
import './EmployeeDetail.css';
import {useState, useEffect} from 'react'

const EmployeeDetail = () => {

  type EmployeeParams = {
    id: string;
  };

  interface Employee {
    id: string;
    name: string;
    username: string;
    type: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
  }

  const { id } = useParams<EmployeeParams>();
  const { data:employee, error, isPending } = useFetch('http://localhost:8000/employees/' + id);
  
  return (
      <div className="employee-detail">
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div> }
        { employee && (
          <div className='employee-detail-container'>
            <div className="card">
                 <img src="/photo.png" className="photo"/>
              <div className='labels-container'>
                <p>Name: {employee['name']}</p>
                <p>Username: {employee['username']}</p>
                <p>Type: {employee['type']}</p>
                <p>Date of birth: {employee['dateOfBirth']}</p>
                <p>Phone: {employee['phone']}</p>
                <p>Email: {employee['email']}</p>
                <p>Address: {employee['address']}</p>
              </div>
            </div>
          </div>
      )}
      </div>
  );
}
 
export default EmployeeDetail;