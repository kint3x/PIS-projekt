import React from 'react'
import MeetingsTable from "./MeetingsTable";
import useFetch from "../utils/useFetch";
import {useHistory} from "react-router-dom";

const Meetings = () => {

  const { data, isPending, error} = useFetch('http://localhost:8000/meetings')

  const history = useHistory();

  const handleClick = (id:any) => {
    history.push(`/worker/meetings/${id}`);
  }

  return (
      <div>
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        { data && <MeetingsTable data={data} method={handleClick}/>}
      </div>
  );
}
   
export default Meetings;