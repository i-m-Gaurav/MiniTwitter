
'use client'
import React, { useEffect, useState } from "react";
import { getAuth, signInWithPopup, signOut, GoogleAuthProvider,onAuthStateChanged  } from "firebase/auth";
import firebase from '@/utils/firebaseInfo';
import Image from "next/image";
import Todos from "@/components/Todos";

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [todos, setTodos] = useState(null); // Define the 'todos' state

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

  return (
    <div>
       {user && (
        <div>
          <h1>Welcome, {user.displayName}</h1>
          <Image 
                src={user.photoURL}
                alt="Profile"
                height={42}
                width={42}
                


          />
          <Todos userId={user.uid} />
          {/* <TodoList /> */}
          
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      )}
      {!user && (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </div>
  );
};

export default LoginPage;
