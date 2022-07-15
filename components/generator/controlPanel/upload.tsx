import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useState } from 'react';
import { 
    MemeState, 
    memeState as originMemeState,
} from "../../../reducers/meme";
import { BiBell, BiPlus } from "react-icons/bi";

export default function UploadPanel()
{
    const [uploading, setUploading] = useState(false);
    const memeState:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();
    let uploadBtnIcon =     <div className="h-9 flex flex-row items-center">
                                <BiPlus className="text-base" />
                            </div>
    
    let uploadBtnClass = "flex flex-row gap-2 h-9 rounded-xl px-2.5 text-white text-xs font-normal z-20 bg-gradient-to-r from-my-purple3 duration-200 ease-in-out transform ";
    let uploadBtnLabel = "Upload"
    if(!uploading) uploadBtnClass += " hover:text-my-orange cursor-pointer to-my-purple3 ";

    if(uploading)
    {
        uploadBtnIcon=  <div className="h-9 flex flex-row items-center"><svg role="status" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg></div>
        uploadBtnClass += " cursor-wait background-animate via-[#db0276] via-[#d60435] via-[#db0276] to-my-purple3";
        uploadBtnLabel = "Uploading..."
    }//END if(uploading)

    return  <div className="w-full h-full flex flex-col">
                <div className="w-full h-11 grid grid-cols-2">
                    <div className="h-11 flex flex-row items-center pl-4">
                        <BiBell className="text-my-purple3" />
                        <span className="text-sm text-black pl-1 font-medium font-roboto whitespace-nowrap">
                            Upload photo
                        </span>
                    </div>
                    <div className="h-11 flex flex-row-reverse items-center pr-4">
                        <span className="text-xs font-normal text-my-purple3 cursor-pointer hover:text-my-orange">
                            skip
                        </span>
                    </div>
                </div>
                <div className="w-full h-full flex flex-row justify-center items-center desktop:items-start desktop:pt-4">
                    <div 
                        className={uploadBtnClass}
                        onClick={() => setUploading(true)}
                    >
                        {uploadBtnIcon}
                        <span className="flex items-center animate-pulse">{uploadBtnLabel}</span>
                    </div>
                </div>
            </div>
}