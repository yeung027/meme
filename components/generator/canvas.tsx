import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { delay } from "../../helpers/common";
import { Base64 } from "../../models/generator";
import {
    GeneratorState,
    generatorState as originGeneratorState,
    setCompiledOutput
  } from '../../reducers/generator';

export default function Canvas()
{
    const generatorState:GeneratorState = useAppSelector(originGeneratorState);
    const dispatch = useAppDispatch();
    const containerEl   = useRef(null);
    const imgEl         = useRef(null);
    let containerClass = 'flex flex-col justify-center items-center h-full w-full border border-2 border-red-500';
    let defaultImageClass = 'absolute border-2 border-my-purple4 max-w-[95%] max-h-[calc(100vh-70px-96px-48px-16px-24px-24px-50px)] myLandscape:max-h-[95%]';
    defaultImageClass+= ' desktop:h-full';
    const [imageClass, setImageClass] = useState(defaultImageClass);
    const [rotateCanvas, setRotateCanvas] = useState(false);
    
  const onload = async ()=>{

  }

    useEffect(() => {
      onload();
    });


    return  <div className={containerClass} ref={containerEl}>
                <img 
                    ref={imgEl}
                    className={imageClass}
                    src={generatorState.rawImageUrl}
                 />
                 <div className="absolute w-1/2 z-10"><img src='generator/example/2.jpg' /></div>
                 
            </div>
}