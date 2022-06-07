import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import initializeAuthentication from "../firebase/FirebaseInit";

initializeAuthentication()


const UseFirebase = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState({})
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const GoogleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn = () => {
        return signInWithPopup(auth, GoogleProvider)
            .finally(() => { setLoading(false) });
    }
    const registerByEmailPass = (email, password, name) => {
        console.log(email, password, name)
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                navigate('/dashboard')
                console.log(result);
                setUser(result.user);
                updateProfile(auth.currentUser, { displayName: name })
                    .then(result => {
                        navigate('/dashboard')
                    })
                setUser(result.user)
                setError("")
            })
            .catch((error) => {
                setError(error.code);
            });
    }



    const logInEmailPassword = (email, password) => {
        console.log(email, password)
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setUser(result.user);
                navigate('/dashboard')
                setError("")
            })
            .catch((error) => {
                setError(error.code);
            });
    }
    const logOut = () => {
        setLoading(true);
        signOut(auth)
            .then(() => {
                setUser({});
            })
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                setError("")

            }
            else {
                setUser({});
            }
            setLoading(false);
        });
        return () => unsubscribe;
    }, [auth])
    console.log(user.displayName)
    return { handleGoogleSignIn, user, error, logOut, loading, registerByEmailPass, logInEmailPassword }
};

export default UseFirebase;