import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    GeneratorState,
    generatorState as originGeneratorState,
  } from '../../reducers/generator';
/* @ts-ignore */
import fx from "glfx";
import Textarea from 'react-expanding-textarea'
import { Editable } from "../../models/generator";

export default function Canvas()
{
    const generatorState:GeneratorState = useAppSelector(originGeneratorState);
    const dispatch = useAppDispatch();
    const containerEl   = useRef(null);
    const imgEl         = useRef(null);
    let containerClass = 'flex flex-col justify-center items-center h-full w-full';
    let defaultImageClass = 'absolute border-2 border-my-purple4 max-w-[95%] max-h-[calc(100vh-70px-96px-48px-16px-24px-24px-50px)] myLandscape:max-h-[95%]';
    defaultImageClass+= ' desktop:h-full';
    const [imageClass, setImageClass] = useState(defaultImageClass);
    const [rotateCanvas, setRotateCanvas] = useState(false);
    
  const onload = async ()=>{
    var canvas = fx.canvas();
  }

    useEffect(() => {
      onload();
    });



    return  <div className={containerClass} ref={containerEl}>
     {/* et a = <img src={editable.b64} className="absolute border border-4 border-red-500 w-[200px] h-[100px]" /> */}
                
                  {generatorState.editables.map((editable:Editable, i) => {
                    let imgEle = <img src={editable.b64} key={`key-canvas-img-${i}`} className="absolute border border-2 border-red-500 w-fit h-fit z-20" />
                    return imgEle
                  })}
                 <img 
                    ref={imgEl}
                    className={imageClass}
                    src={generatorState.rawImageUrl}
                 />
            </div>
}