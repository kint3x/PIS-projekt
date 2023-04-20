import React from 'react'

import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loadRequest } from '../../store/ducks/employee/actions';
import store from '../../store';
i
const Employees = () => {
    const dispatch = useDispatch();
   let r;

    useEffect(() => {
      r = dispatch(loadRequest("all"));
    }, []);



    return (
      <Provider store={store}> // Set context
      <h1>Employees F {JSON.stringify(r)}</h1>
      </Provider>
    );
      
    
  
}
   
export default Employees;