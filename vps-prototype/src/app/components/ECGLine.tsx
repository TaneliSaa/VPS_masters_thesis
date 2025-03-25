/* This is ECG line component for the vital signs monitor. For now it is just a flatline, but I will make more logic into this when CPR and defibrillator logic is done. */

"use client"

import { useEffect, useRef } from "react";

interface ECGLineProps {
    rhythm?: "flatline" | "heartbeat";
}

const ECGLine: React.FC<ECGLineProps> = ({rhythm = "flatline"}) => {
    const svgRef = useRef<SVGSVGElement>(null);


    useEffect(() => {


    },[rhythm]);

    return(

        <svg
            ref={svgRef}
            width="100%"
            height="48"
            viewBox="0 0 300 48"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-black"
        >

        { rhythm === "flatline" ? (
            <polyline
            points="0,24 300,24"
            stroke="lime"
            strokeWidth="2"
            fill="none"
        >

        </polyline>) : (

            <g>
                <path
                    d="
                        M 0 24
                        L 20 24
                        L 30 0
                        L 40 48
                        L 50 24
                        L 70 24
                        L 80 10
                        L 90 38
                        L 95 36
                        L 100 24
                        L 300 24
                        L 450 24
                        "
                        
                    stroke="lime"
                    strokeWidth="2"
                    fill="none"
                >
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        from="0"
                        to="-100"
                        dur="1.2s"
                        repeatCount="indefinite"
                    >
                    </animateTransform>
                </path>
            </g>
        )}
        </svg>
    );
}

export default ECGLine;