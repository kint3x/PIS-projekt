import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";

import { loadRequest as loadEmployees } from '../../store/ducks/employee/actions';
import { updateRequest as updateEmployee } from '../../store/ducks/employee/actions';
import { removeRequest as removeEmployee } from '../../store/ducks/employee/actions';
import { createRequest as addEmployee } from '../../store/ducks/employee/actions'

import { loadRequest as loadProducts } from '../../store/ducks/product/actions';
import { addEmployeeRequest as addProductEmployee } from '../../store/ducks/product/actions';
import { removeEmployeeRequest as removeProductEmployee } from '../../store/ducks/product/actions';
import { loadProductsRequest as loadEmployeeProducts } from '../../store/ducks/employee/actions';
import { addProductRequest as addEmployeeProduct } from '../../store/ducks/employee/actions';
import { removeProductRequest as removeEmployeeProduct } from '../../store/ducks/employee/actions';

import { AppState } from '../../store';

import { DataTable, DataTableValueArray , DataTableRowClickEvent } from 'primereact/datatable';
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

//TODO page availabe only for manager

const Employees = () => {

    // const userType = localStorage.getItem('userType')
    // const history = useHistory();
    // if (userType !== 'owner')
    //   console.log(userType)
    //   history.push("/")

    const dispatch = useDispatch();
    
    const [show_dialog,setShowDialog] = useState(false);
    const [show_add_dialog,setShowAddDialog] = useState(false);
    const [selected_employee, setSelectedEmployee] = useState<any>({});
    const [selectProducts, setSelectedProducts] = useState<any>({add: 0, remove: 0, remove_opt: [], add_opt: []});

    useEffect(() => {
      dispatch(loadEmployees('all'));
      dispatch(loadProducts('all'));
    }, [dispatch,setShowDialog,setShowAddDialog]);   

    const employees = useSelector((state: AppState) => state.employee.data);
    const loading = useSelector((state: AppState) => state.employee.loading);
    const error = useSelector((state: AppState) => state.employee.error);
    const errMsg = useSelector((state: AppState) => state.employee.errMsg);


    const products = useSelector((state: AppState) => state.product.data);
    const productsLoading = useSelector((state: AppState) => state.product.loading);
    const employeeProducts = useSelector((state: AppState) => state.employee.products);
        
    const [modal_err_msg, setModalErr] = useState<any>({visible: "hidden", msg: ""});
    const [new_employee, setNewEmployee] = useState<any>({});


    useEffect(() => {
      calculateAddRemoveItems();
    },[productsLoading, loading]);


    var password_change = "";
    
    function onInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) {
      const { value } = event.target;
      setSelectedEmployee((prevState: any) => ({
        ...prevState,
        [key]: value
      }));
    }

    function onClickHandle(event: DataTableRowClickEvent) : void{
      setSelectedEmployee(event.data);
      dispatch(loadEmployeeProducts(event.data.id));
      if(!loading && !productsLoading){
        setShowDialog(true);
      }
      
    }

    function onUserEdit() : void{
      dispatch(updateEmployee(selected_employee.id, {...selected_employee, password: (password_change == "") ? selected_employee.password : password_change }));

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
        dispatch(removeEmployee(selected_employee.id));
        if(!error){
          setShowDialog(false);
          setModalErr({msg: "", visible: "hidden"})
        }
        else{
          setModalErr({msg: errMsg, visible: ""})
          setShowDialog(true);
        }
    }

    function AddUserSubmit(){
      dispatch(addEmployee(new_employee));
      if(!error){
        setShowAddDialog(false);
        setModalErr({msg: "", visible: "hidden"});
      }
      else{
        setModalErr({msg: errMsg, visible: ""})
        setShowAddDialog(true);
      }
    }
    
    function onAddSelectedProduct(){
      const empl_id = selected_employee.id;
      const product_id = selectProducts.add;
      dispatch(addEmployeeProduct(empl_id,product_id));
    }

    function onRemoveSelectedProduct(){
      dispatch(removeEmployeeProduct(selected_employee.id,selectProducts.remove))
    }

    function calculateAddRemoveItems(){
      setSelectedProducts({...selectProducts, 
        remove_opt: Object.values(employeeProducts),
        add_opt: 
        Object.values(products).filter(it => !((Object.values(employeeProducts)).map(item => item.id)).includes(it.id) )
      });
      
    }

    return(
      <>
        <div className='page-heading'><h1>Employees</h1><br /></div>
        <Button label="Add" severity="success" onClick={()=>setShowAddDialog(true)}/>
        <DataTable loading={loading} value={Object.values(employees)} tableStyle={{ minWidth: '50rem' }} 
        onRowClick={onClickHandle}
        >
          <Column field="id" header="ID"></Column>
          <Column filter={true} field="name" header="Name"></Column>
          <Column filter={true} field="surname" header="Surname"></Column>
          <Column filter={true}  field="username" header="Username"></Column>
        </DataTable>

        <Dialog header="Edit User" className="edit-user" visible={show_dialog} style={{ width: '50vw' }} 
        onHide={() => {setShowDialog(false); setSelectedProducts({...selectProducts, add:0, remove:0})}}>
          <div className={modal_err_msg.visible}>
            <Message severity="error" text={modal_err_msg.msg} />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Username</span>
            <InputText placeholder="Username" value={selected_employee.username} 
            onChange={(e) => onInputChange(e, 'username')} />
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Password</span>
            <InputText placeholder="Password" onChange={(e) => {password_change = e.target.value}}/>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex align-items-center">
                <RadioButton inputId="Worker" name="type" value="Worker" onChange={(e)=>setSelectedEmployee({...selected_employee, type: "Worker"})} 
                checked={selected_employee.type == "Worker"} />
                <label htmlFor="Worker" className="ml-2">Worker</label>
            </div>
            <div className="flex align-items-center">
                <RadioButton inputId="Manager" name="type" value="Manager" onChange={(e)=>setSelectedEmployee({...selected_employee, type: "Manager"})} checked={selected_employee.type == "Manager"} />
                <label htmlFor="Manager" className="ml-2">Manager</label>
            </div>
            <div className="flex align-items-center">
                <RadioButton inputId="Owner" name="type" value="Owner" onChange={(e)=>setSelectedEmployee({...selected_employee, type: "Owner"})} checked={selected_employee.type == "Owner"} />
                <label htmlFor="Owner" className="ml-2">Owner</label>
            </div>
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Email</span>
            <InputText placeholder="Email"  value={selected_employee.email} 
            onChange={(e) => onInputChange(e, 'email')} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Name</span>
            <InputText placeholder="Name" value={selected_employee.name}
            onChange={(e) => onInputChange(e, 'name')} />
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Surname</span>
            <InputText placeholder="Surname" value={selected_employee.surname}
            onChange={(e) => onInputChange(e, 'surname')} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">DOB</span>
            <Calendar
              showIcon={true}
              value={new Date(selected_employee.dob)}
              onChange={(e) => 
                {
                  if(e.value instanceof Date) setSelectedEmployee({...selected_employee, dob: format(e.value, "yyyy-MM-dd")+"T00:00:00"})
                }
              }
              dateFormat="yy-mm-dd"
                  />
          </div>
          

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Phone</span>
            <InputText placeholder="Phone" value={selected_employee.phone}
            onChange={(e) => onInputChange(e, 'phone')} />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Address</span>
            <InputTextarea style={{ height: '50px' }} placeholder="Address" value={selected_employee.address}
            onChange={(e) => onInputChange(e, 'address')} />
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Add product</span>
            <Dropdown value={selectProducts.add} onChange={(e) => setSelectedProducts({...selectProducts, add: e.value})} placeholder="Select a product"
                optionLabel="name" optionValue="id" 
                options={selectProducts.add_opt} className="w-full md:w-14rem" />
            <Button label="Add" severity="success" 
            onClick={()=> onAddSelectedProduct() } />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Remove product</span>
            <Dropdown value={selectProducts.remove} onChange={(e) => setSelectedProducts({...selectProducts, remove: e.value})} placeholder="Select a product"
                optionLabel="name" optionValue="id" options={selectProducts.remove_opt} className="w-full md:w-14rem" />
            <Button label="Remove" severity="success" 
             onClick={()=> onRemoveSelectedProduct()}/>
          </div>

          <Button label="Submit" severity="success" onClick = {() => onUserEdit()} />
          <Button label="Delete" severity="danger"  onClick = {() => onUserDelete()} className="float-right"/>
      </Dialog>

      <Dialog header="Add User" className="add-user" visible={show_add_dialog} style={{ width: '50vw' }} onHide={() => setShowAddDialog(false) }>
          <div className={modal_err_msg.visible}>
            <Message severity="error" text={modal_err_msg.msg} />
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Username</span>
            <InputText placeholder="Username" onChange={(e)=>setNewEmployee({...new_employee, username: e.target.value})}/>
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Password</span>
            <Password placeholder="Password" onChange={(e)=>setNewEmployee({...new_employee, password: e.target.value})}/>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex align-items-center">
                <RadioButton inputId="Worker" name="type" value="Worker" 
                onChange={(e)=>setNewEmployee({...new_employee, type: "Worker"})}
                checked={new_employee.type == "Worker"}/>
                <label htmlFor="Worker" className="ml-2">Worker</label>
            </div>
            <div className="flex align-items-center">
                <RadioButton inputId="Manager" name="type" value="Manager" 
                onChange={(e)=>setNewEmployee({...new_employee, type: "Manager"})}
                checked={new_employee.type == "Manager"}/>
                <label htmlFor="Manager" className="ml-2">Manager</label>
            </div>
            <div className="flex align-items-center">
                <RadioButton inputId="Owner" name="type" value="Owner" 
                onChange={(e)=>setNewEmployee({...new_employee, type: "Owner"})}
                checked={new_employee.type == "Owner"}/>
                <label htmlFor="Owner" className="ml-2">Owner</label>
            </div>
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Email</span>
            <InputText placeholder="Email" onChange={(e)=>setNewEmployee({...new_employee, email: e.target.value})}/>
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Name</span>
            <InputText placeholder="Name" onChange={(e)=>setNewEmployee({...new_employee, name: e.target.value})}/>
          </div>
          
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Surname</span>
            <InputText placeholder="Surname" onChange={(e)=>setNewEmployee({...new_employee, surname: e.target.value})}/>
          </div>

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">DOB</span>
            <Calendar
              showIcon={true}
              onChange={(e) => 
                {
                  if(e.value instanceof Date) setNewEmployee({...new_employee, dob: format(e.value, "yyyy-MM-dd")+"T00:00:00"})
                }
              }
              dateFormat="yy-mm-dd"
                  />
          </div>
          

          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Phone</span>
            <InputText placeholder="Phone" onChange={(e)=>setNewEmployee({...new_employee, phone: e.target.value})}/>
          </div>
          <div className="p-inputgroup">
            <span className="p-inputgroup-addon">Address</span>
            <InputTextarea style={{ height: '50px' }} placeholder="Address" onChange={(e)=>setNewEmployee({...new_employee, address: e.target.value})}/>
          </div>

          <Button label="Submit" severity="success" onClick = {() => AddUserSubmit()} />
        </Dialog>
      </>
    );

    
   
  
}
   
export default Employees;
