import { createContext, use, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

// Set the base URL for axios requests
const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;
console.log("Backend URL:", backendUrl);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [socket, setSocket] = useState([]);

  //   check if user is authenticated and if so , set the user data and connect the socket
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (err) {
      console.error("Error checking authentication:", err);
      toast.error(err.message);
    }
  };

  //  login function to handle user authentication and socket connection
  const login = async (state , credentials) => {
   try{
    const {data} = await axios.post(`/api/auth/${state}`, credentials);
    if(data.success){
      setAuthUser(data.userData)
      connectSocket(data.userData);
      axios.defaults.headers.common["token"] = data.token;
      setToken(data.token)
      localStorage.setItem("token", data.token);
      toast.success(data.message);
    }else{
      toast.error(data.message);
    }
   }catch(err){
      console.error("Error during login:", err);
      toast.error(err.message);
    }
   }
  }


  // logout function to handle user logout and disconnect the socket
  const logout = async () => {}




  // connect socket fucntion to handle socket connection and online users updates

  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
    });
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUser(userIds);
    });
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["token"] = token;
    }
    checkAuth();
  }, []);
  const value = { axios, authUser, onlineUser, socket };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
