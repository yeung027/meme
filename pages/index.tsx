import { NextPage } from "next"
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import GeneratorList from "../components/generator/generatorsList";
import Header from "../components/header";
import Menu from "../components/menu";
import MenuContent from "../components/menuContent";
import { addScrollListener, darkModeTransformClass } from "../helpers/common";
import { setHeaderVisible } from "../reducers/meme";


const Index: NextPage = () => {

  const dispatch = useAppDispatch();
  const containerEl   = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  let containerClass:string = 'overflow-x-hidden box-border min-h-full w-screen bg-my-purple dark:bg-dark-purple grid grid-rows-[70px_1fr] font-roboto';
  containerClass += ' myLandscape:grid-cols-[70px_1fr]';
  let subcontainer1Class = 'overflow-hidden grid grid-rows-[1fr] desktop:flex desktop:flex-row-reverse desktop:gap-6 desktop:min-h-fit desktopDark:bg-my-dark';
  subcontainer1Class += ' dark:bg-my-dark desktop:bg-lightGray';
  subcontainer1Class += ' landscapeFillAvailable myLandscape:pb-0.5 myLandscape:rounded-bl-3xl';
  let subSubcontainer1Class = 'desktop:ml-[316px] overflow-hidden min-h-full h-fit bg-lightGray dark:bg-my-dark w-full flex items-center justify-center gap-y-4 rounded-t-3xl desktop:rounded-none py-6 shadow-[0_-6px_7px_2px_rgba(105,0,197,1)] dark:shadow-[0_-10px_7px_2px_rgba(23,23,23,0.5)] desktop:shadow-none z-10';
  subSubcontainer1Class +=' myLandscape:rounded-tr-none myLandscape:flex myLandscape:flex-row myLandscape:gap-2 myLandscape:items-center';
  let subSubcontainer2Class = 'hidden desktop:flex border-t desktop:border-0 border-my-gray2 dark:border-my-dark h-24 w-full bg-white dark:bg-my-darkGray2 desktop:h-full desktop:w-[300px] desktop:shadow-[1px_0_15px_1px_rgba(0,0,0,0.2)]';
  subSubcontainer2Class +=' myLandscape:bg-my-purple mobileDark:bg-dark-purple desktop:fixed desktop:left-0';
  
  const scrollHandler = () => {
    dispatch(setHeaderVisible((window.pageYOffset <= scrollIndex) && ( (window.pageYOffset * 0.7) < scrollIndex && 300 > scrollIndex)) );

    setScrollIndex(window.pageYOffset);
  }


  useEffect(() => {
    addScrollListener(scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    }
  });

  return (
    
    <div className={containerClass} ref={containerEl}>
      <Head>
        <title>Meme Generator</title>
        <link rel="shortcut icon" href="/icos/favicon.ico" />
      </Head>
      <div className='landscapeFillAvailable' >
        <Menu isIndex={true} />
        <Header title="Meme Generator" isIndex={true} />
      </div>
      <div className={subcontainer1Class}>
        <div className={subSubcontainer1Class+darkModeTransformClass}>
            <GeneratorList />
        </div>
        <div className={subSubcontainer2Class+darkModeTransformClass}>
            <div className="hidden desktop:block">
                <MenuContent isIndex={true} />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Index