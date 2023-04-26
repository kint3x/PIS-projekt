import React from 'react'
import LoginForm from "./LoginForm"


const Home = () => {

  localStorage.clear()

  return (
    <div className="home">
      <LoginForm />
    </div>
  );
}

export default Home;
