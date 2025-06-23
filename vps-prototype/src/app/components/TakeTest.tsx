/* This is take test component which is part of the interactivity menu. Interactivity menu is displayed in the simulation page. */


import Image from "next/image";

const TakeTest = ({ testType, isOpen, onClose }: { testType: string | null, isOpen: boolean, onClose: () => void }) => {
    if (!isOpen || !testType) return null;


    return (
        <div className="fixed top-20 right-[20rem] w-96 p-4 bg white border rounder-lg shadow-lg z-40 text-black">
            <h2 className="text-lg font-bold capitalize">{testType.replace(/([A-Z])/g, '$1')}</h2>


            {testType === "EKG" &&
                <div className="mt-4">
                    <Image
                        src=""
                        alt="ECG picture implementing heart attack."
                        width={350}
                        height={250}
                        className="rounded-lg border"
                    />
                </div>
            }

            {testType === "Heart CT" &&
                <div className="mt-4">
                    <Image
                        src="/acute-myocardial-infarction-1.jpg"
                        alt="ECG picture implementing heart attack."
                        width={350}
                        height={250}
                        className="rounded-lg border h-[500px] object-contain"
                    />
                </div>
            }


            <button
                onClick={onClose}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
                Close
            </button>
        </div>
    )
}

export default TakeTest;