import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router";
import { setUser } from "store/slices/userSlice";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getStorageEmail = localStorage.getItem("email");
  const getStorageId = localStorage.getItem("id");
  const getStorageToken = localStorage.getItem("token");
  const { email } = useSelector((state) => state.user);
  useEffect(() => {
    if (getStorageEmail && getStorageId && getStorageToken) {
      dispatch(
        setUser({
          email: getStorageEmail,
          token: getStorageToken,
          id: getStorageId,
        })
      );
    }
  }, [email, getStorageEmail]);

  if (!getStorageEmail && !email) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export { RequireAuth };
