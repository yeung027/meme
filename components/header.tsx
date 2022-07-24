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
import { useLayoutEffect, useState } from "react";

export default function Header(props:{title:string})
{
    let containerClass = 'w-full h-[70px] grid portrait:grid-cols-2 desktop:grid-cols-2 items-end text-white pb-2 z-20 dark:bg-dark-purple desktop:bg-my-purple';
    containerClass+=' myLandscape:pb-0 landscapeFillAvailable myLandscape:grid myLandscape:grid-rows-2 myLandscape:justify-end'
    let subContainer1Class = 'flex-row text-left pl-2.5 desktop:pl-4 font-medium whitespace-nowrap text-white dark:text-my-yellow z-10';
    subContainer1Class += ' myLandscape:leading-[70px] myLandscape:rotate-180 landscapeText myLandscape:w-[70px] myLandscape:pl-0 myLandscape:justify-end';
    let subContainer2Class = 'flex flex-row-reverse h-full items-end text-2xl pr-2.5 desktop:pr-4 gap-3 z-10';
    subContainer2Class += ' myLandscape:w-[70px] myLandscape:pr-0 myLandscape:items-center myLandscape:justify-end myLandscape:flex-col myLandscape:pb-2';
    const dispatch = useAppDispatch();
    

   
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