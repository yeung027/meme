import { BiExport, BiDotsVerticalRounded } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { 
    MemeState, 
    memeState as originMemeState,
} from "../../reducers/meme";

export default function Steps()
{
    const state:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();
    const circleClass = "h-2 w-2 bg-my-gray2 rounded-full z-10";
    const activeCircleClass = "h-2 w-2 bg-my-purple3 rounded-full z-10";
    const lineClass = "absolute w-14 h-px bg-my-gray2 mt-1 ml-2 z-0";
    const activeLineClass = "absolute w-14 h-px bg-my-orange mt-1 ml-2 z-0";


    return  <div className='h-12 flex flex-row items-center rounded-xl px-6 box-border shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)]'>

                <div className="flex flex-col h-10 min-w-[56px] box-border gap-0.5 items-center justify-center pt-1">
                    <div className="h-2 w-2 flex">
                    <div className={activeCircleClass} />
                    <div className={activeLineClass} />
                    </div>
                    <span className="font-roboto h-5 text-xs leading-5">
                        Upload
                    </span>
                </div>

                <div className="flex flex-col h-10 min-w-[56px] box-border gap-0.5 items-center justify-center pt-1">
                    <div className="h-2 w-2 flex">
                    <div className={circleClass} />
                    <div className={lineClass} />
                    </div>
                    <span className="font-roboto h-5 text-xs leading-5">
                        Edit
                    </span>
                </div>

                <div className="flex flex-col h-10 min-w-[56px] box-border gap-0.5 items-center justify-center pt-1">
                    <div className="h-2 w-2 flex">
                    <div className={circleClass} />
                    
                    </div>
                    <span className="font-roboto h-5 text-xs leading-5">
                        Export
                    </span>
                </div>


            </div>
}