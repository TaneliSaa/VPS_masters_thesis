/* This is the feedback page of the simulation. */

"use client"
import ActivityLogSummary from "@/app/components/ActivityLogSummary";
import QuizForm from "@/app/components/QuizForm";
import { useSearchParams } from "next/navigation";

export default function FeedbackPage() {

    //URL params variables
    const searchParams = useSearchParams();
    const simulationId = Number(searchParams.get("simulationId"));
    const cprCount = parseInt(searchParams.get("cprCount") || "0", 10);
    const defibCount = parseInt(searchParams.get("defibCount") || "0", 10);
    const revealedParams = searchParams.get("revealed");
    const revealedArray = revealedParams ? revealedParams.split(",") : [];
    const requiredFields = ["symptoms", "age", "history", "medications", "lifestyle"];
    const revealedCount = requiredFields.filter((key) => revealedArray.includes(key)).length;
    const startTimeParam = searchParams.get("startTime");
    const endTimeParam = searchParams.get("endTime");

    return (


        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4"> Simulation Feedback</h1>

            <section className="mb-6">

                <ActivityLogSummary simulationId={simulationId} cprCount={cprCount} defibCount={defibCount} revealedCount={revealedCount} requiredFields={requiredFields} startTime={startTimeParam} endTime={endTimeParam} />

            </section>

            <section>
                <QuizForm />
            </section>



        </div>
    )
}