'use client'
import Image from 'next/image'
import patientImage from './Patient-sitting.jpg'
import { useState } from 'react';



export default function Home() {

  //States 
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isHidden,setIsHidden] = useState(true)
  const correctDiagnosis = "heart attack";

  const patientSymptoms = "I have chest pain, shortness of breath, and nausea.";

  //Change handler for the text area where users can type freely their diagnose
  const handleInputChange = (e: any) => {
    setInput(e.target.value);
  };

  //Submit handler for the text area, this will handle the users submits and compare given answers to the symptoms list
  const handleSubmit = () => {
    const normalizedInput = input.toLowerCase().trim();
    //If there is a symptom that is found in the symptom list, give a correct answer
    if (normalizedInput === correctDiagnosis) {
      setResponse("Correct! The patient is suffering from a heart attack.");
    } else {
      setResponse("Incorrect diagnosis. Please try again.");
    }
  };

  const hiddenInputHandler = () => {
    setIsHidden(!isHidden);
  }
    
return (
  <div>

    {/*Image of the patient */}
    <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto">
      <Image
        src={patientImage}
        alt='Picture of the patient sitting'
        >
      </Image>
    </div>
    <div className='p-4 border rounded-lg shadow-lg max-w-md mx-auto'>
      <h2 className="text-lg font-bold">Patient</h2>
      <p className="mt-2">Hey doctor! {patientSymptoms}</p>
      <button 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={hiddenInputHandler}
        >
          Continue
      </button>
    </div>
    
    
    {/*Text area component */}
    <div className="p-4 border rounded-lg shadow-lg max-w-md mx-auto" hidden={isHidden}>
      <h3 className="text-lg font-bold mt-4">Enter your diagnosis:</h3>
      <textarea 
        className="w-full p-2 border rounded mt-2"
        value={input} 
        onChange={handleInputChange}
        placeholder="Type your diagnosis..."
      />
      <button 
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {response && <p className="mt-2 font-medium">{response}</p>}
    </div>

  </div>
)

}
