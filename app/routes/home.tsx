import type { Route } from "./+types/home";
import NavBar from "~/components/NavBar";
import {resumes} from "../../constants";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resume_analyser.ai" },
    { name: "description", content: "Improve your Resume ..." },
  ];
}

export default function Home() {
   const {  auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split("next=")[1]  ;
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.isAuthenticated) 
            navigate('/auth?next=/');
    },[auth.isAuthenticated, next])
 

    return  <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <NavBar />
     {/* {window.puter.ai.chat} */}
      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Your Application & Resume Rating</h1>
          <h2>Review your Aplication with the help of AI</h2>
        </div>


      {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume)=>(
                <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
      )}
      </section>
    </main>

}
