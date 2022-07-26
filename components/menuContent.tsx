import Link from "next/link";
import { BiHomeAlt } from "react-icons/bi";
import { useAppDispatch } from "../app/hooks";
import { darkModeTransformClass } from "../helpers/common";
import { menuOpen } from "../reducers/meme";
export default function MenuContent(props:{isIndex:boolean})
{    
    const dispatch = useAppDispatch();
    return      <ul className={`w-full h-full z-20 pt-16 ${props.isIndex? `desktop:pt-6` : `desktop:-pt-16`}`}>
                    <Link href="/">
                        <li 
                            className={"text-my-gray dark:text-my-orange pl-8 pt-3 pb-2 space-x-1 cursor-pointer group hover:text-my-orange"+darkModeTransformClass}
                            onClick={() => dispatch(menuOpen(false))}
                        >
                            <a className="flex flex-row ">
                            <BiHomeAlt className={"text-my-gray dark:text-my-orange text-xl group-hover:text-my-orange"+darkModeTransformClass} />
                            <span className="pl-2">Home</span>
                            </a>
                        </li>
                    </Link>
                </ul>
}