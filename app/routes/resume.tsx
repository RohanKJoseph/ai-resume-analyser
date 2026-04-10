import type { Route } from "./+types/resume";
import NavBar from "~/components/NavBar";
import { resumes } from "../../constants";
import { usePuterStore } from "~/lib/puter";
import { useNavigate, useParams, Link } from "react-router";
import { useEffect } from "react";
import ScoreCircle from "~/components/ScoreCircle";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume Details - Resume_analyser.ai" },
    { name: "description", content: "Detailed breakdown of your resume review." },
  ];
}

export default function ResumeDetails() {
    const { auth } = usePuterStore();
    const navigate = useNavigate();
    const { id } = useParams();
    
    useEffect(() => {
        if (!auth.isAuthenticated) 
            navigate('/auth?next=/resume/' + id);
    }, [auth.isAuthenticated, id, navigate]);

    const resume = resumes.find(r => r.id === id);

    if (!resume) {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-slate-100">
                    <h1 className="text-4xl font-bold text-slate-800 mb-4">Resume Not Found</h1>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto">We couldn't find the resume you were looking for. It may have been deleted or never existed.</p>
                    <Link to="/" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all shadow-lg shadow-indigo-200">
                        Back to Dashboard
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="bg-slate-50 min-h-screen pb-20">
            <NavBar />
            
            <section className="max-w-7xl mx-auto px-6 mt-12">
                <Link to="/" className="inline-flex items-center text-slate-500 hover:text-indigo-600 transition-colors mb-8 font-medium">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Column: Visual & Header */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 backdrop-blur-xl">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-3xl font-bold text-slate-900 mb-2">{resume.companyName}</h1>
                                    <p className="text-lg text-indigo-600 font-medium">{resume.jobTitle}</p>
                                </div>
                                <ScoreCircle score={resume.feedback.overallScore} />
                            </div>
                            
                            <div className="rounded-2xl overflow-hidden border-4 border-slate-50 shadow-inner bg-slate-100 relative group aspect-[3/4]">
                                <img 
                                    src={resume.imagePath} 
                                    alt="Resume Preview" 
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <a href={resume.resumePath} target="_blank" rel="noreferrer" className="w-full py-3 bg-white/90 backdrop-blur-sm text-slate-900 text-center font-semibold rounded-xl hover:bg-white transition-colors cursor-pointer">
                                        View Full PDF
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Feedback Breakdown */}
                    <div className="lg:col-span-7 space-y-6">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Detailed Analysis</h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            {[
                                { title: "ATS Match", score: resume.feedback.ATS.score, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
                                { title: "Tone & Style", score: resume.feedback.toneAndStyle.score, color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                                { title: "Content", score: resume.feedback.content.score, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
                                { title: "Formatting", score: resume.feedback.structure.score, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
                            ].map((stat, i) => (
                                <div key={i} className={`${stat.bg} ${stat.border} border p-6 rounded-2xl flex items-center justify-between`}>
                                    <span className="font-semibold text-slate-700">{stat.title}</span>
                                    <span className={`text-2xl font-black ${stat.color}`}>{stat.score}%</span>
                                </div>
                            ))}
                        </div>

                        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
                                <span className="bg-indigo-100 text-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm">💡</span>
                                Key Recommendations
                            </h3>
                            <div className="space-y-4">
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                                    <div className="flex gap-4">
                                        <div className="shrink-0 pt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-800 mb-1">Quantify your achievements</h4>
                                            <p className="text-slate-600 leading-relaxed text-sm">Add measurable metrics to your work history. Use percentages, dollar amounts, or time saved to demonstrate impact.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                                    <div className="flex gap-4">
                                        <div className="shrink-0 pt-0.5">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-slate-800 mb-1">Strong ATS Keyword formatting</h4>
                                            <p className="text-slate-600 leading-relaxed text-sm">Your technical skills align perfectly with standard parsing systems. Keep this clear taxonomy.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
