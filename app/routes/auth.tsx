import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter';

export const meta = () => {
  return [
    { title: "Resume_analyser.ai - Login" },
    { name: "description", content: "Login or Register to access your dashboard and track your applications." },
  ];
}

export default function Auth() {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split("next=")[1];
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) 
            navigate(next || '/');
    }, [auth.isAuthenticated, next, navigate]);

    return (
        <main className="relative min-h-screen flex items-center justify-center bg-slate-50 overflow-hidden font-sans">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-[url('/images/bg-main.svg')] bg-cover bg-center opacity-30 z-0"></div>
            <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-400/20 blur-[150px] z-0"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-rose-400/20 blur-[120px] z-0"></div>

            <div className="relative z-10 w-full max-w-md p-10 bg-white/70 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white/50 m-4 animate-in zoom-in-95 duration-500">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white mb-6 shadow-xl shadow-indigo-200 transform rotate-3">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-3">Welcome Back</h1>
                    <p className="text-slate-500 font-medium leading-relaxed px-4">
                        Login or register to access your personalized analysis board.
                    </p>
                </div>
                
                <div className="flex flex-col space-y-4">
                    {isLoading ? (
                         <button className="w-full relative overflow-hidden bg-slate-800 text-white py-4 px-6 rounded-2xl font-semibold opacity-70 cursor-wait">
                            <span className="invisible">Loading</span>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                        </button>
                    ) : (
                        auth.isAuthenticated ? (
                            <button 
                                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 py-4 px-6 rounded-2xl font-bold transition-all active:scale-[0.98]" 
                                onClick={() => auth.signOut()}
                            >
                                Sign Out  
                            </button>
                        ) : (    
                            <button 
                                className="w-full group relative overflow-hidden bg-slate-900 border border-slate-800 py-4 px-6 rounded-2xl font-bold text-white transition-all hover:shadow-xl hover:shadow-slate-900/20 active:scale-[0.98]" 
                                onClick={() => auth.signIn()}
                            >
                                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Continue with Puter
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                            </button>
                        )
                    )}     
                </div>
                
                <div className="mt-8 text-center">
                    <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase">
                        Powered by AI Analysis
                    </p>
                </div>
            </div>
        </main>
    );
}