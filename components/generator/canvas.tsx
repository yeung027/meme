import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { 
    MemeState, 
    memeState as originMemeState,
} from "../../reducers/meme";

export default function Canvas()
{
    const state:MemeState = useAppSelector(originMemeState);
    const dispatch = useAppDispatch();
    let containerClass = 'flex flex-col justify-center items-center';
    containerClass+= ' w-full h-[calc(100vh-70px-96px-48px-16px-24px-24px)] desktop:h-[calc(100vh-70px-24px-24px-16px-48px)]';
    return  <div className={containerClass}>
                <img 
                    className="max-w-full max-h-full border-2 border-my-purple4"
                    src="generator/example/4.jpg"
                 />
            </div>
}