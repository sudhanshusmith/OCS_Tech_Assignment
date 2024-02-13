import { React, useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getTokenDuration } from "./utils/auth";

function Root() {
  const token = useLoaderData();
  // console.log(token);
  const submit = useSubmit();
  // const navigation = useNavigation();
  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "get" });
      return;
    }

    const tokenDuration = getTokenDuration();
    // console.log(tokenDuration);

    setTimeout(() => {
      submit(null, { action: "/logout", method: "get" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Outlet />
    </>
  );
}

export default Root;
