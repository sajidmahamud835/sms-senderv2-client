import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import UseFirebase from "../Hooks/UseFirebase";

const VerifyRoute = ({ children, ...rest }) => {
  const { user, loading } = UseFirebase();
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const url = `${process.env.REACT_APP_SERVER_URL}/users`;
    fetch(url, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          navigate('/login');
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setDatas(data);
        setIsLoading(false);
      });
  }, [user, navigate]);

  useEffect(() => {
    const find = datas?.find((data) => data?.email === user?.email);
    if (find?.isActiveUser !== "no" && find?.displayName.length > 0) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, [datas, user?.email]);

  let location = useLocation();
  if (loading || isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  if (isUser) {
    return children;
  } else {
    return <Navigate to="/verify" state={{ from: location }} />;
  }
};

export default VerifyRoute;
