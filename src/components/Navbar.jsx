import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/Constant";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleLogout = async()=>{
    try { 
      await axios.post(BASE_URL + "/logout",{} ,
       {withCredentials: true,
        });
        dispatch(removeUser())
        navigate("/login")
      }
       catch(err){
        console.log(err);
       }
       
  }

  return (
    <nav className="w-full  bg-gray-200 shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800">{user && (
          <span className="text-gray-700 font-bold mt-2">Welcome, {user.username}</span>
        )}</div>

      <div className="flex items-center gap-4">
        
        <button
          onClick={handleLogout}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
