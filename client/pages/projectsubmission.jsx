import { useState } from "react";
import { Layout } from "../components";
import ProjectSubmissionForm from "../components/ProjectSubmissionForm";

export default function ProjectSubmission() {
    const [loading, setLoading] = useState(false);
    return (
        <div className="bg-black text-white">
            <Layout>
                <div className="pb-5">
                    <div className="flex flex-col py-3 ">
                        <h1 className="text-2xl font-bold text-center">Project Submission</h1>
                        <p className="text-center">Submit a project to the DAO.</p>
                    </div>
                    <div className="flex justify-center overflow-hidden relative ">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <ProjectSubmissionForm setLoading={setLoading} />
                        )}
                    </div>
                </div>
            </Layout>
        </div>
    )

}