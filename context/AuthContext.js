// context/AuthContext.js

"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);

    if (currentUser) {
        setLoading(false); // Authenticated user, set loading to false immediately
      } else {
        // Not authenticated, apply a 5-second delay
        setTimeout(() => {
          setLoading(false);
          router.push("/"); // Redirect to login after delay if unauthenticated
        }, 2000);
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// "use client";
// import { createContext, useContext, useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { auth } from '@/lib/firebase';
// import { onAuthStateChanged } from 'firebase/auth';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false); // Set loading to false immediately after checking auth state
//       if (!currentUser) {
//         router.push("/"); // Redirect to login if not logged in
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
