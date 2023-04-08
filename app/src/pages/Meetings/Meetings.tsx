import React from 'react'
import MeetingsTable from "./MeetingsTable";
import useFetch from "../../utils/useFetch";
import {useHistory} from "react-router-dom";

const Meetings = () => {

  const { data, isPending, error} = useFetch('http://localhost:8000/meetings')

  const history = useHistory();

  const showDetail = (id:any) => {
    history.push(`/meetings/${id}`);
  }

  const addNewItem = () => {
    console.log("add")
  }

  return (
      <div>
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        { data && <MeetingsTable data={data} buttonsNum={"1"} button1name="Detail" button1OnClick={showDetail} addEnabled={true} addOnClick={addNewItem}/>}
      </div>
  );
}
   
export default Meetings;