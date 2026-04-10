import React from 'react';
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";

function ResumeCard({ resume }: { resume: any }) {
    const { id, jobTitle, companyName, feedback, imagePath } = resume;
    const score = feedback?.overallScore || 0;
    
    return (
        <Link
            to={`/resume/${id}`}
            className="group relative flex flex-col h-[520px] w-full max-w-[380px] bg-white rounded-[2.5rem] p-2 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-100/50 hover:border-indigo-100 overflow-hidden isolate"
        >
            {/* Background glowing effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/0 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

            <div className="flex justify-between items-center px-6 pt-5 pb-4">
                <div className="flex flex-col min-w-0 flex-1 pr-3">
                    <h2 className="text-lg font-black text-slate-800 truncate leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
                        {companyName}
                    </h2>
                    <h3 className="text-sm font-medium text-slate-500 truncate">
                        {jobTitle}
                    </h3>
                </div>
                <div className="shrink-0 flex items-center justify-center">
                    <ScoreCircle score={score} />
                </div>
            </div>

            <div className="relative flex-1 rounded-[2rem] overflow-hidden bg-slate-100 border-4 border-white shadow-inner m-1">
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                
                <img
                    src={imagePath}
                    alt={`${companyName} resume`}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                    loading="lazy"
                />
                
                {/* Hover overlay with CTA */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="inline-flex items-center text-white font-bold text-sm bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                            View Analysis 
                            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Tag or status pill */}
            <div className="absolute top-8 left-8">
                {score >= 80 ? (
                    <span className="bg-emerald-100/90 backdrop-blur-sm text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-md border border-emerald-200">EXCELLENT</span>
                ) : score >= 60 ? (
                    <span className="bg-amber-100/90 backdrop-blur-sm text-amber-800 text-[10px] font-bold px-2 py-1 rounded-md border border-amber-200">NEEDS WORK</span>
                ) : (
                    <span className="bg-rose-100/90 backdrop-blur-sm text-rose-800 text-[10px] font-bold px-2 py-1 rounded-md border border-rose-200">POOR</span>
                )}
            </div>
        </Link>
    );
}

export default ResumeCard;