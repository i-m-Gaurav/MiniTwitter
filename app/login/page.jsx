
'use client'
import React, { useEffect, useState } from "react";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider,onAuthStateChanged  } from "firebase/auth";
import firebase from '@/utils/firebaseInfo';
import Image from "next/image";
import Todos from "@/components/Todos";
import Nav from "@/components/Nav";

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState(null); // Define the 'todos' state
  const [showLoginButton, setShowLoginButton] = useState(true);


  const auth = getAuth();

  


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {

        setUser(user);
        if (todos) {
            saveTodoList(todos);
          }

        // User is signed in
        // Perform actions for an authenticated user
      } else {

        // User is signed out
        // Perform actions for a signed-out user
      }
    });

    // Clean up the subscription when component unmounts
    return () => unsubscribe();
  }, [auth,todos]);

  const signInWithGoogle = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(result => {
        // Google sign-in successful, handle the authenticated user
        const user = result.user;

        // Perform actions for an authenticated user
      })
      .catch(error => {
        // Handle errors during Google sign-in
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const handleLoginWithGoogle = () => {
    setShowLoginButton(false);
    signInWithGoogle();
  };

  return (
    <div>
          <Nav user={user}  handleSignOut={handleSignOut}/>

    {!user && (
      <OneTimeComponent onClick={handleLoginWithGoogle} />




    )}

    {user && (
      <Todos userId={user.uid} user= {user}/>

    )}
    </div>
  
    
  );
};

const OneTimeComponent = ({ onClick }) => {
  return (
    <div className="flex items-center justify-center max-h-64">
      <div className="bg-gray-200 rounded-lg p-8">
        <button
          className="flex items-center justify-center bg-white rounded-full p-4"
          onClick={onClick}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};
export default LoginPage;
