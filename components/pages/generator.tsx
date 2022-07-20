import type { NextPage } from 'next'
import { useEffect, useLayoutEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fontLoader } from '../font';
import Canvas from '../generator/canvas';
import ControlPanel from '../generator/controlPanel';
import ExportDialog from '../generator/exportDialog';
import Steps from '../generator/steps';
import Header from '../header';
import Menu from '../menu';
import { addDarkModeListener, addWindowSizeChangeListener, darkModeTransformClass } from '../../helpers/common';
import { 
  MemeState,
  memeState as originMemeState,
} from "../../reducers/meme";
import { Dispatch } from '@reduxjs/toolkit';
import Head from 'next/head';
import { isMobile } from "react-device-detect";

interface Props {
    dispatch:Dispatch,
    title: string;
  }



const Home: NextPage<Props> = (props) => {
  const memeState:MemeState = useAppSelector(originMemeState);
  const defaultContainerClass = 'bg-my-purple dark:bg-dark-purple w-screen grid grid-rows-[70px_1fr] desktop:flex desktop:flex-col overflow-hidden font-roboto'+darkModeTransformClass;
  const defaultSubcontainer1Class = 'grid grid-rows-[1fr_96px] desktop:flex desktop:flex-row-reverse desktop:gap-6 desktop:h-full';
  const defaultSubcontainer2Class = 'w-full h-[70px] z-10';
  const defaultSubSubcontainer1Class = 'bg-lightGray dark:bg-my-dark w-full grid grid-rows-[48px_1fr] justify-items-center gap-y-4 rounded-t-3xl desktop:rounded-none p-6 shadow-[0_-10px_7px_2px_rgba(105,0,197,1)] dark:shadow-[0_-10px_7px_2px_rgba(23,23,23,0.5)] desktop:shadow-none z-0';
  const defaultSubSubcontainer2Class = 'border-t desktop:border-0 border-my-gray2 dark:border-my-dark h-24 w-full bg-white dark:bg-my-darkGray2 desktop:h-full desktop:w-[300px] desktop:shadow-[1px_0_15px_1px_rgba(0,0,0,0.2)]';
  const [renderVersion, setRenderVersion] = useState(0);
  const [containerClass, setContainerClass] = useState(defaultContainerClass);
  const [subcontainer1Class, setSubcontainer1Class] = useState(defaultSubcontainer1Class);
  const [subcontainer2Class, setSubcontainer2Class] = useState(defaultSubcontainer2Class);
  const [subSubcontainer1Class, setSubSubcontainer1Class] = useState(defaultSubSubcontainer1Class);
  const [subSubcontainer2Class, setSubSubcontainer2Class] = useState(defaultSubSubcontainer2Class);
  
  useLayoutEffect(() => {
    const handler = ()=>{
      setRenderVersion(renderVersion+1);
    }

    addWindowSizeChangeListener(handler);
    return () => window.removeEventListener('resize', handler);
}, []);

  useLayoutEffect(() => { 
    let containerAdditionClass:string = ' h-screen';
    let subcontainerAdditionClass:string = ' bg-my-purple dark:bg-dark-purple';
    let subcontainer2AdditionClass:string = ' ';
    let subSubcontainerAdditionClass:string = ' ';
    let subSubcontainer2AdditionClass:string = ' ';

    if(isMobile)
    {
      containerAdditionClass+=' landscape:grid-cols-[70px_1fr] landscape:h-[-webkit-fill-available]';
      subSubcontainerAdditionClass+=' landscape:rounded-tr-none landscape:flex landscape:flex-row landscape:gap-2 landscape:items-center';
      subcontainerAdditionClass+=' landscape:h-[-webkit-fill-available] landscape:pb-0.5 landscape:rounded-bl-3xl';
      subcontainer2AdditionClass += ' landscape:h-[-webkit-fill-available]';//landscape:h-[-webkit-fill-available]
      subSubcontainer2AdditionClass += ' border border-2 border-red-500'+memeState.darkMode? ' ' : ' landscape:bg-my-purple'; 
    }

    if(memeState.darkMode)
    {
      containerAdditionClass += ' desktop:bg-white';
      subcontainerAdditionClass += ' desktop:bg-my-dark';
      subSubcontainer2AdditionClass += ' landscape:bg-dark-purple';
    }
    else
    {
      subcontainerAdditionClass+=' desktop:bg-lightGray';
      subSubcontainer2AdditionClass += ' landscape:bg-my-purple';
    }

    setContainerClass(defaultContainerClass+containerAdditionClass);
    setSubcontainer1Class(defaultSubcontainer1Class+subcontainerAdditionClass);
    setSubcontainer2Class(defaultSubcontainer2Class+subcontainer2AdditionClass);
    setSubSubcontainer1Class(defaultSubSubcontainer1Class+subSubcontainerAdditionClass);
    setSubSubcontainer2Class(defaultSubSubcontainer2Class+subSubcontainer2AdditionClass);
  });
  
  useLayoutEffect(() => {
    fontLoader();

    if(document && document.body)
      document.body.classList.add('fixed');
      addDarkModeListener(props.dispatch);
    
    if(window)
      window.addEventListener(
        'orientationchange',
        ()=>{
          setRenderVersion(renderVersion+1);
        }
      )
  });

  
  return (
    <div className={containerClass}>
      <Head>
        <link rel="shortcut icon" href="/icos/favicon.ico" />
      </Head>
      <div className={subcontainer2Class}>
        <ExportDialog />
        <Menu />
        <Header title={props.title} />
      </div>
      <div className={subcontainer1Class}>
        <div className={subSubcontainer1Class+darkModeTransformClass}>
          <Steps />
          <Canvas />
        </div>
        <div className={subSubcontainer2Class+darkModeTransformClass}>
          <ControlPanel />
        </div>
      </div>
    </div>
    //
  )
}

export function getServerSideProps(context:any) {
  return {
    props: {
      uaString: context.req.headers['user-agent']
    }
  }
}

export default Home
