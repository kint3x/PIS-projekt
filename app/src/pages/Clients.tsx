import React from 'react'
import ClientsTable from "./ClientsTable";
import useFetch from "../utils/useFetch";
import {useHistory} from "react-router-dom";

const Clients = () => {

    const { data,  setData, isPending, error} = useFetch('http://localhost:8000/clients')

    const history = useHistory();

    const handleClick = (id:any) => {
      history.push(`/worker/clients/${id}`);
    }

    return (
        <div>
          { error && <div>{ error }</div> }
          { isPending && <div>Loading...</div> }
          { data && <ClientsTable data={data} method={handleClick}/>}
        </div>
    );

}
   
export default Clients;