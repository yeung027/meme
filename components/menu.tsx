import { BiX, BiHomeAlt } from "react-icons/bi";

export default function Menu()
{
    return  <div className="fixed w-screen h-screen duration-500 ease-in-out transition z-30 flex flex-row">
                <div className="w-4/6 h-screen bg-[#F5F5F5] shadow-[8px_0_10px_5px_rgba(0,0,0,0.2)]">
                    <div className="fixed w-4/6 flex flex-row justify-end pt-2 pr-2 z-30">
                        <BiX className="text-my-purple text-xl cursor-pointer" />
                    </div>
                    <ul className="w-full h-full flex z-20 flex flex-col">
                        <li className="flex flex-row text-my-gray pl-8 pt-16 space-x-1 cursor-pointer hover:text-emerald-300">
                            <BiHomeAlt className="text-my-gray text-xl" />
                            <span>Home</span>
                        </li>
                    </ul>
                </div>
                <div className="w-2/6 h-screen" />
                
            </div>
}