/* This is ECG line component for the vital signs monitor. The vital sign monitor is displayed when patient collapse event happens. */

"use client"

import { useEffect, useRef } from "react";

interface ECGLineProps {
    rhythm?: "flatline" | "heartbeat";
}

const ECGLine: React.FC<ECGLineProps> = ({ rhythm = "flatline" }) => {
    const svgRef = useRef<SVGSVGElement>(null);


    useEffect(() => {


    }, [rhythm]);

    return (

        <svg
            ref={svgRef}
            width="100%"
            height="48"
            viewBox="0 0 300 48"
            xmlns="http://www.w3.org/2000/svg"
            className="bg-black"
        >

            {rhythm === "flatline" ? (
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
                            L 10 24
                            L 15 10
                            L 20 38
                            L 25 24
                            L 40 24
                            L 45 16
                            L 50 32
                            L 55 24
                            L 70 24
                            L 75 10
                            L 80 38
                            L 85 24
                            L 100 24
                            L 105 10
                            L 110 38
                            L 115 24
                            L 130 24
                            L 135 10
                            L 140 38
                            L 145 24
                            L 160 24
                            L 165 10
                            L 170 38
                            L 175 24
                            L 190 24
                            L 195 10
                            L 200 38
                            L 205 24
                            L 220 24
                            L 225 10
                            L 230 38
                            L 235 24
                            L 250 24
                            L 255 10
                            L 260 38
                            L 265 24
                            L 280 24
                            L 285 10
                            L 290 38
                            L 295 24
                            L 300 24
                            L 310 24
                            L 315 10
                            L 320 38
                            L 325 24
                            L 340 24
                            L 345 16
                            L 350 32
                            L 355 24
                            L 370 24
                            L 375 10
                            L 380 38
                            L 385 24
                            L 400 24
                            L 405 10
                            L 410 38
                            L 415 24
                            L 430 24
                            L 435 10
                            L 440 38
                            L 445 24
                            L 460 24
                            L 465 10
                            L 470 38
                            L 475 24
                            L 490 24
                            L 495 10
                            L 500 38
                            L 505 24
                            L 520 24
                            L 525 10
                            L 530 38
                            L 535 24
                            L 550 24
                            L 555 10
                            L 560 38
                            L 565 24
                            L 580 24
                            L 585 10
                            L 590 38
                            L 595 24
                            L 600 24
                        "

                        stroke="lime"
                        strokeWidth="2"
                        fill="none"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            from="0"
                            to="-300,0"
                            dur="5.5s"
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