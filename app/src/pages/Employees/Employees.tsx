import React from 'react'

import store from '../../store';
import { loadRequest } from '../../store/ducks/employee/actions';

const Employees = () => {

    let test = loadRequest("all")

    console.log(test);
    return (
        <h1>Employees</h1>
    );
  
}
   
export default Employees;