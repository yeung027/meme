import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { 
    MemeState, 
    memeState as originMemeState,
} from "../../../reducers/meme";
import { BiBell, BiPlus } from "react-icons/bi";

export default function UploadPanel()
{
    const memeState:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();
    let uploadBtnIcon =     <div className="h-9 flex flex-row items-center">
                                <BiPlus className="text-base" />
                            </div>
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
                <div className="w-full h-full flex flex-row justify-center items-center">
                    <div className="bg-my-purple3 flex flex-row gap-2 h-9 rounded-xl px-2.5 text-white text-xs font-normal cursor-pointer hover:text-my-orange">
                        {uploadBtnIcon}
                        <span className="flex items-center">Upload</span>
                    </div>
                </div>
            </div>
}