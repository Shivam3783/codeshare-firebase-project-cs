"use client";

import AuthForm from "@/components/authform";
import UserProfile from "@/components/userprofile";
import { useAuth } from '@/context/AuthContext';
import { PacmanLoader } from "react-spinners";

export default function Home() {
  const { user, loading } = useAuth();

  // Show a loading spinner or some UI while checking authentication
  if (loading) {
    return <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
    }}
  ><PacmanLoader/></div>; // or a spinner component
  }

  return (
    <>
       {user ? (
        <UserProfile user={user} /> 
      )  : (
        <AuthForm />
      )}
    </>
  );
}




// "use client"

// import AuthForm from "@/components/authform";
// import Image from "next/image";
// // import { Landing } from "@/components/landing/landing";
// import { useState, useEffect } from "react"
// // import LoginLogout from "@/components/loginlogout";

// export default function Home() {
//   return (
//     <>
//     {/* <LoginLogout /> */}
//     {/* <Landing/> */}
//     <AuthForm/>


// </>
//   );
// }
