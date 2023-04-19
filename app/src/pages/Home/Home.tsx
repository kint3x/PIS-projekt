import React from 'react'
import LoginForm from "./LoginForm"


const Home = ({method}:any) => {

  localStorage.clear()

    return (
      <div className="home">
        <LoginForm method={method}/>
      </div>
    );
  }
   
  export default Home;
  