import { useParams} from "react-router-dom";
import useFetch from "../../utils/useFetch";
import React from 'react'
import './ClientDetail.css';
import {useState, useEffect} from 'react'

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

    setNotes: (value: string) => void;
  }

  const { id } = useParams<ClientParams>();
  // const { data:client, setData:setClient, error, isPending } = useFetch('http://localhost:8000/clients/' + id);

  // const [client, setClient] = useState(null)

  const [client, setClient] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/clients/' + id)
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setClient(data);
        setError(null);
      })
      .catch(err => {
        // auto catches network / connection error
        setIsPending(false);
        setError(err.message);
      })
    }, 1000);
  }, [])

  // function handleChange (event:any) {
    // setNotes: (value: string) => void;
    // if (client !== null && client !== never)
      // client.setNotes(event.target.value);
    // setClient((prev) => ({...prev, notes:event.target.value}))
// };
  
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
                 {/* <textarea className='notes-textarea' value={client['notes']} onChange={handleChange}/> */}
                 <textarea className='notes-textarea' value={client['notes']}/>
            </div>
          </div>
      )}
      </div>
  );
}
 
export default ClientDetail;