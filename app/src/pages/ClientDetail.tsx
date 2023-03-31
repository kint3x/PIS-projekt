import { useParams} from "react-router-dom";
import useFetch from "../utils/useFetch";
import React from 'react'
import './ClientDetail.css';
import {useState} from 'react'

const ClientDetail = () => {

  type ClientParams = {
    id: string;
  };

  interface Client {
    id: string;
    name: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
  }

  const { id } = useParams<ClientParams>();
  const { data:client, setData:setClient, error, isPending } = useFetch('http://localhost:8000/clients/' + id);

  // const [client, setClient] = useState(null)
  
  return (
      <div className="client-detail">
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div> }
        { client && (
          <div className='client-detail-container'>
            <div className="card">
                 <img src="/photo.png" className="photo"/>
              <div className='labels-container'>
                <p>Name: {client['name']}</p>
                <p>Date of birth: {client['dateOfBirth']}</p>
                <p>Phone: {client['phone']}</p>
                <p>Email: {client['email']}</p>
                <p>Address: {client['address']}</p>
              </div>
            </div>
            <div className='textarea-container'>
                 <textarea className='notes-textarea' value={client['notes']}/>
            </div>
          </div>
      )}
      </div>
  );
}
 
export default ClientDetail;