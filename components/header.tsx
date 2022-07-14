import { BiExport, BiDotsVerticalRounded } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { 
    MemeState, 
    memeState,
    menuOpen
} from "../reducers/meme";

export default function Header()
{
    const state:MemeState = useAppSelector(memeState);
    const dispatch = useAppDispatch();

    return  <div className='w-full h-[70px] grid grid-cols-2 items-end text-white pb-2 z-10'>
                <div className='flex flex-row text-left pl-2 font-medium'>
                    Generator
                </div>
                <div className='flex flex-row-reverse h-full items-end text-2xl pr-2 gap-2'>
                    <BiDotsVerticalRounded 
                        className="cursor-pointer" 
                        onClick={() => dispatch(menuOpen(true))} 
                    />
                    <BiExport className="cursor-pointer" />
                </div>
            </div>
}