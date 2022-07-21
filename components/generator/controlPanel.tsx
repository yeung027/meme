import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { 
    MemeState, 
    memeState as originMemeState,
} from "../../reducers/meme";
import UploadPanel from "./controlPanel/upload";

export default function ControlPanel()
{
    const memeState:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();

    let componentClass:string = "border border-4 border-yellow-500 w-full h-full flex justify-center items-center duration-500 ease-in-out transform";
    componentClass += memeState.controlPanelEase ? " translate-y-0" : " translate-y-full";
    
    return  <div className={componentClass}>
                fsdfdsfs<UploadPanel />
            </div>
}