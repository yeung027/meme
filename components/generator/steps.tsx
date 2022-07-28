import { useEffect, useRef } from "react";
import { canvasRef, darkModeTransformClass, isOrientation, subContainerRef } from "../../helpers/common";
import {isMobile} from 'react-device-detect';
import { ORIENTATION } from "../../models/common";

export default function Steps()
{
    const containerEl   = useRef(null);
    let containerClass = 'h-12 flex flex-row items-center rounded-xl px-6 box-border shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] bg-white dark:bg-my-darkGray2';
    containerClass += ' myLandscape:flex-col myLandscape:h-fit';
    let itemClass:string = 'flex flex-col h-10 min-w-[56px] box-border gap-0.5 items-center justify-center pt-2';
    itemClass += ' myLandscape:flex-row myLandscape:justify-start';
    let circleClass:string = 'h-2 w-2 bg-my-gray2 rounded-full z-10';
    let activeCircleClass:string = 'h-2 w-2 bg-my-purple3 dark:bg-my-orange rounded-full z-10'+darkModeTransformClass;
    let lineClass:string = 'absolute w-14 h-px bg-my-gray2 mt-1 ml-2 z-0';
    lineClass+= ' myLandscape:h-11 myLandscape:w-px myLandscape:ml-1';
    let activeLineClass:string = 'absolute w-14 h-px bg-my-orange dark:bg-my-orange2 mt-1 ml-2 z-0';
    activeLineClass += ' myLandscape:h-11 myLandscape:w-px myLandscape:ml-1';
    let spanClass:string = 'font-roboto h-5 text-xs leading-5 dark:text-white'+darkModeTransformClass;
    spanClass += ' ml-1';
    let activeSpanClass:string = 'font-roboto h-5 text-xs leading-5 dark:text-my-orange'+darkModeTransformClass;
    activeSpanClass += ' ml-1';

    useEffect(() => {
        if(!subContainerRef || !canvasRef) return;
        let subContainerRect                        = subContainerRef.getBoundingClientRect();
        let canvasRect                              = canvasRef.getBoundingClientRect();

        let containerEle:HTMLImageElement   = containerEl.current!;
        let cointainerRect                  = containerEle.getBoundingClientRect();
        let margintiop = ((subContainerRect.height - canvasRect.height -24 - canvasRect.top) / 2)+24;
        if(!isMobile) margintiop+=35;
        else if(isOrientation()==ORIENTATION.LANDSCAPE) margintiop-=24;
        containerEle.style.marginTop = margintiop+'px'
        
    });

    return  <div className={containerClass+darkModeTransformClass} ref={containerEl}>

                <div className={itemClass}>
                    <div className="h-2 w-2 flex">
                    <div className={activeCircleClass} />
                    <div className={activeLineClass} />
                    </div>
                    <span className={activeSpanClass}>
                        Upload
                    </span>
                </div>

                <div className={itemClass}>
                    <div className="h-2 w-2 flex">
                    <div className={circleClass} />
                    <div className={lineClass} />
                    </div>
                    <span className={spanClass}>
                        Edit
                    </span>
                </div>

                <div className={itemClass}>
                    <div className="h-2 w-2 flex">
                    <div className={circleClass} />
                    
                    </div>
                    <span className={spanClass}>
                        Export
                    </span>
                </div>


            </div>
}