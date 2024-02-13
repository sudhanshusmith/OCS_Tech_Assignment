import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import CustomBtn2 from "../../components/CustomBtn2";

function LoggedOut() {
  const navigate = useNavigate();


  function goToLogin() {  
    navigate('/', {replace: true})
  }

  return (
    <div id="logout-success" className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-semibold mb-5 text-center px-5" style={{color: "white"}}>You have been Logged Out</h1>
      <p style={{color: "white"}} className='text-center px-6 text-sm'>This can be beacuse of either you tried logging out or your session have been expired</p>
      
      <div className='my-10 flex w-full justify-center'>
      <div className='ml-2 w-5/12 md:w-2/12' onClick={goToLogin}><CustomBtn2>Login Again!</CustomBtn2></div>
      </div>
    </div>
  )
}

export default LoggedOut