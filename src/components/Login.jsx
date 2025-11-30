import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";
import { addUser } from "../utils/userSlice"; 
import { useDispatch } from "react-redux";

  const Login = () => {
     const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
      const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

            const dispatch = useDispatch();
               const navigate = useNavigate();

           const handleAuth = async () => {
        try {
             if (isLogin) {
           const res = await axios.post(
          `${BASE_URL}/login`,
          { username, password },
          { withCredentials: true }
        );

          localStorage.setItem("token", res.data.token);

          dispatch(addUser(res.data)); 
            navigate("/dashboard");
           } else {
        const res = await axios.post(
          `${BASE_URL}/register`,
          { username, emailId, password },
          { withCredentials: true }
        );

        localStorage.setItem("token", res.data.token);

           dispatch(addUser(res.data));
         navigate("/dashboard");
            }
         } catch (err) {
           setError(err.response?.data?.error || err.message || "Something went wrong!");
           }
          };

           const handleSubmit = (e) => {
             e.preventDefault();
               setError("");

               if (!username || !password || (!isLogin && !emailId)) {
                 setError("Please fill all required fields.");
                   return;
                     }

                 handleAuth();
                  };

      return (
              <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
         <div className="w-full max-w-sm bg-white p-8 rounded-xl shadow-md border border-gray-200">
             <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
               {isLogin ? "Login" : "Sign Up"}
              </h1>

           {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-gray-700 text-sm mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-100 px-3 py-2 rounded-lg border outline-none focus:border-blue-500"
            />
          </div>

          {!isLogin && (
            <div className="flex flex-col">
              <label className="text-gray-700 text-sm mb-1">Email</label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full bg-gray-100 px-3 py-2 rounded-lg border outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div className="flex flex-col">
            <label className="text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 px-3 py-2 rounded-lg border outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-4 text-center">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Sign in
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
