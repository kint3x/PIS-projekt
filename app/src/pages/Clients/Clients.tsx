import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

import { loadRequest as loadClients } from '../../store/ducks/client/actions';
import { updateRequest as updateClient } from '../../store/ducks/client/actions';
import { removeRequest as removeClient } from '../../store/ducks/client/actions';
import { createRequest as addClient } from '../../store/ducks/client/actions'
import { loadClientProductsRequest as loadClientProducts } from '../../store/ducks/client/actions'
import { addProductRequest as addClientProduct } from '../../store/ducks/client/actions'
import { removeProductRequest as removeClientProduct } from '../../store/ducks/client/actions'
import { loadEmployeesRequest as loadProductEmployees} from '../../store/ducks/product/actions'
import { loadRequest as loadProducts } from '../../store/ducks/product/actions';
import { addClientRequest as addEmployeeClient} from '../../store/ducks/employee/actions'
import { removeClientRequest as removeEmployeeClient} from '../../store/ducks/employee/actions'
import { addEmployeeRequest as addClientEmployee} from '../../store/ducks/client/actions'
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

// TODD page available for every user, but for "worker" it only shows their own clients

const Clients = () => {

    const dispatch = useDispatch();
    
    const [show_client_dialog,setShowClientDialog] = useState(false);
    const [show_add_client_dialog,setShowAddClientDialog] = useState(false);
    const [show_notes_dialog,setShowNotesDialog] = useState(false)
    const [show_clientproduct_dialog,setShowClientProductDialog] = useState(false); 

    const clients = useSelector((state: AppState) => state.client.data);
    const loading = useSelector((state: AppState) => state.client.loading);
    const error = useSelector((state: AppState) => state.client.error);
    const errMsg = useSelector((state: AppState) => state.client.errMsg);

    const [modal_err_msg, setModalErr] = useState<any>({visible: "hidden", msg: ""});
    const [client_dialog_data, setClientDialogData] = useState<any>({});
    const [add_client_dialog_data, setAddClientDialogData] = useState<any>({});

    const products = useSelector((state: AppState) => state.product.data);
    const productEmployees = useSelector((state: AppState) => state.product.employees);

    const [selected_product_id, setSelectedProductId] = useState(0);
    const [selected_employee_id, setSelectedEmployeeId] = useState(0);

    const cps = useSelector((state: AppState) => state.client.clientProducts);

    useEffect(() => {
      dispatch(loadProducts('all'));
    }, [dispatch])

    useEffect(() => {
      dispatch(loadClients('all'));
    }, [dispatch,show_client_dialog,show_add_client_dialog]);  

    useEffect(() => {
      dispatch(loadProductEmployees(selected_product_id));
    }, [dispatch,selected_product_id]);  


    function onInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) {
      const { value } = event.target;
      setClientDialogData((prevState: any) => ({
        ...prevState,
        [key]: value
      }));
    }

    function ClientRowClickHandle(event: DataTableRowClickEvent) : void{
      setClientDialogData(event.data);
      setShowClientDialog(true);
    }

    function onClientEdit() : void{
      dispatch(updateClient(client_dialog_data.id, {...client_dialog_data}))

      if(!error){
        setShowClientDialog(false);
        setModalErr({msg: "", visible: "hidden"})
      }
      else{
        setModalErr({msg: errMsg, visible: ""})
        setShowClientDialog(true);
      }
    }

    function onClientDelete() : void{
        dispatch(removeClient(client_dialog_data.id));
        if(!error){
          setShowClientDialog(false);
          setModalErr({msg: "", visible: "hidden"})
        }
        else{
          setModalErr({msg: errMsg, visible: ""})
          setShowClientDialog(true);
        }
    }

    function AddClientSubmit(){
      dispatch(addClient(add_client_dialog_data));
      if(!error){
        setShowAddClientDialog(false);
        setModalErr({msg: "", visible: "hidden"});
      }
      else{
        setModalErr({msg: errMsg, visible: ""})
        setShowAddClientDialog(true);
      }
    }

    function onNotesSubmit(): void{
      onClientEdit();
      setShowNotesDialog(false);
      setShowClientDialog(true);
    }

    //temporary solution till authentification works
    const [loggedUser,setLoggedUser] = useState("Worker");
    const [readOnly,setReadOnly] = useState(true);

    function changeUser() : void{
        if (loggedUser === "Worker"){
          setLoggedUser("Manager")
          setReadOnly(false)
        }
        else if (loggedUser === "Manager"){
          setLoggedUser("Owner")
          setReadOnly(false)
        }
        else if (loggedUser === "Owner"){
          setLoggedUser("Worker")
          setReadOnly(true)
        }
        console.log(loggedUser)
    } 

    function onClientProductDialogOpen() : void{
      setShowClientProductDialog(true)
      dispatch(loadClientProducts(client_dialog_data.id));
    }
   
    function onProductSelect(event: DropdownChangeEvent) : void{
      // TODO nacitavaju sa zle
      dispatch(loadProductEmployees(selected_product_id));
      setSelectedProductId(event.value)
      setSelectedEmployeeId(0)
  }

  function onEmployeeSelect(event: DropdownChangeEvent) : void{
      setSelectedEmployeeId(event.value)
  }

    function onClientProductCreate() : void{
      dispatch(addClientProduct(client_dialog_data.id,selected_product_id));
      dispatch(addClientEmployee(client_dialog_data.id,selected_employee_id));
      setSelectedEmployeeId(0)
      setSelectedProductId(0)
    }

    function onClientProductDelete() : void{
      dispatch(removeClientProduct(client_dialog_data.id,selected_product_id));
      dispatch(removeClientEmployee(client_dialog_data.id,selected_employee_id));
      setSelectedEmployeeId(0)
      setSelectedProductId(0)
    }

    return(
      <>
        <div className='page-heading'><h1>Clients</h1><br /></div>

        {loggedUser !== "Worker" && <Button label="Add client" severity="success" className="float-left" onClick={()=>setShowAddClientDialog(true)} />}
        <Button label="Change user" severity="danger"  onClick = {() => changeUser()} className="float-right" />

        <br />
        <br />
        <br />

        <DataTable loading={loading} value={Object.values(clients)} tableStyle={{ minWidth: '50rem' }} 
        onRowClick={ClientRowClickHandle}>
          <Column field="id" header="ID"></Column>
          <Column filter={true} field="name" header="Name"></Column>
          <Column filter={true} field="surname" header="Surname"></Column>
        </DataTable>

        <Dialog header="Edit Client" className="edit-client" visible={show_client_dialog} style={{ width: '50%' }} onHide={() => setShowClientDialog(false)}>
          
          <Dialog header="Notes" visible={show_notes_dialog} style={{ width: '50%' }} onHide={() => setShowNotesDialog(false)}>
            <InputTextarea style={{ width: '100%' }} placeholder="Notes" value={client_dialog_data.notes}
            onChange={(e) => onInputChange(e, 'notes')} />
            <Button label="Submit" severity="success" onClick = {() => onNotesSubmit()}/>
          </Dialog>
          
          <div className={modal_err_msg.visible}>
            <Message severity="error" text={modal_err_msg.msg} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Email</span>
            <InputText placeholder="Email" readOnly={readOnly}  value={client_dialog_data.email} 
            onChange={(e) => onInputChange(e, 'email')} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Name</span>
            <InputText placeholder="Name" readOnly={readOnly} value={client_dialog_data.name}
            onChange={(e) => onInputChange(e, 'name')} />
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Surname</span>
            <InputText placeholder="Surname" readOnly={readOnly} value={client_dialog_data.surname}
            onChange={(e) => onInputChange(e, 'surname')} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">DOB</span>
            <Calendar
              showIcon={true}
              disabled={readOnly}
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
            <InputText placeholder="Phone" readOnly={readOnly} value={client_dialog_data.phone}
            onChange={(e) => onInputChange(e, 'phone')} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Address</span>
            <InputTextarea style={{ height: '50px' }} placeholder="Address" readOnly={readOnly} value={client_dialog_data.address}
            onChange={(e) => onInputChange(e, 'address')} />
          </div>

          {loggedUser !== "Worker" && <Button label="Submit" severity="success" onClick = {() => onClientEdit()} />}
          {loggedUser !== "Manager" && <Button label="View notes" severity="success" onClick = {() => setShowNotesDialog(true)} />}
          {loggedUser !== "Worker" && <Button label="Assign employees" severity="success"  onClick = {() => onClientProductDialogOpen()}/>}
          {loggedUser !== "Worker" && <Button label="Delete" severity="danger"  onClick = {() => onClientDelete()} className="float-right"/>}
      </Dialog>




      <Dialog header="Add Client" className="add-client" visible={show_add_client_dialog} style={{ width: '50%' }} onHide={() => {setShowAddClientDialog(false);setAddClientDialogData({}) }}>
          
          <div className={modal_err_msg.visible}>
            <Message severity="error" text={modal_err_msg.msg} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Email</span>
            <InputText placeholder="Email" onChange={(e)=>setAddClientDialogData({...add_client_dialog_data, email: e.target.value})} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Name</span>
            <InputText placeholder="Name" onChange={(e)=>setAddClientDialogData({...add_client_dialog_data, name: e.target.value})} />
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Surname</span>
            <InputText placeholder="Surname" onChange={(e)=>setAddClientDialogData({...add_client_dialog_data, surname: e.target.value})} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">DOB</span>
            <Calendar
              showIcon={true}
              onChange={(e) => 
                {
                  if(e.value instanceof Date) setAddClientDialogData({...add_client_dialog_data, dob: format(e.value, "yyyy-MM-dd")+"T00:00:00"})
                }
              }
              dateFormat="yy-mm-dd"
                  />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Phone</span>
            <InputText placeholder="Phone" onChange={(e)=>setAddClientDialogData({...add_client_dialog_data, phone: e.target.value})} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Address</span>
            <InputTextarea style={{ height: '50px' }} placeholder="Address" onChange={(e)=>setAddClientDialogData({...add_client_dialog_data, address: e.target.value})} />
          </div>

          <Button label="Submit" severity="success" onClick = {() => AddClientSubmit()} />
          <Button label="Sumbit and Assign employees" severity="success"  onClick = {() => {AddClientSubmit();onClientProductDialogOpen()}}/>
      </Dialog>




      <Dialog header="Assign employees" className="assign-employees" visible={show_clientproduct_dialog} style={{ width: '75%' }} onHide={() => setShowClientProductDialog(false)}>
          
          <div className={modal_err_msg.visible}>
            <Message severity="error" text={modal_err_msg.msg} />
          </div>
          <br />
          <Splitter >
              <SplitterPanel >
                <Dropdown value={selected_product_id} onChange={(e) => onProductSelect(e)} placeholder="Select a product"
              optionLabel="name" optionValue="id" options={Object.values(products)} className="w-full md:w-14rem" />
              </SplitterPanel>
              <SplitterPanel >
                <Dropdown value={selected_employee_id} onChange={(e) => onEmployeeSelect(e)} placeholder="Select an employee"
              optionLabel="username" optionValue="id" options={Object.values(productEmployees)} className="w-full md:w-14rem" />
              </SplitterPanel>
            </Splitter>

          <br />
          <Button label="Add selected" severity="success" onClick = {() => onClientProductCreate()} />
      

         <DataTable loading={loading} value={Object.values(cps)} tableStyle={{ minWidth: '50rem' }}>
            <Column filter={true} field="product.name" header="Product"></Column>
            <Column filter={true} field="active" header="Status"></Column>
            <Column filter={true} field="employee.name" header="Employee"></Column>
          </DataTable>

          
          <Button label="Delete selected" severity="danger"  onClick = {() => onClientProductDelete()}/>
      </Dialog>
      </>
    );

    
   
  
}
   
export default Clients;