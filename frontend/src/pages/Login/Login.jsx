import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import md5 from "md5";
import "react-toastify/dist/ReactToastify.css";
import Lottie from "react-lottie";
import loginPageAnimation from "./LoginPage.json";
import InputElement from "./InputElement";
import CustomBtn2 from "../../components/CustomBtn2";
import "./LoginUser.css";

const defaultOptionsRecruiter = {
  loop: true,
  autoplay: true,
  animationData: loginPageAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // checking for empty fields
    if (username === "") {
      toast.error("Username is required");
      return;
    } else if (password === "") {
      toast.error("Password is required");
      return;
    }

    // sending request to server
    setIsLoading(true);

    const password_hash = md5(password);
    setPassword("");


    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userid: username,
            password_hash,
          }),
        }
      );
      const json = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        toast.error(json.msg);
      } else {
        setUsername("");
        toast.success(json.msg);

        localStorage.setItem("token", json.data.token);
        const expiration = new Date();
        expiration.setDate(expiration.getDate() + 5);
        localStorage.setItem("expiration", expiration.toISOString());
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to login, Try again later!");
      setIsLoading(false);
    }
  };

  return (
    <div className="Login-user-container">
      <div className="Login-Recuiter-image-container">
        <div className="p-12">
          <Lottie
            options={defaultOptionsRecruiter}
            height="h-fit"
            width="w-fit"
          />
        </div>
      </div>
      <form onSubmit={handleLogin} className="Login-Form w-full px-24 md:px-48">
        <h1 className=" text-white font-semibold text-3xl mb-7">
          Welcome Back!
        </h1>
        <InputElement
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={false}
          type="text"
        />
        <InputElement
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={false}
          type="password"
        />

        <div className="mt-3 w-full">
        <CustomBtn2
          children="Sign In"
          onClick={handleLogin}
          isLoading={isLoading}
          loadingText="Logging In.."
        />
        </div>
      </form>
    </div>
  );
}

export default Login;
