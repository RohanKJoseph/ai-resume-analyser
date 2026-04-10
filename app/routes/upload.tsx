import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import NavBar from '~/components/NavBar';

export default function Upload() {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!uploadedFile) return;
        
        setIsAnalyzing(true);
        
        // Mocking the analysis delay
        setTimeout(() => {
            setIsAnalyzing(false);
            // Navigate to a demo resume result to showcase the UI
            navigate('/resume/1');
        }, 2000);
    };
    
    return (
        <main className="bg-slate-50 min-h-screen relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-emerald-200/20 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-200/20 blur-[120px] pointer-events-none"></div>
            
            <NavBar />
            
            <section className="main-section px-4 max-w-4xl mx-auto mt-20 pb-24 z-10 relative">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 tracking-tight">Upload Your Resume</h1>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto font-medium">
                        Our AI engine will scan your resume against industry standards and provide actionable feedback in seconds.
                    </p>
                </div>

                <div className="w-full bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.06)] border border-slate-100">
                    <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                        <div 
                            className={`relative group flex flex-col items-center justify-center p-12 md:p-20 border-2 border-dashed rounded-[2rem] transition-all duration-300 ${
                                isDragging 
                                ? 'border-indigo-500 bg-indigo-50' 
                                : uploadedFile ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:bg-slate-100/80 hover:border-indigo-300'
                            }`}
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={(e) => { 
                                e.preventDefault(); 
                                setIsDragging(false);
                                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                                    setUploadedFile(e.dataTransfer.files[0]);
                                }
                            }}
                        >
                            <input 
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                type="file" 
                                id="resume" 
                                name="resume" 
                                accept=".pdf,.doc,.docx" 
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setUploadedFile(e.target.files[0]);
                                    }
                                }}
                                disabled={isAnalyzing}
                            />
                            
                            {uploadedFile ? (
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 mb-6 rounded-2xl bg-emerald-100 shadow-sm flex items-center justify-center">
                                         <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-emerald-700 mb-2 truncate max-w-[300px]">{uploadedFile.name}</h3>
                                    <p className="text-emerald-600/80 font-medium text-center">Ready to analyze</p>
                                </div>
                            ) : (
                                <>
                                    <div className="w-20 h-20 mb-6 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-700 mb-2">Drag & Drop your resume</h3>
                                    <p className="text-slate-500 font-medium text-center">
                                        or click to browse files from your computer<br/>
                                        <span className="text-sm mt-2 block text-slate-400">Supports PDF, DOC, DOCX (Max 10MB)</span>
                                    </p>
                                </>
                            )}
                        </div>
                        
                        <div className="flex justify-end">
                            <button 
                                className="group relative pr-6 pl-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg transition-all hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-600/20 active:scale-[0.98] flex items-center disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-none disabled:hover:bg-slate-900 disabled:cursor-not-allowed" 
                                type="submit"
                                disabled={!uploadedFile || isAnalyzing}
                            >
                                {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
                                {!isAnalyzing && (
                                    <span className="ml-3 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                )}
                                {isAnalyzing && (
                                    <span className="ml-3 w-10 h-10 flex items-center justify-center">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}