import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/loadingSpinner/LoadingSpinner";
import UseFirebase from "../Hooks/UseFirebase";

const VerifyRoute = ({ children, ...rest }) => {
  const { user, loading } = UseFirebase();
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUser, setIsUser] = useState(false);
  // console.log(user)
  useEffect(() => {
    const url = `http://localhost:4000/users`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDatas(data);
        setIsLoading(false);
      });
  }, [user]);

  useEffect(() => {
    const find = datas.find((data) => data?.email === user?.email);
    if (find?.displayName.length > 1) {
      setIsUser(true);
      console.log("find", find.displayName);
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
