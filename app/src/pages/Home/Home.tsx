import React from 'react'
import LoginForm from "./LoginForm"


const Home = ({ method }: any) => {

  localStorage.clear()
  method("", "")

  return (
    <div className="home">
      <LoginForm method={method} />
    </div>
  );
}

export default Home;
