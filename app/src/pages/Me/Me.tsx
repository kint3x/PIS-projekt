import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState} from 'react';

import { loadRequest as loadEmployees } from '../../store/ducks/employee/actions';
import { createRequest as addEmployee } from '../../store/ducks/employee/actions';
import { updateRequest as updateEmployee } from '../../store/ducks/employee/actions';
import { removeRequest as removeEmployee } from '../../store/ducks/employee/actions';
import { loadClientRequest as empLoadClients } from '../../store/ducks/employee/actions';

import { loadProductsRequest as loadEmployeeProducts } from '../../store/ducks/employee/actions';
import { loadRequest as loadProducts } from '../../store/ducks/product/actions';
import { loadRequest as loadClients } from '../../store/ducks/client/actions';

import { AppState } from '../../store';
import "primeicons/primeicons.css";

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
import { EmployeeModel } from '../../store/ducks/employee/types';

const Me = () => {
    const dispatch = useDispatch();
    const employeeId = Number(localStorage.getItem('employeeId'));
    
    useEffect(() => {
      dispatch(loadEmployees(employeeId));
    }, [dispatch]);

    const employee: EmployeeModel = useSelector((state: AppState) => state.employee.data[employeeId]);
    const loading: boolean = useSelector((state: AppState) => state.employee.loading);
    const error: boolean = useSelector((state: AppState) => state.employee.error);
    const errMsg: string = useSelector((state: AppState) => state.employee.errMsg);

    const [data, setDialogData] = useState<any>({
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
    });

    useEffect(() => {
      setDialogData({
        ...employee,
        addMode: false,
        UpLoading:false,
        UpLoaded: false,
        password: ""
      });
    }, [employee]);

    function editUser() {
      dispatch(updateEmployee(data.id, data));
    }

    const onUpload = (event: FileUploadUploadEvent  ) => {
      setDialogData({...data, UpLoading: false, UpLoaded: false, image: event.xhr.responseText});
    };

    const onUplError = () => {
      setDialogData({...data, UpLoading: false, UpLoaded: false});
    };

    return !loading && (
      <>
        <div className="page-heading">
            <img src={" " + data.image} className={(data.image != "") ? "image-profile" : "hidden"} alt="Image" width="250" />
            &emsp;
            <h1>My Profile</h1>
        </div>

        <div className={(error)  ? "error visible" : "hidden"}>
            <Message severity="error" 
            text={(error ? errMsg.toString(): "")} />
        </div>

        <div className="flex flex-wrap justify-content-left">
          <FileUpload mode="basic" name="image" 
            url="http://matejka.xyz/api/"
            accept="image/*" maxFileSize={1000000} auto chooseLabel={ data.UpLoaded ? "Uploaded" : "Image" } 
            className={data.UpLoaded ? "uploaded-btn" : "" }
            onBeforeUpload={()=> { setDialogData({...data, UpLoading: true})}}
            onUpload={onUpload}
            onError={onUplError}
            style={{paddingBottom: "5px"}}
          />
          <ProgressSpinner className={data.UpLoading ? "" : "hidden"} style={{width: '30px', height: '30px' , margin: "0", marginTop: "auto", marginBottom: "auto"}} 
          strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        </div>

        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">Username</span>
          <InputText placeholder="Username" value={data.username} 
          onChange={(e) => setDialogData({...data, username: e.target.value})} />
        </div>

        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">Password</span>
          <Password placeholder="Password" value={data.password} 
          onChange={(e) => setDialogData({...data, password: e.target.value})}/>
        </div>

        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">Email</span>
          <InputText placeholder="Email"  value={data.email} 
            onChange={(e) => setDialogData({...data, email: e.target.value})} />
        </div>

        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">Name</span>
          <InputText placeholder="Name" value={data.name}
            onChange={(e) => setDialogData({...data, name: e.target.value})} />
        </div>

        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">Surname</span>
          <InputText placeholder="Surname" value={data.surname}
          onChange={(e) => setDialogData({...data, surname: e.target.value})} />
        </div>

        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">DOB</span>
          <Calendar
            showIcon={true}
            value={new Date(data.dob)}
            onChange={(e) => 
              {
                if(e.value instanceof Date) setDialogData({...data, dob: format(e.value, "yyyy-MM-dd")+"T00:00:00"})
              }
            }
            dateFormat="yy-mm-dd"
                />
        </div>

        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">Phone</span>
          <InputText placeholder="Phone" value={data.phone}
          onChange={(e) => setDialogData({...data, phone: e.target.value})}  />
        </div>

        <div className="p-inputgroup">
          <span className="p-inputgroup-addon">Address</span>
          <InputTextarea style={{ height: '50px' }} placeholder="Address" value={data.address}
          onChange={(e) => setDialogData({...data, address: e.target.value})} />
        </div>

        <Button onClick={ editUser }  label={"Edit"} severity="success" className="customAdd customSubmit" style={{width: "100%"}}/>
      </>
    );
}

export default Me;
