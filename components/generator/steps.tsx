import { darkModeTransformClass } from "../../helpers/common";


export default function Steps()
{
    const itemClass:string = '';
    const circleClass:string = '';
    const activeCircleClass:string = '';
    const lineClass:string = '';
    const activeLineClass:string = '';
    const spanClass:string = '';
    const activeSpanClass:string = '';

    return  <div className={''+darkModeTransformClass}>

                <div className={itemClass}>
                    <div className="h-2 w-2 flex">
                    <div className={activeCircleClass} />
                    <div className={activeLineClass} />
                    </div>
                    <span className={activeSpanClass}>
                        Upload
                    </span>
                </div>

                <div className={itemClass}>
                    <div className="h-2 w-2 flex">
                    <div className={circleClass} />
                    <div className={lineClass} />
                    </div>
                    <span className={spanClass}>
                        Edit
                    </span>
                </div>

                <div className={itemClass}>
                    <div className="h-2 w-2 flex">
                    <div className={circleClass} />
                    
                    </div>
                    <span className={spanClass}>
                        Export
                    </span>
                </div>


            </div>
}