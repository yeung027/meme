import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useLayoutEffect, useState } from 'react';
import { 
    MemeState, 
    memeState as originMemeState,
} from "../../../reducers/meme";
import { BiBell, BiPlus } from "react-icons/bi";
import {RoundedPurpleButton} from '../../UI/button';
import { darkModeTransformClass } from "../../../helpers/common";
import { isMobile } from "react-device-detect";

export default function UploadPanel()
{
    const defaultContainerClass = "w-full h-full flex flex-col bg-white";
    const [containerClass, setContainerClass] = useState(defaultContainerClass);
    const [uploading, setUploading] = useState(false);
    const memeState:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();    
    const uploadBtnOnclick = () => {
        setUploading(!uploading);
    }

    useLayoutEffect(() => {
        let containerAdditionClass:string = '';
        if(memeState.darkMode)
        {
            containerAdditionClass+=' bg-my-darkGray2';
        }
        else
        {
            containerAdditionClass+=' bg-white';
        }
        if(isMobile)
        {
            containerAdditionClass+=' landscape:rounded-bl-3xl';
        }
        setContainerClass(defaultContainerClass+containerAdditionClass);
    });

    return  <div className={containerClass}>
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