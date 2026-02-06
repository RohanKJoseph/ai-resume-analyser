import React from 'react';
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";

// Assuming Resume type is defined elsewhere or imported
function ResumeCard({ resume: { id, jobTitle, companyName, feedback, imagePath } }: { resume: any }) {
    return (
        <Link
            to={`/resume/${id}`}
            className="resume-card group flex flex-col h-full animate-in fade-in duration-1000 overflow-hidden"
        >
            {/* Header: Uses flex-1 to ensure equal heights if cards are in a grid */}
            <div className="resume-card-header flex-1 justify-between items-start gap-0 p-2 md:flex">
                <div className="flex flex-col min-w-0"> {/* min-w-0 prevents flex items from overflowing */}
                    <h2 className="text-black font-bold truncate-2-lines break-words leading-tight">
                        {companyName}
                    </h2>
                    <h3 className="text-sm md:text-base text-gray-500 truncate-1-line">
                        {jobTitle}
                    </h3>
                </div>
                <div className="shrink-0 pt-1">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>


            <div className="gradient-border mt-auto overflow-hidden">
                <div className="relative aspect-3/4 sm:aspect-4/5 w-full bg-gray-100">
                    <img
                        src={imagePath}
                        alt={`${companyName} resume`}
                        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </div>
        </Link>
    );
}

export default ResumeCard;