import { BiExport, BiDotsVerticalRounded } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { 
    MemeState, 
    memeState as originMemeState,
    menuOpen,
    exportDialogOpen
} from "../reducers/meme";

export default function Header()
{
    const state:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();

    return  <div className='w-full h-[70px] grid grid-cols-2 items-end text-white pb-2 z-10 desktop:bg-my-purple'>
                <div className='flex flex-row text-left pl-2.5 desktop:pl-4 font-medium whitespace-nowrap'>
                    Generator
                </div>
                <div className='flex flex-row-reverse h-full items-end text-2xl pr-2.5 desktop:pr-4 gap-3'>
                    <BiDotsVerticalRounded 
                        className="cursor-pointer" 
                        onClick={() => dispatch(menuOpen(true))} 
                    />
                    <BiExport 
                        className="cursor-pointer"
                        onClick={() => dispatch(exportDialogOpen(true))} 
                    />
                </div>
            </div>
}