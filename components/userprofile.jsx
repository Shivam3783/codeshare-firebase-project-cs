// components/userprofile.jsx
"use client";

import { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { FaUser, FaEnvelope, FaCalendar, FaSignOutAlt } from 'react-icons/fa';
import Link from "next/link"


const UserProfile = ({ user }) => {
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      // Redirect will be handled by your auth state listener
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-10 text-white">
          <div className="text-center">
            <div className="relative inline-block">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white/30 flex items-center justify-center">
                  <FaUser className="w-16 h-16 text-white/70" />
                </div>
              )}
            </div>
            <h1 className="mt-4 text-3xl font-bold">
              {user.displayName || 'User'}
            </h1>
          </div>
        </div>

        {/* User Details Section */}
        <div className="px-8 py-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <FaEnvelope className="w-6 h-6 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <FaCalendar className="w-6 h-6 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Account Created</p>
                <p className="font-medium">
                  {formatDate(user.metadata?.creationTime)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <FaCalendar className="w-6 h-6 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Last Sign In</p>
                <p className="font-medium">
                  {formatDate(user.metadata?.lastSignInTime)}
                </p>
              </div>
            </div>

            {/* Email Verification Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${user.emailVerified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              <span className="text-sm text-gray-600">
                {user.emailVerified ? 'Email Verified' : 'Email Not Verified'}
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleLogout}
              disabled={loading}
              className="flex items-center space-x-2 px-7 py-3 mx-5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50"
            >
              <FaSignOutAlt className="w-5 h-5" />
              <span>{loading ? 'Logging out...' : 'Log Out'}</span>
            </button>

            <Link className="flex items-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50"
            href="/home/landing"
            prefetch={false}>
              <FaSignOutAlt className="w-5 h-5" />
              <span>{loading ? 'Landing...' : 'Landing'}</span>
            </Link>
       
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
