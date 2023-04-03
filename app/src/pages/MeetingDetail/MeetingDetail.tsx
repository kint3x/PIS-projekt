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
  }

  const { id } = useParams<MeetingParams>();
  const { data:meeting,  error, isPending } = useFetch('http://localhost:8000/meetings/' + id);

  
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
                 <textarea className='notes-textarea' value={meeting['notes']}/>
            </div>
          </div>
      )}
      </div>
  );
}
 
export default MeetingDetail;