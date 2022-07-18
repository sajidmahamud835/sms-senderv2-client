import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import initializeAuthentication from "../firebase/FirebaseInit";

initializeAuthentication();

const UseFirebase = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [isAdminLoading, setAdminIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const GoogleProvider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    return signInWithPopup(auth, GoogleProvider).finally(() => {
      setLoading(false);
    });
  };

  const registerByEmailPass = (email, password, name, userTotalData) => {
    console.log(userTotalData);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        navigate("/dashboard");
        setUser(result.user);
        // send to database
        saveUser(email, name, userTotalData, "POST");
        // ================
        updateProfile(auth.currentUser, { displayName: name }).then(
          (result) => {
            navigate("/");
          }
        );
        setUser(result.user);
        setError("");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const logInEmailPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        setUser(result.user);
        navigate("/dashboard");
        setError("");
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then((result) => {
        setError("");
      }
      ).catch((error) => {
        setError(error.code);
      }
      );
  }

  const logOut = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .finally(() => setLoading(false));
  };

  // console.log(SubscriptionsRows);

  const saveUser = (email, displayName, userTotalData, method) => {
    console.log(userTotalData);
    const user = {
      email,
      displayName,
      subscriptions: "none",
      ...userTotalData,
    };
    // send user data to database
    fetch(`${process.env.REACT_APP_SERVER_URL}/users`, {
      method: method,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 403 || res.status === 401) {
          navigate('/login');
        } else {
          return res.json();
        }
      })
      .then((data) => console.log(data));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setError("");
      } else {
        setUser({});
      }
      setLoading(false);
    });
    return () => unsubscribe;
  }, [auth]);

  useEffect(() => {
    setAdminIsLoading(true);
    if (user.email) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/admin/check/${user.email}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem('accessToken')}`
        },
      })
        .then((res) => {
          if (res.status === 403 || res.status === 401) {
            navigate('/login');
          } else {
            return res.json();
          }
        }
        ).then((data) => {
          if (data.isAdmin) {
            setAdmin(true);
          }
          setAdminIsLoading(false);
        }
        );
    }
  }, [navigate, user?.email]);

  return {
    handleGoogleSignIn,
    user,
    admin,
    error,
    logOut,
    loading,
    registerByEmailPass,
    logInEmailPassword,
    isAdminLoading,
    resetPassword,
  };
};

export default UseFirebase;
