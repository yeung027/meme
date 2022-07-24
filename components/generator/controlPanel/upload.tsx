import {  useState } from 'react';
import { BiBell, BiPlus } from "react-icons/bi";
import {RoundedPurpleButton} from '../../UI/button';
import { darkModeTransformClass } from "../../../helpers/common";

export default function UploadPanel()
{
    const [uploading, setUploading] = useState(false);
    const uploadBtnOnclick = () => {
        setUploading(!uploading);
    }


    return  <div className='w-full h-full flex flex-col bg-white myLandscape:rounded-bl-3xl dark:bg-my-darkGray2'>
                <div className="w-full h-11 grid grid-cols-2">
                    <div className="h-11 flex flex-row items-center pl-4">
                        <BiBell className={"text-my-purple3 dark:text-my-orange"+darkModeTransformClass} />
                        <span className="text-sm text-black pl-1 font-medium font-roboto whitespace-nowrap dark:text-white">
                            Upload photo
                        </span>
                    </div>
                    <div className="h-11 flex flex-row-reverse items-center pr-4">
                        <span className={"text-xs font-normal text-my-purple3 cursor-pointer hover:text-my-orange dark:text-my-orange"+darkModeTransformClass}>
                            skip
                        </span>
                    </div>
                </div>
                <div className="w-full h-full flex flex-row justify-center items-center desktop:items-start desktop:pt-4">
                    <RoundedPurpleButton processing={uploading} onclick={uploadBtnOnclick} defaultIcon={<BiPlus className="text-base" />} />
                </div>
            </div>
}