import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { wideEnoughToSetLandscape } from "../../helpers/generator/image";
import { GeneratorState } from "../../reducers/generator";
import { 
    MemeState, 
    memeState as originMemeState,
} from "../../reducers/meme";
import {
    generatorState as originGeneratorState
  } from '../../reducers/generator';

export default function Canvas()
{
    const [rotateCanvas, setRotateCanvas] = useState(false);

    useEffect(() => {
        wideEnoughToSetLandscape(generatorState.rawImageUrl).then((result:boolean)=>{
            console.log('result: '+result);
            setRotateCanvas(result);
        })
    });

    const memeState:MemeState = useAppSelector(originMemeState);
    const generatorState:GeneratorState = useAppSelector(originGeneratorState);
    const dispatch = useAppDispatch();
    let containerClass = 'flex flex-col justify-center items-center';
    containerClass += ' w-full h-[calc(100vh-70px-96px-48px-16px-24px-24px)] desktop:h-[calc(100vh-70px-24px-24px-16px-48px)]';

    let imageClass = 'border-2 border-my-purple4';
    if(rotateCanvas) imageClass += ' -rotate-90 desktop:rotate-0 ';
    else imageClass += ' max-w-full max-h-full';

    return  <div className={containerClass}>
                <img 
                    className={imageClass}
                    src={generatorState.rawImageUrl}
                 />
            </div>
}