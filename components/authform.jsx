// /components/authform.jsx
"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,GithubAuthProvider } from 'firebase/auth';
import { FaGithub, FaGoogle, FaLinkedinIn } from 'react-icons/fa';

export default function AuthForm() {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    try {
      if (isSignIn) {
        // Sign in and redirect to home page on success
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        router.push('/'); // Redirect to the home page
      } else {
        // Sign up and display success message on success
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        // setSuccessMessage('Successfully signed up! Please sign in.');
        setShowSuccessMessage(true)

        setTimeout(() => {
          setShowSuccessMessage(false)
        }, 4000)
        setIsSignIn(true); // Switch to sign-in mode
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/'); // Redirect to home after Google sign-in
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="min-h-screen bg-gray-400 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full h-[600px] bg-slate-50 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className={`w-full md:w-1/2 p-12 ${isSignIn ? 'bg-white' : 'bg-[#ff6b6b]'}`}>
          {isSignIn ? (
            <>
              <h2 className="text-3xl font-bold mb-6">Sign in</h2>
              <div className="flex gap-4 mb-6">
                <button onClick={handleGoogleSignIn} className="p-2 border rounded-full hover:bg-gray-50">
                  <FaGoogle />
                </button>
                <button onClick={handleGithubSignIn} className="p-2 border rounded-full hover:bg-gray-50">
                  <FaGithub />
                </button>
                <button className="p-2 border rounded-full hover:bg-gray-50">
                  <FaLinkedinIn />
                </button>
               
                
              </div>
              <p className="text-gray-500 mb-6">or use your account</p>
            </>
          ) : (
            <div className="text-white">
              <h2 className="text-3xl font-bold mb-6">Hello, Friend!</h2>
              <p className="mb-6">Enter your personal details and start journey with us</p>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            {!isSignIn && (
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 mb-4 bg-gray-100 rounded"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 bg-gray-100 rounded"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-6 bg-gray-100 rounded"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {/* {successMessage && <p className="text-black-500 mb-4">{successMessage}</p>} */}
            {showSuccessMessage && (
        // <div className="absolute top-16 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md animate-slide-in-top">
        <div className="absolute top-16 bg-green-500 text-white px-4 py-2 rounded-md shadow-md animate-slide-in-top animate-pulse">
          Successfully signed up! Please sign in.
        </div>
      )}
            {isSignIn && (
              <p className="text-gray-500 mb-6 cursor-pointer hover:underline">
                Forgot your password?
              </p>
            )}
            <button
              type="submit"
              className={`w-full p-3 rounded font-bold ${
                isSignIn ? 'bg-[#ff6b6b] text-white' : 'bg-white text-[#ff6b6b] border border-[#ff6b6b]'
              }`}
            >
              {isSignIn ? 'SIGN IN' : 'SIGN UP'}
            </button>
          </form>
        </div>
        
        <div className={`w-full md:w-1/2 p-8 text-center flex flex-col justify-center items-center ${
          isSignIn ? 'bg-[#ff6b6b] text-white' : 'bg-white'
        }`}>
          <h2 className="text-3xl font-bold mb-6">
            {isSignIn ? 'Hello, Friend!' : 'Welcome Back!'}
          </h2>
          <p className="mb-6">
            {isSignIn
              ? 'Enter your personal details and start journey with us'
              : 'To keep connected with us please login with your personal info'}
          </p>
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className={`px-10 py-2 rounded-full font-bold border ${
              isSignIn ? 'border-white text-white' : 'border-[#ff6b6b] text-[#ff6b6b]'
            }`}
          >
            {isSignIn ? 'SIGN UP' : 'SIGN IN'}
          </button>
        </div>
      </div>
    </div>
  );
}
