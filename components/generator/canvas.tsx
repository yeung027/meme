import { useRef } from "react";
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
    return  <div className='' ref={containerEl}>
                <img 
                    ref={imgEl}
                    className=''
                    src={generatorState.rawImageUrl}
                 />
            </div>
}