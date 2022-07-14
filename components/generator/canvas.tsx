import { BiExport, BiDotsVerticalRounded } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { 
    MemeState, 
    memeState as originMemeState,
} from "../../reducers/meme";

export default function Canvas()
{
    const state:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();

    return  <div className='w-full h-full border border-blue-500 flex flex-col justify-center items-center'>
                1
            </div>
}