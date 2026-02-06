import React, { use, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter';

export const meta = () => {
  return [
    { title: "Resume_analyser.ai - Auth" },
    { name: "description", content: "Login or Register to access your dashboard and track your applications." },
  ];
}

const auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split("next=")[1]  ;
    const navigate = useNavigate();
    useEffect(() => {
        if (auth.isAuthenticated) 
            navigate(next);
    },[auth.isAuthenticated, next])

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="auth-container bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Welcome to Resume Analyser AI</h1>
        <p className="mb-4">Login or register to access your dashboard and track your applications.</p>
        <div className="flex space-x-4 justify-between">
           {isLoading ? (
            <button className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed" disabled>
              Loading...
            </button>
           ) : (
             <>
               {auth.isAuthenticated ? (
                 <button className="auth-button" onClick={() => auth.signOut()}>
                Logout  
              </button>
               ) : (    
                    <button className="auth-button" onClick={() => auth.signIn()}>
                Login..
              </button>
               )}
             </>   
           )}     
        </div>
      </div>
    </main>
  )
}

export default auth