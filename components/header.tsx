import { BiExport, BiDotsVerticalRounded } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { darkModeTransformClass } from "../helpers/common";
import { 
    MemeState, 
    memeState as originMemeState,
    menuOpen,
    exportDialogOpen
} from "../reducers/meme";
import {isMobile} from 'react-device-detect';
import { useEffect, useState } from "react";

export default function Header(props:{title:string})
{
    const defaultContainerClass = 'w-full h-[70px] grid portrait:grid-cols-2 desktop:grid-cols-2 items-end text-white pb-2 z-10 dark:bg-dark-purple desktop:bg-my-purple';
    const defaultSubcontainer1Class = 'flex flex-row text-left pl-2.5 desktop:pl-4 font-medium whitespace-nowrap text-white dark:text-my-yellow z-10';
    const defaultSubcontainer2Class = 'flex flex-row-reverse h-full items-end text-2xl pr-2.5 desktop:pr-4 gap-3 z-10';
    const [containerClass, setContainerClass] = useState(defaultContainerClass);
    const [subContainer1Class, setSubContainer1Class] = useState(defaultSubcontainer1Class);
    const [subContainer2Class, setSubContainer2Class] = useState(defaultSubcontainer2Class);
    const state:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if(isMobile)
        {
            setContainerClass(defaultContainerClass+' landscape:h-[-webkit-fill-available] landscape:grid landscape:grid-rows-2 landscape:justify-end');
            setSubContainer1Class(defaultSubcontainer1Class+' landscape:leading-[70px] landscape:rotate-180 landscapeText landscape:w-[70px] landscape:pl-0 landscape:justify-end landscape:pt-2');
            setSubContainer2Class(defaultSubcontainer2Class+' landscape:w-[70px] landscape:pr-0 landscape:items-center landscape:justify-end landscape:flex-col landscape:pb-2');
        }
    });

   
    return  <div 
                className={containerClass+darkModeTransformClass}
            >
                <div className="hidden desktop:block w-full h-[70px] absolute top-0 dark:bg-dark-purple z-0" />
                <div className={subContainer1Class+darkModeTransformClass}>
                    {props.title}
                </div>
                <div className={subContainer2Class+darkModeTransformClass}>
                    <BiDotsVerticalRounded 
                        className={"cursor-pointer text-white dark:text-my-yellow"+darkModeTransformClass}
                        onClick={() => dispatch(menuOpen(true))} 
                    />
                    <BiExport 
                        className={"cursor-pointer text-white dark:text-my-yellow"+darkModeTransformClass}
                        onClick={() => dispatch(exportDialogOpen(true))} 
                    />
                </div>
            </div>
}