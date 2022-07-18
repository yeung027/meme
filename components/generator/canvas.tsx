import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getImageSize, wideEnoughToSetLandscape } from "../../helpers/generator/image";
import { ImageBasicInfo } from "../../models/generator";
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
    useEffect(() => {
        getImageSize(generatorState.rawImageUrl).then((result:ImageBasicInfo)=>{
            console.log('wtf: '+result.width+', '+result.height)
        });
        wideEnoughToSetLandscape(generatorState.rawImageUrl).then((result:boolean)=>{
            console.log('the result is ...: '+result);
        })
    });

    const memeState:MemeState = useAppSelector(originMemeState);
    const generatorState:GeneratorState = useAppSelector(originGeneratorState);
    const dispatch = useAppDispatch();
    let containerClass = 'flex flex-col justify-center items-center';
    containerClass+= ' w-full h-[calc(100vh-70px-96px-48px-16px-24px-24px)] desktop:h-[calc(100vh-70px-24px-24px-16px-48px)]';
    return  <div className={containerClass}>
                <img 
                    className="max-w-full max-h-full border-2 border-my-purple4"
                    src={generatorState.rawImageUrl}
                 />
            </div>
}