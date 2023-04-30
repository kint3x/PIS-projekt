import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';

import { loadRequest as loadEmployees } from '../../store/ducks/employee/actions';
import { createRequest as addEmployee } from '../../store/ducks/employee/actions';
import { updateRequest as updateEmployee } from '../../store/ducks/employee/actions';
import { removeRequest as removeEmployee } from '../../store/ducks/employee/actions';
import { loadClientRequest as empLoadClients } from '../../store/ducks/employee/actions';


import { loadProductsRequest as loadEmployeeProducts } from '../../store/ducks/employee/actions';
import { addProductRequest  as addEmployeeProduct } from '../../store/ducks/employee/actions';
import { addClientRequest  as addEmployeeClient } from '../../store/ducks/employee/actions';
import { removeClientRequest  as removeEmployeeClient } from '../../store/ducks/employee/actions';
import { removeProductRequest  as removeEmployeeProduct } from '../../store/ducks/employee/actions';


import { loadRequest as loadProducts } from '../../store/ducks/product/actions';

import { loadRequest as loadClients } from '../../store/ducks/client/actions';


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
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Password } from 'primereact/password';
import { PickList } from 'primereact/picklist';
import { FileUpload , FileUploadUploadEvent} from 'primereact/fileupload';
import { ProgressSpinner } from 'primereact/progressspinner';

