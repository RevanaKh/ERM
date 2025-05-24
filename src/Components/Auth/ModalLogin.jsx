import react ,{useState,useEffect} from "react"
import { VscError } from "react-icons/vsc";
import { FaCheck } from "react-icons/fa";
export default function ModalLogin({Openmodal, setOpenmodal , error ,message ,setDaftar}) {

return (
    <>
<div id="default-modal" tabindex="-1" aria-hidden="true" className={`overflow-y-auto overflow-x-hidden ${Openmodal ? 'block' : 'hidden'} mt-[400px] md:mt-[700px] md:ml-[80px] lg:mt-[300px] lg:ml-[300px] z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm ">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 ">
                    Alert
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal" onClick={ ()=> setOpenmodal(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4 flex flex-col justify-center items-center">
                {error ? (
                    <>
                <VscError className="text-[50px]"/>
                <p className="text-base leading-relaxed text-gray-700 ">{error}</p>
                    </>
                ) : message ? 
                (
                    <>
                    <FaCheck className="text-[50px]"/>
                    <p className="text-base leading-relaxed text-gray-700 ">{message}</p>
                    
                    </>
                ) : null
            }
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button data-modal-hide="default-modal" type="button" className="text-white bg-[#2DD4BF] hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => {
  setOpenmodal(false);
  if (!error) { 
    setDaftar(false); 
  }
}}>I accept</button>
            </div>
        </div>
    </div>
</div>

    </>
)
}