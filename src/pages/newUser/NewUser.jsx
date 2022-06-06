import { useState } from "react";
import "./newUser.css";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import FirebaseApp from "../../firebase/FirebaseApp";
import { Alert } from "react-bootstrap";
import React from 'react';

const NewUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth(FirebaseApp);
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const createUser = (e, email, password) => {
    e.preventDefault();
    createUserWithEmailAndPassword(email, password);
  }
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <div className="" style={{ width: "800px" }}>
        <div className="mt-2">
          {loading && <h4 className="text-center">Sending...</h4>}
          {user && (
            <Alert variant="success">
              <h5 className="text-center">User successfully created.</h5>
            </Alert>
          )}
          {error && (
            <Alert variant="danger">
              <h5 className="text-center">{error.message}</h5>
            </Alert>
          )}
        </div>
      </div>
      <form className="newUserForm">
        <div className="newUserItem">
          <label>Username</label>
          <input type="text" placeholder="john32" disabled />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input type="text" placeholder="John Smith" disabled />
        </div>
        <div className="newUserItem">
          <label>Email</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="john@gmail.com" />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" />
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" disabled />
        </div>
        <div className="newUserItem">
          <label>Address</label>
          <input type="text" placeholder="New York | USA" disabled />
        </div>
        <div className="newUserItem">
          <label>Gender</label>
          <div className="newUserGender">
            <input type="radio" name="gender" id="male" value="male" disabled />
            <label for="male">Male</label>
            <input type="radio" name="gender" id="female" value="female" disabled />
            <label for="female">Female</label>
            <input type="radio" name="gender" id="other" value="other" disabled />
            <label for="other">Other</label>
          </div>
        </div>
        <div className="newUserItem">
          <label>Active</label>
          <select className="newUserSelect" name="active" id="active" disabled>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
        <div>
          <span className="d-block mt-3">After creating the user, you will be logged as the new user.</span>
          <button onClick={(e) => createUser(e, email, password)} className="newUserButton">Create New User</button>
        </div>
      </form>
    </div>
  );
};

export default NewUser;

