'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import ActivityLog from '@/app/components/ActivityLog';
import DiagnosisForm from '@/app/components/DiagnosisForm';
import InterActiveMenu from '@/app/components/InterActiveMenu';



export default function Page() {
    //States 


    //Patient dialogue
    const patientSymptoms = "I have chest pain, shortness of breath, and nausea.";



    return (

        <div className=''>
            
            {/*Interactive menu*/}
            <div className='w-64 bg-gray-800 text-white h-full shadow-md'>
                <InterActiveMenu />
            </div>

            {/*Image of the patient */}
            <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto">
                <Image
                    src="/Patient-sitting.jpg"
                    alt='Picture of the patient sitting'
                    width="500"
                    height="500"
                >
                </Image>
            </div>

            {/*Patient dialogue bar*/}
            <div className='p-4 border rounded-lg shadow-lg max-w-md mx-auto'>
                <h2 className="text-lg font-bold">Patient</h2>
                <p className="mt-2">Hey doctor! {patientSymptoms}</p>
                <button>Testi</button>

            </div>

            {/*Activity log*/}
            <div>
                <ActivityLog />
            </div>
            {/*Diagnosis form*/}
            <div>
                <DiagnosisForm />
            </div>





        </div>
    )

}