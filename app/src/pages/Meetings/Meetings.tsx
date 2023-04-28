import React from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';



import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

import { loadRequest as loadMeetings } from '../../store/ducks/meeting/actions';
import { createRequest as addMeeting } from '../../store/ducks/meeting/actions';

import { loadRequest as loadClients } from '../../store/ducks/client/actions';
import { MeetingData } from "../../store/ducks/meeting/types";
import { AppState } from '../../store';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import { Calendar } from "primereact/calendar";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { format } from "date-fns";


const Meetings = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadMeetings('all'));
        dispatch(loadClients('all'));
        
      }, [dispatch]);   

    const meetings = useSelector((state: AppState) => state.meeting.data );
    const clients = useSelector((state: AppState) => state.client.data );

    const loading = useSelector((state: AppState) => state.meeting.loading);
    const error = useSelector((state: AppState) => state.meeting.error);
    const errMsg = useSelector((state: AppState) => state.meeting.errMsg);

    const [events,setEvents] = useState<any>([]);
    const [show_add_dialog,setShowAddDialog] = useState<any>(false);

    const initialState = {
        subject: "",
        start: null,
        end: null,
        notes: "",
        client: 0,
      };

    const [add_dialog_data, setAddDialogData] = useState<any>(initialState);

    const [modal_err_msg, setModalErr] = useState<any>({visible: "hidden", msg: ""});

    function handleDateClick(info: any) {
        const clickedDate = info.dateStr;
        setAddDialogData({...add_dialog_data,date: clickedDate})
        setShowAddDialog(true);
        // You can do anything with the clicked date here
        console.log('Clicked on: ', clickedDate);
        setEvents([{title: "Test", date:"2023-04-28"}])
      }


    function onAddMeeting(){
        
        const employeeId = localStorage.getItem('employeeId');
        const authorId = employeeId ? parseInt(employeeId) : 0; // default to 0 if employeeId is null
        if(authorId == 0) return;

        const date_sel = add_dialog_data.date;
        const time_from = format(add_dialog_data.time_from,"HH:mm:00");
        const time_to = format(add_dialog_data.time_to,"HH:mm:00");

        const DataToSend : MeetingData = {
            subject: add_dialog_data.subject,
            start: date_sel+"T"+time_from,
            end: date_sel+"T"+time_to,
            notes: add_dialog_data.notes,
            employeeIds: [],
            clientId: add_dialog_data.client,
            authorId: authorId
        }
        
        dispatch(addMeeting(DataToSend));
        setShowAddDialog(false);
    }

    return (
        <>
        <div className='page-heading'><h1>Meetings</h1><br /></div>
        <FullCalendar

            plugins={[ dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            
        />
        
        <Dialog header={"Add meeting "+add_dialog_data.date} className="add-product" visible={show_add_dialog} style={{ width: '50vw' }} 
        onHide={() => {setShowAddDialog(false); setAddDialogData(initialState)}}>
          <div className={modal_err_msg.visible}>
            <Message severity="error" text={modal_err_msg.msg} />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Subject</span>
            <InputText value={add_dialog_data.subject} placeholder="Subject" onChange={(e) => setAddDialogData({...add_dialog_data,subject: e.target.value})} />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Time from:</span>
            <Calendar  timeOnly={true} value={add_dialog_data.time_from} onChange={(e) => setAddDialogData({...add_dialog_data,time_from: e.value})}/>
            <span className="p-inputgroup-addon">Time to:</span>
            <Calendar  timeOnly={true} value={add_dialog_data.time_to} onChange={(e) => setAddDialogData({...add_dialog_data,time_to: e.value})} />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Client:</span>
            <Dropdown value={add_dialog_data.client} onChange={(e) => setAddDialogData({...add_dialog_data, client: e.value})} placeholder="Select a client"
                optionLabel="name" optionValue="id" options={Object.values(clients)} className="md:w-14rem" />
          </div>
          <span className="in-head"><h5>Notes</h5></span>
          <div className="p-inputgroup">
            
            <InputTextarea value={add_dialog_data.notes} onChange={(e) => setAddDialogData({...add_dialog_data, notes: e.target.value})} placeholder="Notes ..."/>
          </div>

          <Button label="Submit" severity="success" onClick={onAddMeeting} />
        </Dialog>
        </>
    );
    
  
}

export default Meetings;