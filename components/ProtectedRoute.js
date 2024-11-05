// // components/ProtectedRoute.js

"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      const redirectTimeout = setTimeout(() => {
        router.push('/'); // Redirect after delay if not authenticated
      }, 5000);
      
      return () => clearTimeout(redirectTimeout);
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
        }}
      >
        <PacmanLoader />
      </div>
    );
  }

  return user ? children : null;
};

export default ProtectedRoute;
