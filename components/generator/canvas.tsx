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
import { addOrientationChangeListener, addWindowSizeChangeListener } from "../../helpers/common";

export default function Canvas()
{
    const defaultContainerClass = 'flex flex-col justify-center items-center';
    const defaultImageClass = 'border-2 border-my-purple4 desktop:max-w-full desktop:max-h-full absolute desktop:static';
    const [containerClass, setContainerClass] = useState(defaultContainerClass);
    const [imageClass, setImageClass] = useState(defaultImageClass);
    const [rotateCanvas, setRotateCanvas] = useState(false);
    const containerEl   = useRef(null);
    const imgEl         = useRef(null);

    const updateLayout = ()=>{
        if(isMobile)
        {
            let landscapeHeight:string  = '';
            let portraitHeight:string   = '';
            let imageClass = '';
            if(window)
            {
                let containerDivEl:HTMLDivElement   = containerEl.current!;
                let canvasRect        = containerDivEl.getBoundingClientRect();
                landscapeHeight = ' ';
                portraitHeight  = ' h-[calc('+window.innerHeight+'px-70px-96px-48px-16px-24px-24px)]';
                imageClass = '  max-w-[90%] landscape:h-['+canvasRect.height+'px]';
            }
            setContainerClass(defaultContainerClass+' w-full h-full '+portraitHeight+' '+landscapeHeight);
            setImageClass(defaultImageClass+imageClass);
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
    }

    useLayoutEffect(() => {

        addWindowSizeChangeListener(updateLayout);
        addOrientationChangeListener(updateLayout);
        return () => {
            window.removeEventListener('resize', updateLayout);
            //window.removeEventListener('orientationchange', updateLayout);
        };
    }, []);

    useLayoutEffect(() => {
        updateLayout();
    });

    const memeState:MemeState = useAppSelector(originMemeState);
    const generatorState:GeneratorState = useAppSelector(originGeneratorState);
    const dispatch = useAppDispatch();
    

    return  <div className={containerClass} ref={containerEl}>
                <img 
                    ref={imgEl}
                    className={imageClass}
                    src={generatorState.rawImageUrl}
                 />
            </div>
}