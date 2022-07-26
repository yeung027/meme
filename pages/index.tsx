import { NextPage } from "next"
import Head from "next/head";
import { useRef } from "react";
import { useAppDispatch } from "../app/hooks";
import Header from "../components/header";
import Menu from "../components/menu";
import MenuContent from "../components/menuContent";
import { darkModeTransformClass } from "../helpers/common";


const Index: NextPage = () => {

  const dispatch = useAppDispatch();
  const containerEl   = useRef(null);
  let containerClass:string = 'box-border h-full w-screen bg-my-purple dark:bg-dark-purple grid grid-rows-[70px_1fr] overflow-hidden font-roboto';
  containerClass += ' myLandscape:grid-cols-[70px_1fr]';
  let subcontainer1Class = 'grid grid-rows-[1fr_96px] desktop:flex desktop:flex-row-reverse desktop:gap-6 desktop:h-full desktopDark:bg-my-dark';
  subcontainer1Class += ' dark:bg-my-dark desktop:bg-lightGray';
  subcontainer1Class += ' landscapeFillAvailable myLandscape:pb-0.5 myLandscape:rounded-bl-3xl';
  let subSubcontainer1Class = 'bg-lightGray dark:bg-my-dark w-full grid grid-rows-[48px_1fr] justify-items-center gap-y-4 rounded-t-3xl desktop:rounded-none p-6 shadow-[0_-6px_7px_2px_rgba(105,0,197,1)] dark:shadow-[0_-10px_7px_2px_rgba(23,23,23,0.5)] desktop:shadow-none z-10';
  subSubcontainer1Class +=' myLandscape:rounded-tr-none myLandscape:flex myLandscape:flex-row myLandscape:gap-2 myLandscape:items-center';
  let subSubcontainer2Class = 'border-t desktop:border-0 border-my-gray2 dark:border-my-dark h-24 w-full bg-white dark:bg-my-darkGray2 desktop:h-full desktop:w-[300px] desktop:shadow-[1px_0_15px_1px_rgba(0,0,0,0.2)]';
  subSubcontainer2Class +=' myLandscape:bg-my-purple mobileDark:bg-dark-purple ';
  
  return (
    
    <div className={containerClass} ref={containerEl}>
      <Head>
        <title>Meme Generator</title>
        <link rel="shortcut icon" href="/icos/favicon.ico" />
      </Head>
      <div className='landscapeFillAvailable' >
        <Menu />
        <Header title="Meme Generator" isIndex={true} />
      </div>
      <div className={subcontainer1Class}>
        <div className={subSubcontainer1Class+darkModeTransformClass}>
            1
        </div>
        <div className={subSubcontainer2Class+darkModeTransformClass}>
            <div className="hidden desktop:block">
                <MenuContent />
            </div>
        </div>
      </div>
    </div>
  )
}

export default Index