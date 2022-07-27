import Link from "next/link";
import { BiX, BiHomeAlt } from "react-icons/bi";
import { darkModeTransformClass } from "../../helpers/common";

export default function GeneratorList()
{


    let componentClass:string = "overflow-hidden h-fit flex flex-col gap-2 min-w-[80%]";
    let itemClass:string = "mx-4 my-3 rounded-2xl bg-white dark:bg-my-gray py-1.5 px-3.5 shadow-[5px_5px_15px_3px_rgba(0,0,0,0.09)] flex flex-row"+darkModeTransformClass;
    let avatorClass:string = "rounded-full border-2 border-my-purple2 dark:border-dark-purple flex justify-center content-center w-[51px] h-[51px] overflow-hidden"+darkModeTransformClass;
    let avatorImgClass:string = "w-[46px] h-[46px] m-auto";
    let listItemCenterClass:string = "flex flex-col justify-center content-center ml-5 gap-px";
    let span1Class:string = "h-5 text-black dark:text-my-yellow2 text-base font-semibold"+darkModeTransformClass;
    let span2Class:string = "h-5 text-lightBlue dark:text-my-yellow text-sm font-normal"+darkModeTransformClass;

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
                            <img className={avatorImgClass} src="generator/example/2.jpg" />
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
                            <img className={avatorImgClass} src="generator/example/2.jpg" />
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
                            <img className={avatorImgClass} src="generator/example/2.jpg" />
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
                            <img className={avatorImgClass} src="generator/example/2.jpg" />
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
                            <img className={avatorImgClass} src="generator/example/2.jpg" />
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
                            <img className={avatorImgClass} src="generator/example/2.jpg" />
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
                            <img className={avatorImgClass} src="generator/example/2.jpg" />
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
                            <img className={avatorImgClass} src="generator/example/2.jpg" />
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
                            <img className={avatorImgClass} src="generator/example/2.jpg" />
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
                            <img className={avatorImgClass} src="generator/example/2.jpg" />
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
                            <img className={avatorImgClass} src="generator/example/2.jpg" />
                        </div>
                        <div className={listItemCenterClass}>
                            <span className={span1Class}>hello</span>
                            <span className={span2Class}>3</span>
                        </div>
                    </a>
                </Link>
                 
            </div>
}