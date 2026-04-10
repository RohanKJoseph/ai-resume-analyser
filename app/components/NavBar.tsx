import React from 'react';
import { Link, useLocation } from "react-router";

export default function NavBar() {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <div className="flex justify-center w-full px-4 pt-6 pb-2 z-50">
            <nav className="flex flex-row justify-between items-center bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[2rem] p-3 w-full max-w-[1400px] shadow-sm">
                <Link className="px-5 transition-transform hover:scale-105" to="/">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-xl font-black text-slate-800 tracking-tight">RESUMIND</p>
                    </div>
                </Link>
                <div className="flex items-center gap-4 px-2">
                    {isHome ? (
                        <Link to="/upload" className="px-6 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-semibold transition-all shadow-md active:scale-95 text-sm">
                            New Upload
                        </Link>
                    ) : (
                        <Link to="/" className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-semibold transition-all shadow-inner active:scale-95 text-sm">
                            Dashboard
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );
}