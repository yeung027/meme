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
import { addOrientationChangeListener, addSizeChangeListener, delay, isOrientation, setCanvasRef, waitForWindow } from "../../helpers/common";


export default function Canvas()
{
    const generatorState:GeneratorState = useAppSelector(originGeneratorState);
    const dispatch = useAppDispatch();
    const containerEl   = useRef(null);
    const imgEl         = useRef(null);
    let containerClass = 'flex flex-col justify-center items-center h-full w-full';
    let defaultImageClass = 'z-10 absolute border-2 border-my-purple4 max-w-[95%] max-h-[calc(100vh-70px-96px-48px-16px-24px-24px-50px)] myLandscape:max-h-[95%]';
    defaultImageClass+= ' desktop:h-full';
    const [imageClass, setImageClass] = useState(defaultImageClass);
    const [version, setVersion] = useState(0);
    
    const onload = async ()=>{
      //var canvas = fx.canvas();
      sizeChangeHandler();

      setInterval(() => {
        setVersion(version + 1);
      }, 1000);
    }

    const sizeChangeHandler = () => {
      let imgEle:HTMLImageElement   = imgEl.current!;
      let imgRect:DOMRect;
      if(imgEle) imgRect = imgEle.getBoundingClientRect();

      // console.log(headerRef);
      // console.log(`${imgRect.x}, ${imgRect.y}`);
    }//END sizeChangeHandler

    useEffect(() => {
      onload();
      let containerEle:HTMLDivElement = containerEl.current!;
      addOrientationChangeListener(containerEle, sizeChangeHandler);
      addSizeChangeListener(containerEle, sizeChangeHandler);
      setCanvasRef(containerEl.current!);
      return () => {
        containerEle.removeEventListener('orientationchange', sizeChangeHandler);
        containerEle.removeEventListener('resize', sizeChangeHandler);
      }
    });



    return  <div className={containerClass} ref={containerEl}>       
                  <img 
                    ref={imgEl}
                    className={imageClass}
                    src={generatorState.rawImageUrl}
                 />
                  {generatorState.editables.map((editable:Editable, i) => {
                    let imgEle:HTMLImageElement   = imgEl.current!;
                    let imgCompStyles;
                    if(window && imgEle)
                      imgCompStyles = window.getComputedStyle(imgEle);

                    const classStr:string = 'absolute border border-2 border-red-500 w-fit h-fit z-20';
                    let top:number = imgCompStyles ? parseInt(imgCompStyles.top)+editable.y : 0;
                    let left:number = imgCompStyles ? parseInt(imgCompStyles.left)+editable.x : 0;
                    let style = {
                      top:top+'px',
                      left:left+'px'
                    }
                    
                    let ele = <img src={editable.b64} key={`key-canvas-img-${i}`} className={classStr} style={style} />
                    return ele
                  })}
                 
            </div>
}