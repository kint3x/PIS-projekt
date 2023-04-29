import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';

import { loadRequest as loadEmployees } from '../../store/ducks/employee/actions';
import { createRequest as addEmployee } from '../../store/ducks/employee/actions';
import { updateRequest as updateEmployee } from '../../store/ducks/employee/actions';


import { loadRequest as loadProducts } from '../../store/ducks/product/actions';


import { AppState } from '../../store';

import { DataTable, DataTableValueArray , DataTableRowClickEvent } from 'primereact/datatable';
import "primeicons/primeicons.css";

import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';
import { format } from "date-fns";
import { ListBox, ListBoxChangeEvent } from 'primereact/listbox';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Password } from 'primereact/password';

import { FileUpload , FileUploadUploadEvent} from 'primereact/fileupload';
import { ProgressSpinner } from 'primereact/progressspinner';

import employeeCard from './EmployeeCard';
import { EmployeeModel } from '../../store/ducks/employee/types';

const Employees = () => {

    const dispatch = useDispatch();
    
    const dialogInitialData={
      addMode: false,
      username: "",
      password: "",
      type: "Worker",
      email: "",
      name: "",
      surname: "",
      dob: "",
      phone: "",
      address: "",
      image: "",
      UpLoading: false,
      UpLoaded: false
    };

    const [show_dialog,setShowDialog] = useState(false);
    const [dialog_data, setDialogData] = useState<any>(dialogInitialData);

    useEffect(() => {
      dispatch(loadEmployees('all'));
    }, [dispatch,show_dialog]);   

    useEffect(() => {
      dispatch(loadProducts('all'));
    },[dispatch])

    const employee = useSelector((state: AppState) => state.employee.data);
    const employeeLoading = useSelector((state: AppState) => state.employee.loading);
    const employeeError = useSelector((state: AppState) => state.employee.error);
    const employeeErrMsg = useSelector((state: AppState) => state.employee.errMsg);

    const products = useSelector((state: AppState) => state.product.data);
    const productsLoading = useSelector((state: AppState) => state.product.loading);
    const productsError  = useSelector((state: AppState) => state.product.error);
    const productsErrMsg  = useSelector((state: AppState) => state.product.errMsg);

    function onEmployeeClick(id : number){
      console.log(employee[id]);
      setDialogData({...employee[id],addMode: false,UpLoading:false,UpLoaded: false, password: ""});
      setShowDialog(true);
    }
    
    function addClick(){
      setDialogData({...dialogInitialData, addMode: true});
      setShowDialog(true);
    }

    function addUser(){
      dispatch(addEmployee(dialog_data));
      setShowDialog(false);
    }

    function editUser(){
      dispatch(updateEmployee(dialog_data.id,dialog_data));
      setShowDialog(false);
    }

    const onUpload = (event:FileUploadUploadEvent  ) => {
      setDialogData({...dialog_data, UpLoading: false, UpLoaded: true, image: event.xhr.responseText});
    };

    const onUplError = () => {
      setDialogData({...dialog_data, UpLoading: false, UpLoaded: false});
    };
    const dialogHeader = () =>{
      return(
        <>
        <div className="p-dialog-title">
        <img src={" "+dialog_data.image} className={(dialog_data.image != "") ? "image-profile" : "hidden"} alt="Image" width="250" />
        {dialog_data.addMode ?  "Add Employee" : "Edit Employee"}
        </div>
        </>
      );
    };

    const employeeCards = () => {
      const cards = [];
      var key : any = 0;
      for( key of Object.keys(employee)) {
       cards.push(employeeCard(employee[key],onEmployeeClick));
      }

      return(
        <>
        <div className="container py-5 flex cards">
        {cards}
        </div>
        </>
      );
      
    };

    return(
      <>
        <div className='page-heading'>
          <h1>Employees</h1>        
          <Button className="customAdd" severity="success" onClick={()=>addClick()} rounded>
            <i className="pi pi-plus" style={{ color: 'green' }}></i></Button>
        </div>

  
        <div className={(employeeError || productsError)  ? "error visible" : "hidden"}>
            <Message severity="error" 
            text={(employeeError ? employeeErrMsg.toString(): "") + (productsError ? productsErrMsg.toString(): "")} />
        </div>
        
        {employeeCards()}

        {/* <DataTable loading={employeeLoading} value={Object.values(employee)} tableStyle={{ minWidth: '50rem' }} 
        onRowClick={onEmployeeClick}
        >
          <Column field="id" header="ID"></Column>
          <Column filter={true} field="name" header="Name"></Column>
          <Column filter={true} field="surname" header="Surname"></Column>
          <Column filter={true}  field="username" header="Username"></Column>
        </DataTable> */}
      
        {JSON.stringify(employee)}
        <Dialog header={dialogHeader} className="edit-user" visible={show_dialog} style={{ width: '50vw' }} 
        onHide={() => setShowDialog(false)}>

          <div className="flex flex-wrap gap-3 justify-content-center">
            <div className="flex align-items-center gap-2">
                <RadioButton inputId="Worker" name="type" value="Worker" onChange={(e)=>setDialogData({...dialog_data, type: "Worker"})} 
                checked={dialog_data.type == "Worker"} />
                <label htmlFor="Worker" className="ml-2">Worker</label>
            </div>
            <div className="flex align-items-center gap-2">
                <RadioButton inputId="Manager" name="type" value="Manager" onChange={(e)=>setDialogData({...dialog_data, type: "Manager"})} 
                checked={dialog_data.type == "Manager"} />
                <label htmlFor="Manager" className="ml-2">Manager</label>
            </div>
            <div className="flex align-items-center gap-2">
                <RadioButton inputId="Owner" name="type" value="Owner" onChange={(e)=>setDialogData({...dialog_data, type: "Owner"})}
                 checked={dialog_data.type  == "Owner"} />
                <label htmlFor="Owner" className="ml-2">Owner</label>
            </div>
            <FileUpload mode="basic" name="image" 
              url="http://matejka.xyz/api/"
              accept="image/*" maxFileSize={1000000} auto chooseLabel={dialog_data.UpLoaded ? "Uploaded" : "Image" } 
              className={dialog_data.UpLoaded ? "uploaded-btn" : "" }
              onBeforeUpload={()=> { setDialogData({...dialog_data, UpLoading: true})}}
              onUpload={onUpload}
              onError={onUplError}
              />
            <ProgressSpinner className={dialog_data.UpLoading ? "" : "hidden"} style={{width: '30px', height: '30px' , margin: "0", marginTop: "auto", marginBottom: "auto"}} 
            strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Username</span>
            <InputText placeholder="Username" value={dialog_data.username} 
            onChange={(e) => setDialogData({...dialog_data, username: e.target.value})} />
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Password</span>
            <Password placeholder="Password" value={dialog_data.password} 
            onChange={(e) => setDialogData({...dialog_data, password: e.target.value})}/>
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Email</span>
            <InputText placeholder="Email"  value={dialog_data.email} 
              onChange={(e) => setDialogData({...dialog_data, email: e.target.value})} />
          </div>
          
      
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Name</span>
            <InputText placeholder="Name" value={dialog_data.name}
             onChange={(e) => setDialogData({...dialog_data, name: e.target.value})} />
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Surname</span>
            <InputText placeholder="Surname" value={dialog_data.surname}
            onChange={(e) => setDialogData({...dialog_data, surname: e.target.value})} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">DOB</span>
            <Calendar
              showIcon={true}
              value={new Date(dialog_data.dob)}
              onChange={(e) => 
                {
                  if(e.value instanceof Date) setDialogData({...dialog_data, dob: format(e.value, "yyyy-MM-dd")+"T00:00:00"})
                }
              }
              dateFormat="yy-mm-dd"
                  />
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Phone</span>
            <InputText placeholder="Phone" value={dialog_data.phone}
            onChange={(e) => setDialogData({...dialog_data, phone: e.target.value})}  />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Address</span>
            <InputTextarea style={{ height: '50px' }} placeholder="Address" value={dialog_data.address}
            onChange={(e) => setDialogData({...dialog_data, address: e.target.value})} />
          </div>


          <Button onClick={dialog_data.addMode ?  addUser : editUser }  label={dialog_data.addMode ?  "Submit" : "Edit"} severity="success" className="customAdd customSubmit" style={{width: "100%"}}/>
          <Button  className={dialog_data.addMode ? "hidden" : ""} label="Delete" severity="danger"/>
      </Dialog>
      

      </>
    );

    
   
  
}
   
export default Employees;
