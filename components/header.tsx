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

    return  <div 
                className='w-full h-[70px] grid grid-cols-2 items-end text-white pb-2 z-10 dark:bg-dark-purple desktop:bg-my-purple'
            >
                <div className="hidden desktop:block w-full h-[70px] absolute top-0 dark:bg-dark-purple z-0" />
                <div className='flex flex-row text-left pl-2.5 desktop:pl-4 font-medium whitespace-nowrap text-white dark:text-my-yellow z-10'>
                    Generator
                </div>
                <div className='flex flex-row-reverse h-full items-end text-2xl pr-2.5 desktop:pr-4 gap-3 z-10'>
                    <BiDotsVerticalRounded 
                        className="cursor-pointer text-white dark:text-my-yellow" 
                        onClick={() => dispatch(menuOpen(true))} 
                    />
                    <BiExport 
                        className="cursor-pointer text-white dark:text-my-yellow"
                        onClick={() => dispatch(exportDialogOpen(true))} 
                    />
                </div>
            </div>
}