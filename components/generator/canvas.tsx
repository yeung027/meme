import { useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import {
    GeneratorState,
    generatorState as originGeneratorState
  } from '../../reducers/generator';

export default function Canvas()
{
    const generatorState:GeneratorState = useAppSelector(originGeneratorState);
    const containerEl   = useRef(null);
    const imgEl         = useRef(null);
    let containerClass = 'flex flex-col justify-center items-center h-full w-full';
    let defaultImageClass = 'absolute border-2 border-my-purple4 max-w-[95%] max-h-[calc(100vh-70px-96px-48px-16px-24px-24px-50px)] myLandscape:max-h-[95%]';
    defaultImageClass+= ' desktop:h-full';
    const [imageClass, setImageClass] = useState(defaultImageClass);
    const [rotateCanvas, setRotateCanvas] = useState(false);
    
    return  <div className={containerClass} ref={containerEl}>
                <img 
                    ref={imgEl}
                    className={imageClass}
                    src={generatorState.rawImageUrl}
                 />
            </div>
}