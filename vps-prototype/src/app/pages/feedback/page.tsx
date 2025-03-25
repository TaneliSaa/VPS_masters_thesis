"use client"


import ActivityLogSummary from "@/app/components/ActivityLogSummary";
import { useState } from "react"

export default function FeedbackPage() {
    
    //States
    const [finalDiagnosis,setFinalDiagnosis] = useState("");
    const [selfReflection,setSelfReflection] = useState("");


    return(


        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4"> Simulation Feedback</h1>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb2"> Activity Summary</h2>
                <ActivityLogSummary />

            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold mb2">Patient outcome</h2>
                <p>SURVIVED</p>

            </section>

            <form>
                <div>
                    <label className="block font-medium">
                        Final diagnosis:
                    </label>
                    <input
                        type="text"
                        className="w-full p-2 border rounded-md"
                        value={finalDiagnosis}
                        onChange={(e) => setFinalDiagnosis(e.target.value)}
                        placeholder="Your final diagnosis."
                    >
                    </input>
                </div>

                <div>
                    <label className="block font-medium" >Self-Reflection</label>
                    <textarea
                        className="w-full p-2 border rounded-md"
                        rows={4}
                        value={selfReflection}
                        onChange={(e) => setSelfReflection(e.target.value)}
                        placeholder="What went well? Did you make right diagnosis?"
                    >
                    </textarea>
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md "
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    )
}