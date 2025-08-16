import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';
import axios from 'axios';
const BASE_URL ="http://localhost:5000"

export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,

    checkAuth:async()=>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser:res.data});
  
        } catch (error) {
            console.log("Error in checkAuth:",error);
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true});
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register",data);
            set({authUser:res.data});
            toast.success("Account created Succesfully");

            
        } catch (error) {
            console.log("error");
            
            toast.error(error.response);
        }finally{
            set({isSigningUp:false});
        }
    },

    login:async(data) =>{
        set({isLoggingIng:true});
        try {
            console.log("Logging in with data:", data);
            
            const res = await axios.post("http://localhost:5000/api/auth/login",data);
            
            
            set({authUser:res.data});
            toast.success("Logged in Succesfully");

            
        } catch (error) {
            toast.error(error.response);
        }finally{
            set({isLoggingIng:false});
        }
    },

    logout:async()=>{
        try {
            await axios.post("http://localhost:5000/api/auth/logout");
            set({authUser:null});
            toast.success("Logged out succesfully");
           
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
}));

