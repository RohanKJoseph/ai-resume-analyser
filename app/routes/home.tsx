import type { Route } from "./+types/home";
import NavBar from "~/components/NavBar";
import { resumes } from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume_analyser.ai - Dashboard" },
    { name: "description", content: "Track your application and resume rating with AI" },
  ];
}

export default function Home() {
    const { auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split("next=")[1];
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) 
            navigate('/auth?next=/');
    }, [auth.isAuthenticated, next, navigate]);

    return (
        <main className="bg-slate-50 min-h-screen relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-indigo-50 to-slate-50 -z-10"></div>
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-200/20 blur-[120px] -z-10"></div>
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-rose-200/20 blur-[120px] -z-10"></div>

            <NavBar />

            <section className="main-section px-4 sm:px-8 max-w-[1400px] mx-auto w-full pt-16 pb-24 z-10 relative">
                <div className="page-heading flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm mb-8">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                        <span className="text-sm font-semibold tracking-wide text-indigo-900">AI-POWERED REVIEW</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                        Elevate your career with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500">intelligent analysis</span>
                    </h1>
                    
                    <h2 className="text-lg md:text-xl text-slate-600 max-w-2xl font-medium leading-relaxed">
                        Track your application success and review your application with the help of powerful AI insights designed to beat the ATS.
                    </h2>
                </div>

                {resumes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full animate-in fade-in duration-1000 delay-300">
                        {resumes.map((resume) => (
                            <div key={resume.id} className="flex justify-center">
                                <ResumeCard resume={resume} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/50 backdrop-blur-md border border-slate-200 border-dashed rounded-3xl w-full max-w-4xl mx-auto">
                        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                            <svg className="w-10 h-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No resumes analyzed yet</h3>
                        <p className="text-slate-500 mb-6 text-center max-w-md">Upload your first resume to get detailed AI feedback on ATS compatibility, skills alignment, and structural improvements.</p>
                        <button onClick={() => navigate('/upload')} className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-colors shadow-lg shadow-indigo-200">
                            Upload a Resume
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
}
