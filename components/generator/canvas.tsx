import { useLayoutEffect, useRef, useState } from "react";
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
import { isMobile } from "react-device-detect";
import { addWindowSizeChangeListener } from "../../helpers/common";

export default function Canvas()
{
    const defaultContainerClass = 'flex flex-col justify-center items-center border border-2 border-red-500';
    const [containerClass, setContainerClass] = useState(defaultContainerClass);
    const [rotateCanvas, setRotateCanvas] = useState(false);
    const [windowHeight, setWindowHeight] = useState(0);
    const containerEl   = useRef(null);
    const imgEl         = useRef(null);

    useLayoutEffect(() => {
        const handler = ()=>{
            if(window) setWindowHeight(window.innerHeight);
        }

        addWindowSizeChangeListener(handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    useLayoutEffect(() => {
        if(isMobile)
        {
            let landscapeHeight:string  = '';
            let portraitHeight:string   = '';
            if(window)
            {
                let containerDivEl:HTMLDivElement   = containerEl.current!;
                let containerCompStyles  = window.getComputedStyle(containerDivEl);
                setWindowHeight(window.innerHeight);
                landscapeHeight = ' landscape:h-['+containerCompStyles.height+'px]';
                portraitHeight  = ' h-[calc('+windowHeight+'px-70px-96px-48px-16px-24px-24px)]';
            }
            setContainerClass(defaultContainerClass+' w-full h-full '+portraitHeight+' '+landscapeHeight);
        }
        else
        {
            setContainerClass(defaultContainerClass+' desktop:h-[calc(100vh-70px-24px-24px-16px-48px)]');
        }
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
    
    let imageClass = 'border-2 border-my-purple4 max-w-full max-h-full h-1/2 w-1/2';

    return  <div className={containerClass} ref={containerEl}>
                {/* <img 
                    ref={imgEl}
                    className={imageClass}
                    src={generatorState.rawImageUrl}
                 /> */}
            </div>
}