import employeeCard from './EmployeeCard';
import { EmployeeModel } from '../../store/ducks/employee/types';
import { ProductModel } from '../../store/ducks/product/types';
import { ClientModel } from '../../store/ducks/client/types';

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

    const assignInitialData={
        show: false,
        clientMode: false,
        employee_id: 0
    }

    const [show_dialog,setShowDialog] = useState(false);
    const [dialog_data, setDialogData] = useState<any>(dialogInitialData);

    const [assign_dialog, setAssignDialog] = useState<any>(assignInitialData);
    const [picker_states,setPickerState] = useState<any>({
      source_products: [],
      target_products: [],
      source_clients: [],
      target_clients: []
    });


    useEffect(() => {
      dispatch(loadEmployees('all'));
    }, [dispatch,show_dialog]);   

    useEffect(() => {
      dispatch(loadProducts('all'));
      dispatch(loadClients('all'));
    },[dispatch])



    const employee = useSelector((state: AppState) => state.employee.data);
    const employeeLoading = useSelector((state: AppState) => state.employee.loading);
    const employeeError = useSelector((state: AppState) => state.employee.error);
    const employeeErrMsg = useSelector((state: AppState) => state.employee.errMsg);

    const products = useSelector((state: AppState) => state.product.data);
    const productsLoading = useSelector((state: AppState) => state.product.loading);
    const productsError  = useSelector((state: AppState) => state.product.error);
    const productsErrMsg  = useSelector((state: AppState) => state.product.errMsg);

    const employeeProducts = useSelector((state: AppState) => state.employee.products);
    const employeeClients = useSelector((state: AppState) => state.employee.clients);
    const clients = useSelector((state: AppState) => state.client.data);

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
      dispatch(addEmployee({...dialog_data, image: (dialog_data.image == "") ? "https://bootdey.com/img/Content/avatar/avatar6.png" : dialog_data.image }));
      setShowDialog(false);
    }

    function onClickaddClients(id : number){
      dispatch(empLoadClients(id));
      setAssignDialog({...assign_dialog, show: true, clientMode: true, employee_id: id});
      renderPickers_clients();
    }

    function onClickaddProducts(id : number){
      dispatch(loadEmployeeProducts(id));
      setAssignDialog({...assign_dialog, show: true, clientMode: false, employee_id: id});
      renderPickers_products();
    }

    const accept = (id : number) => {
      dispatch(removeEmployee(id));
    }

    function removeUser(id : number){
      confirmDialog({
        message: 'Do you want to delete user '+ employee[id].username + ' ?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClassName: 'p-button-danger',
        accept: () => accept(id),

    });

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

    /* PICKER FUNCTIONS */
    const itemTemplate = (item : any) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <div className="flex-1 flex flex-column gap-2">
                    <span className="font-bold">{item.name}{(item.surname !== undefined )? " "+item.surname : "" }</span>
                </div>
            </div>
        );
    };

    const renderPickers_clients = () => {
      const rendered_clients :any = [];
      var key:any;
      for( key of Object.keys(clients)){
        if( !(key in employeeClients)){
          rendered_clients.push(clients[key]);// check if not in employee already
        }       
      }
      setPickerState({...picker_states,source_clients: rendered_clients, target_clients: Object.values(employeeClients)});
    };

    const renderPickers_products = () => {
      const rendered_products= [];
      var key:any;
      for( key of Object.keys(products)){
        if( !(key in employeeProducts)){
          rendered_products.push(products[key]);// check if not in employee already
        }    
        
      }
      setPickerState({...picker_states,source_products: rendered_products, target_products: Object.values(employeeProducts)});
    };

    const onClientPickerChange = (event :any ) => {
      // Add those products which are new in target
      const emp_id =assign_dialog.employee_id;
      var key:any;
      for( key of Object.keys(clients) ){
        const it_id =  clients[key].id;
        // is in target ?
        const foundObj = event.target.find((item: { id: any; }) => item.id === it_id);
        //was there before?
        const foundObj_before = picker_states.target_clients.find((item: { id: any; }) => item.id === it_id);
        if( foundObj && !foundObj_before ){ // if found but wasnt there before add
          dispatch(addEmployeeClient(emp_id,it_id));
        }
        else if (!foundObj && foundObj_before ){
          dispatch(removeEmployeeClient(emp_id,it_id));
        }
      }
    
      setPickerState({...picker_states,target_clients: event.target, source_clients: event.source});
      
    };

    const onProductPickerChange = (event :any ) => {
      // Add those products which are new in target
      const emp_id  =assign_dialog.employee_id;
      var key:any;
      for( key of Object.keys(products) ){
        const it_id =  products[key].id;
        // is in target ?
        const foundObj = event.target.find((item: { id: any; }) => item.id === it_id);
        //was there before?
        const foundObj_before = picker_states.target_products.find((item: { id: any; }) => item.id === it_id);
        if( foundObj && !foundObj_before ){ // if found but wasnt there before add
          dispatch(addEmployeeProduct(emp_id, it_id));
        }
        else if (!foundObj && foundObj_before ){
          dispatch(removeEmployeeProduct(emp_id, it_id));
        }
      } 

      setPickerState({...picker_states,target_products: event.target, source_products: event.source});
      
    };
    /* END PICKER FUNCTIONS */

    useEffect(()=>{
      renderPickers_products();
     
    },[employeeProducts,products,productsError]);
    useEffect(()=>{
      renderPickers_clients();
     
    },[clients, employeeClients, employeeError]);

    const employeeCards = () => {
      const cards = [];
      var key : any = 0;
      for( key of Object.keys(employee)) {
       cards.push(employeeCard(employee[key],onEmployeeClick,onClickaddClients,onClickaddProducts,removeUser));
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

        <ConfirmDialog />

        <div className={(employeeError || productsError)  ? "error visible" : "hidden"}>
            <Message severity="error" 
            text={(employeeError ? employeeErrMsg.toString(): "") + (productsError ? productsErrMsg.toString(): "")} />
        </div>
        
        {employeeCards()}
      
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
        </Dialog>
          
      <Dialog header={ (assign_dialog.clientMode) ? "Assign clients" : "Assign products"} className="edit-user" visible={assign_dialog.show} 
      style={{ width: '50vw' }} onHide={() => setAssignDialog({...assign_dialog, show: false})}>
            
      <PickList 
      source={ (assign_dialog.clientMode) ? picker_states.source_clients : picker_states.source_products} 
      target={ (assign_dialog.clientMode) ? picker_states.target_clients : picker_states.target_products} 
      onChange={ (assign_dialog.clientMode) ? onClientPickerChange : onProductPickerChange } 
      itemTemplate={itemTemplate} filter filterBy="name" breakpoint="1400px"
                sourceHeader="Available" targetHeader="Selected" sourceStyle={{ height: '30rem' }} targetStyle={{ height: '30rem' }}
                sourceFilterPlaceholder="Search by name" targetFilterPlaceholder="Search by name" /> 
    
      </Dialog>

      </>
    );

    
   
  
}
   
export default Employees;
