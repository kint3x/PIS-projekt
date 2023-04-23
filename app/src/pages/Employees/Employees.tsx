import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';

import { loadRequest as loadEmployees } from '../../store/ducks/employee/actions';
import { updateRequest as updateEmployee } from '../../store/ducks/employee/actions';
import { removeRequest as removeEmployee } from '../../store/ducks/employee/actions';
import { AppState } from '../../store';

import { DataTable, DataTableValueArray , DataTableRowClickEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';

//#TODO if clicked, edit user 
//#Add user


const Employees = () => {
    const dispatch = useDispatch();
    
    const [show_dialog,setShowDialog] = useState(false);

    useEffect(() => {
      dispatch(loadEmployees('all'));
    }, [dispatch,show_dialog]);   

    const employees = useSelector((state: AppState) => state.employee.data);
    const loading = useSelector((state: AppState) => state.employee.loading);
    const error = useSelector((state: AppState) => state.employee.error);
    const errMsg = useSelector((state: AppState) => state.employee.errMsg);

    const [modal_err_msg, setModalErr] = useState<any>({visible: "hidden", msg: ""});
    const [dialog_data, setDialogData] = useState<any>({});

    var password_change = "";

    
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

    function onUserEdit() : void{
      //#TODO Call api to edit user with dialog_data

      dispatch(updateEmployee(dialog_data.id, {...dialog_data, password: (password_change == "") ? dialog_data.password : password_change }));

      if(!error){
        setShowDialog(false);
        setModalErr({msg: "", visible: "hidden"})
      }
      else{
        setModalErr({msg: errMsg, visible: ""})
        setShowDialog(true);
      }

    }

    function onUserDelete() : void{
        // Check if can delete
        // #TODO Call api to delete user
        dispatch(removeEmployee(dialog_data.id));
        if(!error){
          setShowDialog(false);
          setModalErr({msg: "", visible: "hidden"})
        }
        else{
          setModalErr({msg: errMsg, visible: ""})
          setShowDialog(true);
        }
    }
    

    return(
      <>
        <div className='page-heading'><h1>Employees</h1><br /></div>
        <DataTable loading={loading} value={Object.values(employees)} tableStyle={{ minWidth: '50rem' }} 
        onRowClick={onClickHandle}
        >
          <Column field="id" header="ID"></Column>
          <Column filter={true} field="name" header="Name"></Column>
          <Column filter={true} field="surname" header="Surname"></Column>
          <Column filter={true}  field="username" header="Username"></Column>
        </DataTable>

        <Dialog header="Edit User" className="edit-user" visible={show_dialog} style={{ width: '50vw' }} onHide={() => setShowDialog(false)}>
          {JSON.stringify(dialog_data)}
          <div className={modal_err_msg.visible}>
            <Message severity="error" text={modal_err_msg.msg} />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Username</span>
            <InputText placeholder="Username" value={dialog_data.username} 
            onChange={(e) => onInputChange(e, 'username')} />
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Password</span>
            <InputText placeholder="Password" onChange={(e) => {password_change = e.target.value}}/>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex align-items-center">
                <RadioButton inputId="Worker" name="type" value="Worker" onClick={(e)=>setDialogData({...dialog_data, type: "Worker"})} 
                checked={dialog_data.type == "Worker"} />
                <label htmlFor="Worker" className="ml-2">Worker</label>
            </div>
            <div className="flex align-items-center">
                <RadioButton inputId="Manager" name="type" value="Manager"  checked={dialog_data.type == "Manager"} />
                <label htmlFor="Manager" className="ml-2">Manager</label>
            </div>
            <div className="flex align-items-center">
                <RadioButton inputId="Owner" name="type" value="Owner" checked={dialog_data.type == "Owner"} />
                <label htmlFor="Owner" className="ml-2">Owner</label>
            </div>
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

          <Button label="Submit" severity="success" onClick = {() => onUserEdit()} />
          <Button label="Delete" severity="danger"  onClick = {() => onUserDelete()} className="float-right"/>
      </Dialog>
      </>
    );

    
   
  
}
   
export default Employees;