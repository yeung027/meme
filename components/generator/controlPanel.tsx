import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { delay } from "../../helpers/common";
import { 
    controlPanelEase,
    MemeState, 
    memeState as originMemeState,
} from "../../reducers/meme";
import UploadPanel from "./controlPanel/upload";

export default function ControlPanel()
{
    const memeState:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();

    const show = async() =>{
        await delay(2000);
        dispatch(controlPanelEase(false));
        await delay(2000);
        dispatch(controlPanelEase(true));
    }

    useEffect(() => {
        show();
    });
      
    let componentClass:string = "w-full h-full flex justify-center items-center duration-500 ease-in-out transform";
    componentClass += memeState.controlPanelEase ? " translate-y-0" : " translate-y-full";
    
    return  <div className={componentClass}>
                <UploadPanel />
            </div>
}