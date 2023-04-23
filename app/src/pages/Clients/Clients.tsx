import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';

import { loadRequest as loadClients } from '../../store/ducks/client/actions';
import { updateRequest as updateClient } from '../../store/ducks/client/actions';
import { removeRequest as removeClient } from '../../store/ducks/client/actions';
import { createRequest as addClient } from '../../store/ducks/client/actions'
import { AppState } from '../../store';

import { DataTable, DataTableValueArray , DataTableRowClickEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MultiSelect } from 'primereact/multiselect';
import { ListBox, ListBoxChangeEvent } from 'primereact/listbox';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Calendar } from 'primereact/calendar';
import { format } from "date-fns";


const Clients = () => {
    const dispatch = useDispatch();
    
    const [show_client_dialog,setShowClientDialog] = useState(false);
    const [show_add_client_dialog,setShowAddClientDialog] = useState(false);

    useEffect(() => {
      dispatch(loadClients('all'));
    }, [dispatch,show_client_dialog,show_add_client_dialog]);   

    const clients = useSelector((state: AppState) => state.client.data);
    const loading = useSelector((state: AppState) => state.client.loading);
    const error = useSelector((state: AppState) => state.client.error);
    const errMsg = useSelector((state: AppState) => state.client.errMsg);

    const [modal_err_msg, setModalErr] = useState<any>({visible: "hidden", msg: ""});
    const [client_dialog_data, setClientDialogData] = useState<any>({});
    const [add_client_dialog_data, setAddClientDialogData] = useState<any>({});

    
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
        // TODO should cascade delete on ClientProducts
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

    //temporary solution till authentification works
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
    

    //todo add submit button for editing notes
    const [show_notes,setShowNotes] = useState(false)


    // const cp_dispatch = useDispatch();
    
    const [show_clientproduct_dialog,setShowClientProductDialog] = useState(false);

    // useEffect(() => {
    //   dispatch(loadClients('all'));
    // }, [dispatch,show_clientproduct_dialog]);   

    // const cp_data = useSelector((state: AppState) => state.client.data);
    // const cp_loading = useSelector((state: AppState) => state.client.loading);
    // const cp_error = useSelector((state: AppState) => state.client.error);
    // const cp_errMsg = useSelector((state: AppState) => state.client.errMsg);

    const [clientproduct_modal_err_msg, setClientProductModalErr] = useState<any>({visible: "hidden", msg: ""});
    const [clientproduct_dialog_data, setClientProductDialogData] = useState<any>({});


    //temporary, just to visualize
    const products = ["Product1","Product2","Product3","Product4"]
    const [selectedProduct, setSelectedProduct] = useState<any>({});

    const [employees, setEmployees]= useState<any>([])
    const [selectedEmployees, setSelectedEmployees] = useState<any>([]);

    interface clientProductEmployees {
      Id: number,
      Product: string,
      Employees: string
    }

    const [cpe, setCpe]= useState<clientProductEmployees[]>([{Id:1, Product:'auto',Employees:'miso,fero'}, {Id:2, Product:'traktor',Employees:'stevo'}])

    function onClientProductCreate() : void{
      // TODO create ClientProduct object
      // Assign ClientProduct to employees
    }

    function onClientProductSelect(event: ListBoxChangeEvent) : void{

      setSelectedProduct(event.value)
      // TODO fetch employees for selected ClientProduct, show them in other listbox
      setEmployees(["Employee1","Employee2"])
    }

    function onClientProductDelete() : void{
        // TODO delete ClientProduct object, cascade to delete assigned employees
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
          
          <Dialog header="Notes" visible={show_notes} style={{ width: '50%' }} onHide={() => setShowNotes(false)}>
            <InputTextarea style={{ width: '100%' }} placeholder="Notes" value={client_dialog_data.notes}
            onChange={(e) => onInputChange(e, 'notes')} />
          </Dialog>
          
          {JSON.stringify(client_dialog_data)}
          <div className={modal_err_msg.visible}>
            <Message severity="error" text={modal_err_msg.msg} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Email</span>
            <InputText placeholder="Email"  value={client_dialog_data.email} 
            onChange={(e) => onInputChange(e, 'email')} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Name</span>
            <InputText placeholder="Name" value={client_dialog_data.name}
            onChange={(e) => onInputChange(e, 'name')} />
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Surname</span>
            <InputText placeholder="Surname" value={client_dialog_data.surname}
            onChange={(e) => onInputChange(e, 'surname')} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">DOB</span>
            <Calendar
              showIcon={true}
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
            <InputText placeholder="Phone" value={client_dialog_data.phone}
            onChange={(e) => onInputChange(e, 'phone')} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Address</span>
            <InputTextarea style={{ height: '50px' }} placeholder="Address" value={client_dialog_data.address}
            onChange={(e) => onInputChange(e, 'address')} />
          </div>

          {loggedUser !== "Worker" && <Button label="Submit" severity="success" onClick = {() => onClientEdit()} />}
          {loggedUser !== "Manager" && <Button label="View notes" severity="success" onClick = {() => setShowNotes(true)} />}
          {loggedUser !== "Worker" && <Button label="Assign employees" severity="success"  onClick = {() => setShowClientProductDialog(true)}/>}
          <Button label="Delete" severity="danger"  onClick = {() => onClientDelete()} className="float-right"/>
      </Dialog>




      <Dialog header="Add Client" className="add-client" visible={show_add_client_dialog} style={{ width: '50%' }} onHide={() => {setShowAddClientDialog(false);setAddClientDialogData({}) }}>
          
          {JSON.stringify(client_dialog_data)}
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
          <Button label="Sumbit and Assign employees" severity="success"  onClick = {() => {AddClientSubmit();setShowClientProductDialog(true)}}/>
      </Dialog>




      <Dialog header="Assign employees" className="assign-employees" visible={show_clientproduct_dialog} style={{ width: '75%' }} onHide={() => setShowClientProductDialog(false)}>
          
          {JSON.stringify(clientproduct_dialog_data)}
          <div className={modal_err_msg.visible}>
            <Message severity="error" text={modal_err_msg.msg} />
          </div>
          <br />
          <Splitter >
              <SplitterPanel >
                <ListBox value={selectedProduct} onChange={(e) => onClientProductSelect(e)}
              options={products} className="w-full md:w-14rem" />
              </SplitterPanel>
              <SplitterPanel >
                <ListBox multiple value={selectedEmployees} onChange={(e) => setSelectedEmployees(e.value)} 
            options={employees} className="w-full md:w-14rem" />
              </SplitterPanel>
          </Splitter>

          <br />
          <Button label="Add selected" severity="success" onClick = {() => onClientProductCreate()} />
      

          <DataTable loading={loading} /*value={Object.values(clientProductEmployees)}*/ value={cpe} tableStyle={{ minWidth: '50rem' }} 
          /*TODO DELETE SELECTED onRowClick={onClickHandle}*/>
            <Column filter={true} field="Id" header="Id"></Column>
            <Column filter={true} field="Product" header="Product"></Column>
            <Column filter={true} field="Employees" header="Employees"></Column>
          </DataTable>

          
          <Button label="Delete selected" severity="danger"  onClick = {() => onClientProductDelete()}/>
      </Dialog>
      </>
    );

    
   
  
}
   
export default Clients;