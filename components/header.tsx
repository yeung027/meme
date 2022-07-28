import { BiExport, BiDotsVerticalRounded } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { darkModeTransformClass, setHeaderRef } from "../helpers/common";
import { 
    MemeState, 
    memeState as originMemeState,
    menuOpen,
    exportDialogOpen
} from "../reducers/meme";
import {isMobile} from 'react-device-detect';
import { useLayoutEffect, useRef, useState } from "react";

export default function Header(props:{title:string, isIndex:boolean})
{
    const containerEl   = useRef(null);
    const memeState:MemeState = useAppSelector(originMemeState);
    let containerClass = 'w-full h-[70px] grid portrait:grid-cols-2 desktop:grid-cols-2 items-end text-white pb-2 z-20 dark:bg-dark-purple desktop:bg-my-purple';
    containerClass+=' myLandscape:pb-0 landscapeFillAvailable myLandscape:grid myLandscape:grid-rows-2 myLandscape:justify-end'
    if(!memeState.headerVisible) containerClass = containerClass+' -translate-y-full desktop:translate-y-0 delay-75 duration-150 myLandscape:duration-0';
    else containerClass = containerClass+' translate-y-0 delay-0 duration-75 myLandscape:duration-0';
    if(props.isIndex) containerClass+=' fixed myLandscape:static ease-in-out transform bg-my-purple delay-200 duration-1000 ease-in-out transform';
    let subContainer1Class = 'font-notoSansTC flex-row text-left pl-2.5 desktop:pl-4 font-medium whitespace-nowrap text-white dark:text-my-yellow z-10';
    subContainer1Class += ' myLandscape:leading-[70px] myLandscape:rotate-180 landscapeText myLandscape:w-[70px] myLandscape:pl-0 myLandscape:justify-end';
    let subContainer2Class = 'flex flex-row-reverse h-full items-end text-2xl pr-2.5 desktop:pr-4 gap-3 z-10';
    subContainer2Class += ' myLandscape:w-[70px] myLandscape:pr-0 myLandscape:items-center myLandscape:justify-end myLandscape:flex-col myLandscape:pb-2';
    const dispatch = useAppDispatch();
      
    useLayoutEffect(() => {
        let containerEle:HTMLDivElement = containerEl.current!;
        setHeaderRef(containerEle);
    });

    return  <div 
                className={containerClass}
                ref={containerEl}
            >
                <div className="hidden desktop:block w-full h-[70px] absolute top-0 dark:bg-dark-purple z-0" />
                <div className={subContainer1Class+darkModeTransformClass}>
                    {props.title}
                </div>
                <div className={subContainer2Class+darkModeTransformClass}>
                    <BiDotsVerticalRounded 
                        className={`block desktop:${props.isIndex? `hidden` : `block`} cursor-pointer text-white dark:text-my-yellow`+darkModeTransformClass}
                        onClick={() => dispatch(menuOpen(true))} 
                    />
                    <BiExport 
                        className={`${props.isIndex? `hidden` : `block`} cursor-pointer text-white dark:text-my-yellow`+darkModeTransformClass}
                        onClick={() => dispatch(exportDialogOpen(true))} 
                    />
                </div>
            </div>
}