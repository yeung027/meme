import { BiExport, BiDotsHorizontalRounded } from "react-icons/bi";

export default function Header()
{
    return  <div className='w-full h-[70px] grid grid-cols-2 items-end text-white'>
                <div className='flex flex-row text-left pl-2 font-medium'>
                    Generator
                </div>
                <div className='flex flex-row-reverse h-full items-end text-2xl pr-2 pb-1 gap-2'>
                    <BiExport className="cursor-pointer" />
                    <BiDotsHorizontalRounded className="cursor-pointer" />
                </div>
            </div>
}