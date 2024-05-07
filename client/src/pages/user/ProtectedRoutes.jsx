import React from "react";
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";


export const ProtectedRoutes = ({ children }) => {

  const isUserLoggedIn = useSelector((state) => state.user.isUserAuth)
  console.log(isUserLoggedIn)
  if (!isUserLoggedIn) {
    return <Navigate to={'/'} />
  } else {
    return children
  }
}
