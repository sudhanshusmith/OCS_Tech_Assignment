import React, { useEffect , useState} from "react";
import CustomBtn2 from "../../components/CustomBtn2";
import { ToastContainer, toast } from "react-toastify";
import { Link, useRouteLoaderData } from "react-router-dom";
import List from "./List";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false); 
  const [data , setData] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  // const token = useRouteLoaderData("root");
  useEffect(() => {
    const abc = localStorage.getItem("token")
    setToken(abc);
  }, [location]);


  const loadDashboard = async(refresh=false) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/dashboard`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      const json = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        toast.error(json.msg);
      } else {
        if (json.role === "admin"){
          setData(json.data);
        }else{
          setData([json.data]);
        }
        setName(json.name);
        setRole(json.role);
        
        if (refresh){
          toast.success("Dashboard refreshed successfully!");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Unable to load dashboard, Try again later!");
      setIsLoading(false);
    }
  }


  useEffect(() => { 
    loadDashboard();
  }, []);

  return (
    <div className="text-white">
      <div className="flex flex-col mt-10 px-8 md:px-20">
        <div className="text-4xl mb-5">
          Hello <span className="font-bold">{name}</span>
        </div>
        <div className="my-3 w-10/12 md:w-5/12 flex">
          <div className="mr-2">
            <CustomBtn2 onClick={() => loadDashboard(true)} children="Refresh" loadingText="Logging Out.." />
          </div>
          <Link to="/logout" className="ml-2">
            <CustomBtn2 children="Log Out" loadingText="Logging Out.." />
          </Link>
        </div>
      </div>

      <div>
        <List data={data} isLoading={isLoading}/>
      </div>

      {role == "admin" ? <p className="my-5 text-center">Note: You role is admin, so you can see details about all users.</p> : <p className="my-5 text-center">Note: You role is basic, so you can only view your details. </p>}
    </div>
  );
}

export default Dashboard;
