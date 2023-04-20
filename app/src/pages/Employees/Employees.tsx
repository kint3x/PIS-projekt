import React from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { loadRequest as loadEmployees } from '../../store/ducks/employee/actions';
import { AppState } from '../../store';

const Employees = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(loadEmployees('all'));
    }, [dispatch]);

    const employees = useSelector((state: AppState) => state.employee.data);
    const loading = useSelector((state: AppState) => state.employee.loading);
    const error = useSelector((state: AppState) => state.employee.error);

    console.log(employees);

    // TODO: Render employees
    // TODO: Render loading screen if loading
    // TODO: Don't display when error

    return (
      <h1>Employees</h1>
    );
  
}
   
export default Employees;