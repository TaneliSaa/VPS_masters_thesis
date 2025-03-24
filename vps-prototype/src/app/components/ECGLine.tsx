/* This is ECG line component for the vital signs monitor. For now it is just a flatline, but I will make more logic into this when CPR and defibrillator logic is done. */

"use client"

import { useEffect, useRef } from "react";

interface ECGLineProps {
    rhythm?: "flatline";
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

        <polyline
            points="0,24 300,24"
            stroke="lime"
            strokeWidth="2"
            fill="none"
        >

        </polyline>

        </svg>

    );
}

export default ECGLine;