import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';

import { loadRequest as loadClients } from '../../store/ducks/client/actions';
import { updateRequest as updateClient } from '../../store/ducks/client/actions';
import { removeRequest as removeClient } from '../../store/ducks/client/actions';
import { AppState } from '../../store';

import { DataTable, DataTableValueArray , DataTableRowClickEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';

//#TODO if clicked, edit client 
//#Add client
//assing to new employee

const Clients = () => {
    const dispatch = useDispatch();
    
    const [show_dialog,setShowDialog] = useState(false);

    useEffect(() => {
      dispatch(loadClients('all'));
    }, [dispatch,show_dialog]);   

    const clients = useSelector((state: AppState) => state.client.data);
    const loading = useSelector((state: AppState) => state.client.loading);
    const error = useSelector((state: AppState) => state.client.error);
    const errMsg = useSelector((state: AppState) => state.client.errMsg);

    const [modal_err_msg, setModalErr] = useState<any>({visible: "hidden", msg: ""});
    const [dialog_data, setDialogData] = useState<any>({});

    
    function onInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) {
      const { value } = event.target;
      setDialogData((prevState: any) => ({
        ...prevState,
        [key]: value
      }));
    }

    function onClickHandle(event: DataTableRowClickEvent) : void{
      setDialogData(event.data);
      setShowDialog(true);
    }

    function onClientEdit() : void{
      //#TODO Call api to edit client with dialog_data

      dispatch(updateClient(dialog_data.id, {...dialog_data}))

      if(!error){
        setShowDialog(false);
        setModalErr({msg: "", visible: "hidden"})
      }
      else{
        setModalErr({msg: errMsg, visible: ""})
        setShowDialog(true);
      }

    }

    function onClientDelete() : void{
        // Check if can delete
        // #TODO Call api to delete client
        dispatch(removeClient(dialog_data.id));
        if(!error){
          setShowDialog(false);
          setModalErr({msg: "", visible: "hidden"})
        }
        else{
          setModalErr({msg: errMsg, visible: ""})
          setShowDialog(true);
        }
    }


    const [loggedUser,setLoggedUser] = useState("Worker");

    function changeUser() : void{
        if (loggedUser === "Worker")
          setLoggedUser("Manager")
        else if (loggedUser === "Manager")
          setLoggedUser("Owner")
        else if (loggedUser === "Owner")
          setLoggedUser("Worker")
  
        console.log(loggedUser)
    }
    
    const [show_notes,setShowNotes] = useState(false)

    return(
      <>
        <div className='page-heading'><h1>Clients</h1><br /></div>
        {loggedUser !== "Worker" && <Button label="Add client" severity="success" className="float-left" />}
        <Button label="Change user" severity="danger"  onClick = {() => changeUser()} className="float-right" />
        <br />
        <br />
        <br />
        <DataTable loading={loading} value={Object.values(clients)} tableStyle={{ minWidth: '50rem' }} 
        onRowClick={onClickHandle}
        >
          <Column field="id" header="ID"></Column>
          <Column filter={true} field="name" header="Name"></Column>
          <Column filter={true} field="surname" header="Surname"></Column>
        </DataTable>

        <Dialog header="Edit Client" className="edit-client" visible={show_dialog} style={{ width: '50vw' }} onHide={() => setShowDialog(false)}>
          
          <Dialog header="Notes" visible={show_notes} style={{ width: '50vw' }} onHide={() => setShowNotes(false)}>
          <InputTextarea style={{ width: '100%' }} placeholder="Notes" value={dialog_data.notes}
          onChange={(e) => onInputChange(e, 'notes')} />
          </Dialog>
          
          {JSON.stringify(dialog_data)}
          <div className={modal_err_msg.visible}>
            <Message severity="error" text={modal_err_msg.msg} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Email</span>
            <InputText placeholder="Email"  value={dialog_data.email} 
            onChange={(e) => onInputChange(e, 'email')} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Name</span>
            <InputText placeholder="Name" value={dialog_data.name}
            onChange={(e) => onInputChange(e, 'name')} />
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Surname</span>
            <InputText placeholder="Surname" value={dialog_data.surname}
            onChange={(e) => onInputChange(e, 'surname')} />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Phone</span>
            <InputText placeholder="Phone" value={dialog_data.phone}
            onChange={(e) => onInputChange(e, 'phone')} />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Address</span>
            <InputTextarea style={{ height: '50px' }} placeholder="Address" value={dialog_data.address}
            onChange={(e) => onInputChange(e, 'address')} />
          </div>

          {loggedUser !== "Worker" && <Button label="Submit" severity="success" onClick = {() => onClientEdit()} />}
          {loggedUser !== "Manager" && <Button label="View notes" severity="success" onClick = {() => setShowNotes(true)} />}
          {loggedUser !== "Worker" && <Button label="Assign employees" severity="success"/>}
          <Button label="Delete" severity="danger"  onClick = {() => onClientDelete()} className="float-right"/>
      </Dialog>
      </>
    );

    
   
  
}
   
export default Clients;