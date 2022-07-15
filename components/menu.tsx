import { BiX, BiHomeAlt } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { 
    MemeState, 
    memeState as originMemeState,
    menuOpen,
} from "../reducers/meme";

export default function Menu()
{
    const memeState:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();

    let componentClass:string = "fixed w-screen h-screen duration-200 ease-in-out transform z-30 flex flex-row";
    componentClass += memeState.menuOpen ? "translate-x-0" : " -translate-x-full";
    
    return  <div className={componentClass}>
                <div className="w-4/6 desktop:w-72 h-screen bg-lightGray dark:bg-my-darkGray shadow-[8px_0_10px_5px_rgba(0,0,0,0.2)]">
                    <div className="fixed w-4/6 desktop:w-72 flex flex-row justify-end pt-2 pr-2 z-30">
                        <BiX 
                            className="text-my-purple3 dark:text-my-orange text-xl cursor-pointer"
                            onClick={() => dispatch(menuOpen(false))}
                         />
                    </div>
                    <ul className="w-full h-full flex z-20 flex flex-col ">
                        <li className="flex flex-row text-my-gray dark:text-my-orange pl-8 pt-16 space-x-1 cursor-pointer group hover:text-my-orange">
                            <BiHomeAlt className="text-my-gray dark:text-my-orange text-xl group-hover:text-my-orange" />
                            <span className="">Home</span>
                        </li>
                    </ul>
                </div>
                <div className="w-2/6 desktop:w-[calc(100%-288px)] h-screen" onClick={() => dispatch(menuOpen(false))} />
                
            </div>
}