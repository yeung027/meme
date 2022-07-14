import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { 
    MemeState, 
    memeState as originMemeState,
} from "../../../reducers/meme";
import { BiBell } from "react-icons/bi";

export default function UploadPanel()
{
    const memeState:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();

    return  <div className="w-full h-full flex flex-col">
                <div className="w-full h-11 grid grid-cols-2">
                    <div className="h-11 flex flex-row items-center pl-4">
                        <BiBell className="text-my-purple3" />
                        <span className="text-sm text-black pl-1 font-medium font-roboto">
                            Upload photo
                        </span>
                    </div>
                    <div className="h-11 flex flex-row-reverse items-center pr-4">
                        <span className="text-xs font-normal text-my-purple3 cursor-pointer hover:text-my-orange">
                            skip
                        </span>
                    </div>
                </div>
            </div>
}