import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

import { loadRequest as loadClients } from '../../store/ducks/client/actions';
import { updateRequest as updateClient } from '../../store/ducks/client/actions';
import { removeRequest as removeClient } from '../../store/ducks/client/actions';
import { createRequest as addClient } from '../../store/ducks/client/actions';
import { loadEmployeesRequest as loadClientEmployees} from '../../store/ducks/client/actions';

import {loadClientRequest as loadClientsForEmployee} from '../../store/ducks/employee/actions';

import { loadProductsRequest as loadEmployeeProducts } from '../../store/ducks/employee/actions';

import { loadClientProductsRequest as loadClientProducts } from '../../store/ducks/client/actions'
import { addProductRequest as addClientProduct } from '../../store/ducks/client/actions'
import { removeProductRequest as removeClientProduct } from '../../store/ducks/client/actions'
import { loadEmployeesRequest as loadProductEmployees} from '../../store/ducks/product/actions'
import { loadRequest as loadProducts } from '../../store/ducks/product/actions';

import { removeEmployeeRequest as removeClientEmployee} from '../../store/ducks/client/actions'


import { AppState } from '../../store';

import { DataTable, DataTableValueArray , DataTableRowClickEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Calendar } from 'primereact/calendar';
import { format } from "date-fns";


const Clients = () => {

    const dispatch = useDispatch();
    
    const [show_client_dialog,setShowClientDialog] = useState(false);
    const [show_notes_dialog,setShowNotesDialog] = useState(false)

    const clients = useSelector((state: AppState) => state.client.data);
    const employeeClients = useSelector((state: AppState) => state.employee.clients);

    const clientEmployees = useSelector((state: AppState) => state.client.employees);
    const loading = useSelector((state: AppState) => state.client.loading);
    const error = useSelector((state: AppState) => state.client.error);
    const errMsg = useSelector((state: AppState) => state.client.errMsg);

    const initialData={
      addMode: true,
      name: "",
      surname: "",
      dob: "",
      email: "",
      phone: "",
      adress: "",
      notes: ""
    }

    const initialAssignData= {
      viewDialog: false,
      client: "",
      employee: 0,
      product: 0
    }


    const [client_dialog_data, setClientDialogData] = useState<any>(initialData);
    const [assign_dialog, setAssignData] = useState<any>(initialAssignData);


    const employeeProducts = useSelector((state: AppState) => state.employee.products);



    const cps = useSelector((state: AppState) => state.client.clientProducts);

    useEffect(() => {
      
      const employeeId = localStorage.getItem('employeeId');
      const authorId = employeeId ? parseInt(employeeId) : 0; // default to 0 if employeeId is null
      if(authorId == 0) return;

      if(loggedUser() == "worker")
      dispatch(loadClientsForEmployee(authorId));
      else
        dispatch(loadClients('all'));
    }, [dispatch]);  


    function ClientRowClickHandle(event: DataTableRowClickEvent) : void{
      setClientDialogData(event.data);
      setShowClientDialog(true);
    }

    function onClientDelete() : void{
        dispatch(removeClient(client_dialog_data.id));
        setShowClientDialog(false);
    }

    function onAddClientButton(){
      setClientDialogData(initialData);
      setShowClientDialog(true);
    }

    const loggedUser = () => {
      if(localStorage.getItem("userType") == "owner") return "owner";
      if(localStorage.getItem("userType") == "manager") return "manager";
      if(localStorage.getItem("userType") == "worker") return "worker";
      return "";
    };

    const readOnly = () => { 
      if(localStorage.getItem("userType") == "owner") return false;
      if(localStorage.getItem("userType") == "manager") return false;
      if(localStorage.getItem("userType") == "worker") return true;
      return true;
    };

    function addUser(){
      dispatch(addClient(client_dialog_data));
      setShowClientDialog(false);
    }

    function editUser(){
      dispatch(updateClient(client_dialog_data.id, client_dialog_data));
      setShowClientDialog(false);
    }
    
    function showAssignDialog(){
      dispatch(loadClientEmployees(client_dialog_data.id));
      setAssignData({...assign_dialog,viewDialog:true, client: client_dialog_data.id})
    }

    function fetchAndShowProducts(e : any){
      setAssignData({...assign_dialog, employee: e.value});
      dispatch(loadEmployeeProducts(e.value));
    }

    function onAddClientProduct(){
      dispatch(addClientProduct(client_dialog_data.id,assign_dialog.employee,assign_dialog.product));
      setAssignData({...assign_dialog,viewDialog: false});
    }
  
    return(
      <>
        <div className='page-heading'><h1>Clients</h1>
          <Button className={"customAdd " + ((loggedUser() == "worker") ? "hidden" : "")} severity="success" onClick={()=>onAddClientButton()} rounded>
            <i className="pi pi-plus" style={{ color: 'green' }}></i>
          </Button>
        </div>

        <div className={error ? "error visible" : "hidden"}>
            <Message severity="error" text={errMsg.toString()} />
        </div>

     
        <DataTable loading={loading} value={loggedUser() == "worker" ? Object.values(employeeClients) : Object.values(clients)} tableStyle={{ minWidth: '50rem' }} 
        onRowClick={ClientRowClickHandle}>
          <Column field="id" header="ID"></Column>
          <Column filter={true} field="name" header="Name"></Column>
          <Column filter={true} field="surname" header="Surname"></Column>
        </DataTable>

        <Dialog header={client_dialog_data.addMode ? "Add Client" : "Edit Client"} className="edit-client" visible={show_client_dialog} 
        style={{ width: '50%' }} onHide={() => setShowClientDialog(false)}>
          
          <Dialog header="Notes" visible={show_notes_dialog} style={{ width: '50%' }} onHide={() => setShowNotesDialog(false)}>
            <InputTextarea style={{ width: '100%', marginTop:"20px"}} placeholder="Notes" value={client_dialog_data.notes}
            onChange={(e) => setClientDialogData({...client_dialog_data, notes: e.target.value })} />
          </Dialog>

          <br/>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Email</span>
            <InputText placeholder="Email" readOnly={readOnly()}  value={client_dialog_data.email} 
            onChange={(e) => {setClientDialogData({...client_dialog_data, email: e.target.value })}} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Name</span>
            <InputText placeholder="Name" readOnly={readOnly()} value={client_dialog_data.name}
            onChange={(e) => setClientDialogData({...client_dialog_data, name: e.target.value })} />
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Surname</span>
            <InputText placeholder="Surname" readOnly={readOnly()} value={client_dialog_data.surname}
            onChange={(e) => setClientDialogData({...client_dialog_data, surname: e.target.value })} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">DOB</span>
            <Calendar
              showIcon={true}
              disabled={readOnly()}
              value={new Date(client_dialog_data.dob)}
              onChange={(e) => 
                {
                  if(e.value instanceof Date) setClientDialogData({...client_dialog_data, dob: format(e.value, "yyyy-MM-dd")+"T00:00:00"})
                }
              }
              dateFormat="yy-mm-dd"
                  />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Phone</span>
            <InputText placeholder="Phone" readOnly={readOnly()} value={client_dialog_data.phone}
            onChange={(e) => setClientDialogData({...client_dialog_data, phone: e.target.value })} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Address</span>
            <InputTextarea style={{ height: '50px' }} placeholder="Address" readOnly={readOnly()} value={client_dialog_data.address}
            onChange={(e) => setClientDialogData({...client_dialog_data, address: e.target.value })} />
          </div>

          <Button onClick={()=> setShowNotesDialog(true)}><i className="pi pi-file-word" style={{marginRight:"10px",color:"white"}}></i> Notes</Button>
          
          <Button className={loggedUser() == ("owner" || "manager") ? "" : "hidden" } onClick={()=> showAssignDialog()} style={{marginRight:"auto",marginLeft:"10px"}}>
            <span style={{color:"white", fontWeight:"bold"}}>Assign</span>
          </Button>

          <Button onClick={client_dialog_data.addMode ?  addUser : editUser }  
          label={client_dialog_data.addMode ?  "Submit" : "Edit"} severity="success" className="customAdd customSubmit" 
          style={{float:"right", width: "20%", minWidth:"100px"}} />
      </Dialog>



      <Dialog header="Assign employees" className="assign-employees" visible={assign_dialog.viewDialog} 
      style={{ width: '500px' }} onHide={() => setAssignData({...assign_dialog,viewDialog:false})}>
      
      <Dropdown value={assign_dialog.employee} onChange={(e) => fetchAndShowProducts(e)} 
        placeholder="Select a employee"
        optionLabel="name" optionValue="id" 
        options={Object.values(clientEmployees)} 
        className="md:w-14rem" style={{width: "48%", marginTop:"20px", marginRight:"1%"}} />


      <Dropdown value={assign_dialog.product} onChange={(e) => setAssignData({...assign_dialog, product: e.value})} 
        placeholder="Select a Product"
        optionLabel="name" optionValue="id" 
        options={Object.values(employeeProducts)} 
        className="md:w-14rem" style={{width: "48%", marginTop: "20px", marginLeft:"1%"}} />

      <Button onClick={onAddClientProduct}  
              label={"Submit"} severity="success" className="customAdd customSubmit" 
              style={{float:"right", width: "100%", minWidth:"100px", marginTop: "20px"}} />

      </Dialog>

      </>
    );

    
    
  
}
   
export default Clients;
