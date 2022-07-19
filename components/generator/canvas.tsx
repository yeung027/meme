import { useEffect, useRef, useState } from "react";
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
    const containerEl   = useRef(null);
    const imgEl         = useRef(null);

    useEffect(() => {
        wideEnoughToSetLandscape(generatorState.rawImageUrl).then((result:boolean)=>{
            setRotateCanvas(result);
            //let containerDivEl:HTMLDivElement   = containerEl.current!;
            //let htmlImgEl:HTMLImageElement      = imgEl.current!;
            //rotateImgToLandscape(containerDivEl, htmlImgEl);
        })
    });

    const memeState:MemeState = useAppSelector(originMemeState);
    const generatorState:GeneratorState = useAppSelector(originGeneratorState);
    const dispatch = useAppDispatch();
    let containerClass = 'flex flex-col justify-center items-center border border-2 border-red-500';
    containerClass += ' w-full h-[calc(100vh-70px-96px-48px-16px-24px-24px)] desktop:h-[calc(100vh-70px-24px-24px-16px-48px)]';

    let imageClass = 'border-2 border-my-purple4 max-w-full max-h-full';

    return  <div className={containerClass} ref={containerEl}>
                <img 
                    ref={imgEl}
                    className={imageClass}
                    src={generatorState.rawImageUrl}
                 />
            </div>
}