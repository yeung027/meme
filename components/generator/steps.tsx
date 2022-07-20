import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { BiExport, BiDotsVerticalRounded } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { darkModeTransformClass } from "../../helpers/common";
import { 
    MemeState, 
    memeState as originMemeState,
} from "../../reducers/meme";

export default function Steps()
{
    const state:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();
    const defaultContainerClass = "h-12 flex flex-row items-center rounded-xl px-6 box-border shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] bg-white dark:bg-my-darkGray2";
    const defaultItemClass = "flex flex-col h-10 min-w-[56px] box-border gap-0.5 items-center justify-center pt-2";
    const defaultCircleClass = "h-2 w-2 bg-my-gray2 rounded-full z-10";
    const defaultActiveCircleClass = "h-2 w-2 bg-my-purple3 dark:bg-my-orange rounded-full z-10"+darkModeTransformClass;
    const defaultLineClass = "absolute w-14 h-px bg-my-gray2 mt-1 ml-2 z-0";
    const defaultActiveLineClass = "absolute w-14 h-px bg-my-orange dark:bg-my-orange2 mt-1 ml-2 z-0"+darkModeTransformClass;
    const defaultSpanClass = "font-roboto h-5 text-xs leading-5 dark:text-white"+darkModeTransformClass;
    const defaultActiveSpanClass = "font-roboto h-5 text-xs leading-5 dark:text-my-orange"+darkModeTransformClass;

    const [containerClass, setContainerClass] = useState(defaultContainerClass);
    const [itemClass, setItemClass] = useState(defaultItemClass);
    const [activeCircleClass, setActiveCircleClass] = useState(defaultActiveCircleClass);
    const [circleClass, setCircleClass] = useState(defaultCircleClass);
    const [lineClass, setLineClass] = useState(defaultLineClass);
    const [activeLineClass, setActiveLineClass] = useState(defaultActiveLineClass);
    const [spanClass, setSpanClass] = useState(defaultSpanClass);
    const [activeSpanClass, setActiveSpanClass] = useState(defaultActiveSpanClass);

    useEffect(() => {

        if(isMobile)
        {
            setContainerClass(defaultContainerClass+' border border-2 border-red-500 landscape:flex-col landscape:h-fit');
        }
    });

    return  <div className={containerClass+darkModeTransformClass}>

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