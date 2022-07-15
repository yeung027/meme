import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { 
    MemeState, 
    memeState as originMemeState,
    exportDialogOpen
} from "../../reducers/meme";
import { BiX } from "react-icons/bi";
import { darkModeTransformClass } from "../../helpers/common";

export default function ExportDialog()
{
    const memeState:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();

    let componentClass:string = "w-screen h-screen absolute z-50 flex flex-col bg-white dark:bg-my-darkGray2 dark:text-white gap-2 duration-200 ease-in-out transform";
    componentClass += memeState.exportDialogOpen ? " opacity-100 translate-y-0" : " opacity-0 translate-y-full";
    
    return  <div className={componentClass}>
                <div className={"w-full h-[60px] bg-my-purple3 dark:bg-my-dark shadow-[0_1px_8px_1px_rgba(0,0,0,0.7)] dark:shadow-[0_1px_8px_1px_#0d0d0d] grid grid-cols-2"+darkModeTransformClass}>
                    <div className="h-full flex justify-start items-center pl-4">
                        <span className={"font-semibold font-roboto text-white dark:text-my-orange"+darkModeTransformClass}>
                            Export
                        </span>
                    </div>
                    <div className="h-full flex flex-row-reverse justify-start items-center pr-4">
                        <BiX
                            className={"text-white text-2xl cursor-pointer dark:text-my-orange hover:opacity-50"+darkModeTransformClass}
                            onClick={() => dispatch(exportDialogOpen(false))} 
                        />
                    </div>
                </div>
                <div className="w-full h-full">
                    yeah
                </div>
            </div>
}