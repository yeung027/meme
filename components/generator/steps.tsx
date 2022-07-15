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
    const circleClass = "h-2 w-2 bg-my-gray2 rounded-full z-10";
    const activeCircleClass = "h-2 w-2 bg-my-purple3 dark:bg-my-orange rounded-full z-10"+darkModeTransformClass;
    const lineClass = "absolute w-14 h-px bg-my-gray2 mt-1 ml-2 z-0";
    const activeLineClass = "absolute w-14 h-px bg-my-orange dark:bg-my-orange2 mt-1 ml-2 z-0"+darkModeTransformClass;
    const spanClass = "font-roboto h-5 text-xs leading-5 dark:text-white"+darkModeTransformClass;
    const activeSpanClass = "font-roboto h-5 text-xs leading-5 dark:text-my-orange"+darkModeTransformClass;


    return  <div className={'h-12 flex flex-row items-center rounded-xl px-6 box-border shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] bg-white dark:bg-my-darkGray2'+darkModeTransformClass}>

                <div className="flex flex-col h-10 min-w-[56px] box-border gap-0.5 items-center justify-center pt-2">
                    <div className="h-2 w-2 flex">
                    <div className={activeCircleClass} />
                    <div className={activeLineClass} />
                    </div>
                    <span className={activeSpanClass}>
                        Upload
                    </span>
                </div>

                <div className="flex flex-col h-10 min-w-[56px] box-border gap-0.5 items-center justify-center pt-2">
                    <div className="h-2 w-2 flex">
                    <div className={circleClass} />
                    <div className={lineClass} />
                    </div>
                    <span className={spanClass}>
                        Edit
                    </span>
                </div>

                <div className="flex flex-col h-10 min-w-[56px] box-border gap-0.5 items-center justify-center pt-2">
                    <div className="h-2 w-2 flex">
                    <div className={circleClass} />
                    
                    </div>
                    <span className={spanClass}>
                        Export
                    </span>
                </div>


            </div>
}