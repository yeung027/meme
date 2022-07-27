import Link from "next/link";
import { BiX, BiHomeAlt } from "react-icons/bi";

export default function GeneratorList()
{


    let componentClass:string = "h-full flex flex-col gap-4 min-w-[80%]";
    let itemClass:string = "rounded-3xl bg-white dark:bg-my-gray py-1.5 px-3.5 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.09)] flex flex-row";
    let avatorClass:string = "rounded-full border-2 border-my-purple2 dark:border-dark-purple flex justify-center content-center w-[51px] h-[51px] overflow-hidden";
    let avatorImgClass:string = "w-[46px] h-[46px] m-auto";
    let listItemCenterClass:string = "flex flex-col justify-center content-center ml-5 gap-px";
    let span1Class:string = "h-5 text-black dark:text-my-yellow2 text-base font-semibold";
    let span2Class:string = "h-5 text-lightBlue dark:text-my-yellow text-sm font-normal";

    return  <div className={componentClass}>
                <Link href="/example">
                    <a className={itemClass}>
                        <div className={avatorClass}>
                            <img className={avatorImgClass} src="generator/example/p1.jpg" />
                        </div>
                        <div className={listItemCenterClass}>
                            <span className={span1Class}>hello</span>
                            <span className={span2Class}>bye</span>
                        </div>
                    </a>
                </Link>

                <Link href="/">
                    <a className={itemClass}>
                        <div className={avatorClass}>
                            <img className={avatorImgClass} src="generator/example/p1.jpg" />
                        </div>
                        <div className={listItemCenterClass}>
                            <span className={span1Class}>hello</span>
                            <span className={span2Class}>bye</span>
                        </div>
                    </a>
                </Link>
                
            </div>
}