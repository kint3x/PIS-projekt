import React from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';


import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

import { loadRequest as loadMeetings } from '../../store/ducks/meeting/actions';
import { createRequest as addMeeting } from '../../store/ducks/meeting/actions';

import { updateRequest as updateMeeting } from '../../store/ducks/meeting/actions';

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

    
    const meetings = useSelector((state: AppState) => state.meeting.data );
    const clients = useSelector((state: AppState) => state.client.data );
    const loading = useSelector((state: AppState) => state.meeting.loading);
    const error = useSelector((state: AppState) => state.meeting.error);
    const errMsg = useSelector((state: AppState) => state.meeting.errMsg);

    useEffect(() => {
        dispatch(loadMeetings('all'));
        dispatch(loadClients('all'));
      }, [dispatch]);   


    useEffect(()=>{
        renderMeetings();
    },[loading]);


    const [events,setEvents] = useState<any>([]);
    const [show_add_dialog,setShowAddDialog] = useState<any>(false);

    const initialState = {
        heading: "",
        date: "",
        subject: "",
        start: null,
        end: null,
        notes: "",
        client: 0,
      };

    const [add_dialog_data, setAddDialogData] = useState<any>(initialState);

    const [modal_err_msg, setModalErr] = useState<any>({visible: "hidden", msg: ""});


    function stringToColor(str: string): string {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const hex = Math.abs(hash).toString(16).substring(0, 6);
      return `#${'0'.repeat(6 - hex.length)}${hex}`;
    }

    function renderMeetings(){
        const meet_arr =  Object.values(meetings);
        const fin_arr : any = [];
        for (const val of meet_arr) {
            console.log(val);
            fin_arr.push({ title: val.subject, color: stringToColor(val.client.name) , date: val.start , meeting_id: val.id});
            }
        setEvents(fin_arr);  
    }

    function handleDateClick(info: any) {
        const clickedDate = info.dateStr;
        setAddDialogData({...add_dialog_data,date: clickedDate, heading: "Add meeting", adding: true})
        setShowAddDialog(true);
      }


    function onAddMeeting(){
        
        const employeeId = localStorage.getItem('employeeId');
        const authorId = employeeId ? parseInt(employeeId) : 0; // default to 0 if employeeId is null
        if(authorId == 0) return;

        const date_sel = add_dialog_data.date;
        const start = format(add_dialog_data.start,"HH:mm:00");
        const end = format(add_dialog_data.end,"HH:mm:00");

        const DataToSend : MeetingData = {
            subject: add_dialog_data.subject,
            start: date_sel+"T"+start,
            end: date_sel+"T"+end,
            notes: add_dialog_data.notes,
            employeeIds: [],
            clientId: add_dialog_data.client,
            authorId: authorId
        }
        
        dispatch(addMeeting(DataToSend));
        setShowAddDialog(false);
        setAddDialogData(initialState);
    }

    function onEditMeeting(){
        const employeeId = localStorage.getItem('employeeId');
        const authorId = employeeId ? parseInt(employeeId) : 0; // default to 0 if employeeId is null
        if(authorId == 0) return;

        const date_sel = add_dialog_data.date;
        const start = format(add_dialog_data.start,"HH:mm:00");
        const end = format(add_dialog_data.end,"HH:mm:00");

        const DataToSend : MeetingData = {
            subject: add_dialog_data.subject,
            start: date_sel+"T"+start,
            end: date_sel+"T"+end,
            notes: add_dialog_data.notes,
            employeeIds: [],
            clientId: add_dialog_data.client,
            authorId: authorId
        }

        dispatch(updateMeeting(add_dialog_data.meeting_id,DataToSend))
        if(!loading && !error){
            setShowAddDialog(false);
            setAddDialogData(initialState);
        }
    }

    function handleTimeClick(ev: any){
        const meeting_id = ev.event._def.extendedProps.meeting_id;
        const sel_meeting = meetings[meeting_id];
        const g_date = format((new Date(sel_meeting.start)),"yyyy-MM-dd");

        setAddDialogData({...add_dialog_data, heading: "Edit Meeting", adding: false,
        subject: sel_meeting.subject,
        start: new Date(sel_meeting.start),
        end: new Date(sel_meeting.end),
        date: g_date,
        notes : sel_meeting.notes,
        client: sel_meeting.client.id,
        meeting_id : meeting_id
        });
        
        setShowAddDialog(true);
    }

    return (
        <>
        <div className='page-heading'><h1>Meetings</h1><br /></div>
        <div className={error ? "error visible" : "hidden"}>
            <Message severity="error" text={errMsg.toString()} />
        </div>
        <FullCalendar

            plugins={[ dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            dateClick={handleDateClick}
            eventClick={handleTimeClick}
            
        />
        
        <Dialog header={add_dialog_data.heading+" "+add_dialog_data.date} className="add-product" visible={show_add_dialog} style={{ width: '50vw' }} 
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
            <Calendar  timeOnly={true} value={add_dialog_data.start} onChange={(e) => setAddDialogData({...add_dialog_data,start: e.value})}/>
            <span className="p-inputgroup-addon">Time to:</span>
            <Calendar  timeOnly={true} value={add_dialog_data.end} onChange={(e) => setAddDialogData({...add_dialog_data,end: e.value})} />
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

          <Button label="Submit" severity="success" onClick={ add_dialog_data.adding ? onAddMeeting : onEditMeeting} />
        </Dialog>
        </>
    );
    
  
}

export default Meetings;