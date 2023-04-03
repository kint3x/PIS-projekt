import { useParams} from "react-router-dom";
import useFetch from "../../utils/useFetch";
import React from 'react'
import './MeetingDetail.css';
import {useState, useEffect} from 'react'

const MeetingDetail = () => {

  type MeetingParams = {
    id: string;
  };

  interface Meeting {
    id: string;
    client: string;
    employee: string;
    subject: string;
    dateStart: string;
    dateEnd: string;
    notes: string;

    setNotes: (value: string) => void;
  }

  const { id } = useParams<MeetingParams>();
  // const { data:client, setData:setClient, error, isPending } = useFetch('http://localhost:8000/meeting/' + id);

  // const [client, setClient] = useState(null)

  const [meeting, setMeeting] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch('http://localhost:8000/meetings/' + id)
      .then(res => {
        if (!res.ok) { // error coming back from server
          throw Error('could not fetch the data for that resource');
        } 
        return res.json();
      })
      .then(data => {
        setIsPending(false);
        setMeeting(data);
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
      <div className="meeting-detail">
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div> }
        { meeting && (
          <div className='meeting-detail-container'>
            <div className="card">
              <div className='labels-container'>
                <p>Client: {meeting['client']}</p>
                <p>Employee: {meeting['employee']}</p>
                <p>Subject: {meeting['subject']}</p>
                <p>Meeting start: {meeting['dateStart']}</p>
                <p>Meeting end: {meeting['dateEnd']}</p>
              </div>
            </div>
            <div className='textarea-container'>
                 {/* <textarea className='notes-textarea' value={client['notes']} onChange={handleChange}/> */}
                 <textarea className='notes-textarea' value={meeting['notes']}/>
            </div>
          </div>
      )}
      </div>
  );
}
 
export default MeetingDetail;