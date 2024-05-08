import React, { Children } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children})=>{
  const isAdminLoggedIn = useSelector((state)=>state.admin.isAdminAuth);
  

  if(!isAdminLoggedIn){
    return <Navigate to ={'/adminLogin'}/>
  }else{
    return children
  }
}