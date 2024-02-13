import React from 'react'
import { NavLink, useRouteError } from "react-router-dom";
import CustomBtn2 from '../../components/CustomBtn2';
function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center text-white'>
      <h1 className='text-4xl font-bold mb-2 text-red-500'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>

      <NavLink className=" mt-3" to="/">
        <CustomBtn2
          children="Go to Home"
          loadingText="Logging In.."
        />
        </NavLink>
    </div>
  )
}

export default ErrorPage