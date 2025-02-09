import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic"
import { app } from "../firebase/firebase.config";

const auth = getAuth(app);

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ isLoading, setLoading ] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic()

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = ()=>{
    setLoading(true)
    return signInWithPopup(auth, googleProvider);
  }

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if(currentUser){
        // get token and store client
        const userInfo = {email: currentUser.email}
        axiosPublic.post('/jwt', userInfo)
          .then(res =>
          {
            if (res.data.token) {
              localStorage.setItem('access-token', res.data.token);
              setLoading(false);
            }
          })
      } else{
        // TODO: remove token (if token stored in the client side)
        localStorage.removeItem('access-token')
        setLoading(false);
      }
    });
    return () => unsubscribe;
  }, [axiosPublic]);

  const authInfo = {
    user,
    isLoading,
    createUser,
    updateUserProfile,
    signIn,
    googleSignIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
