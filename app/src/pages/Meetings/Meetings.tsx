import React from 'react'

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction';


import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

import { loadRequest as loadAllMeetings } from '../../store/ducks/meeting/actions';
import {loadMeetingsRequest as loadMeetings} from '../../store/ducks/employee/actions';

import { createRequest as addMeeting } from '../../store/ducks/meeting/actions';

import { updateRequest as updateMeeting } from '../../store/ducks/meeting/actions';

import { loadRequest as loadClients } from '../../store/ducks/client/actions';

import { loadClientRequest as loadEmpClient } from '../../store/ducks/employee/actions';

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
import { InputSwitch } from 'primereact/inputswitch';

const Meetings = () => {

    const dispatch = useDispatch();

    
    const meetings_all = useSelector((state: AppState) => state.meeting.data );
    const meetings = useSelector((state: AppState) => state.employee.meetings);
    const loading = useSelector((state: AppState) => state.employee.loading);
    const clients = useSelector((state: AppState) => state.client.data );
    const EmployeeClients = useSelector((state: AppState) => state.employee.clients );
    const loading_all = useSelector((state: AppState) => state.meeting.loading);
    const error = useSelector((state: AppState) => state.meeting.error);
    const errMsg = useSelector((state: AppState) => state.meeting.errMsg);

    const [adminMode,setAdminMode] = useState(false);

    useEffect(() => {
      const employeeId = localStorage.getItem('employeeId');
      const authorId = employeeId ? parseInt(employeeId) : 0; // default to 0 if employeeId is null
      if(authorId == 0) return;

        dispatch(loadMeetings(authorId));

        if(localStorage.getItem("userType") === "owner"){
          dispatch(loadAllMeetings("all"));
          dispatch(loadClients('all'));
        }

        dispatch(loadEmpClient(authorId));

        
      }, [dispatch]);   

    useEffect(()=>{
      const employeeId = localStorage.getItem('employeeId');
      const authorId = employeeId ? parseInt(employeeId) : 0; // default to 0 if employeeId is null
      dispatch(loadMeetings(authorId));
    },[dispatch, meetings_all]);

    useEffect(()=>{
        renderMeetings();
    },[loading,loading_all, adminMode, meetings]);


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
        emps: []
      };

    const [add_dialog_data, setAddDialogData] = useState<any>(initialState);



    function stringToColor(str: string): string {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const hex = Math.abs(hash).toString(16).substring(0, 6);
      return `#${'0'.repeat(6 - hex.length)}${hex}`;
    }

    function renderMeetings(){
        var meet_arr : any = [];
        if(!adminMode){
           meet_arr=  Object.values(meetings);
        }
        else{
           meet_arr =  Object.values(meetings_all);
        }
        console.log(meet_arr);
        
        const fin_arr : any = [];
        for (const val of meet_arr) {
            console.log(val);
            fin_arr.push({ title: val.subject, color: stringToColor(val.client.name) , date: val.start , meeting_id: val.id});
            }
        setEvents(fin_arr);  
    }

    function handleDateClick(info: any) {
        const clickedDate = info.dateStr;
        var today = new Date();
          today.setHours(today.getHours() + 1);
        setAddDialogData({...add_dialog_data,date: clickedDate, heading: "Add meeting", adding: true, start:new Date(), end: today})
        setShowAddDialog(true);
      }


    function onAddMeeting(){
        
        const employeeId = localStorage.getItem('employeeId');
        const authorId = employeeId ? parseInt(employeeId) : 0; // default to 0 if employeeId is null
        if(authorId == 0) return;

        const date_sel = add_dialog_data.date;
        try{
          var start = format(add_dialog_data.start,"HH:mm:00");
          var end = format(add_dialog_data.end,"HH:mm:00");
        }
        catch(e){
          return;
        }
        

        const DataToSend : MeetingData = {
            subject: add_dialog_data.subject,
            start: date_sel+"T"+start,
            end: date_sel+"T"+end,
            notes: add_dialog_data.notes,
            employeeIds: [authorId],
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
        var sel_meeting : any;
        if(adminMode)
          sel_meeting = meetings_all[meeting_id];
        else
          sel_meeting = meetings[meeting_id];

        const g_date = format((new Date(sel_meeting.start)),"yyyy-MM-dd");

        setAddDialogData({...add_dialog_data, heading: "Edit Meeting", adding: false,
        subject: sel_meeting.subject,
        start: new Date(sel_meeting.start),
        end: new Date(sel_meeting.end),
        date: g_date,
        notes : sel_meeting.notes,
        client: sel_meeting.client.id,
        meeting_id : meeting_id,
        emps : sel_meeting.employees
        });
        
        setShowAddDialog(true);
    }

    return (
        <>
        <div className='page-heading'><h1>Meetings</h1><br /></div>
        <div className={error ? "error visible" : "hidden"}>
            <Message severity="error" text={errMsg.toString()} />
        </div>
        <div className={localStorage.getItem("userType") === "owner" ? "" : "hidden"}>
          <span style={{margin:"15px"}}>Admin View:</span>
          <InputSwitch checked={adminMode} onChange={(e) => {if(e.value == true) setAdminMode(true); else setAdminMode(false)}} />
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
          <span className={adminMode ? "" : "hidden"}>
            Meeting of {
            Object.values(add_dialog_data.emps).map((val: any) => val.username).join(" ,")             
            }
          </span>
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
                optionLabel="name" optionValue="id" 
                options={(adminMode) ? Object.values(clients) : Object.values(EmployeeClients)} 
                
                className="md:w-14rem" />
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