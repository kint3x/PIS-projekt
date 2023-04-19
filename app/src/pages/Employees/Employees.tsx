import React from 'react'
import EmployeesTable from "./EmployeesTable";
import useFetch from "../../utils/useFetch";
import {useHistory} from "react-router-dom";

const Employees = () => {

    const { data, isPending, error} = useFetch('http://localhost:8000/employees')

    const history = useHistory();

    const showDetail = (id:any) => {
      history.push(`/employees/${id}`);
    }

    const deleteItem = (id:any) => {
      console.log("delete")
    }

    const addNewItem = () => {
      console.log("add")
    }

    return (
        <div>
          { error && <div>{ error }</div> }
          { isPending && <div>Loading...</div> }
          { data && <EmployeesTable data={data} buttonsNum={"2"} button1name="Detail" button1OnClick={showDetail} button2name="Delete" button2OnClick={deleteItem} addEnabled={true} addOnClick={addNewItem}/>}
        </div>
    );
  
}
   
export default Employees;