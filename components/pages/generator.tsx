import type { NextPage } from 'next'

import Canvas from '../generator/canvas';
import ControlPanel from '../generator/controlPanel';
import ExportDialog from '../generator/exportDialog';
import Steps from '../generator/steps';
import Header from '../header';
import Menu from '../menu';

import { Dispatch } from '@reduxjs/toolkit';
import Head from 'next/head';
import { addDarkModeListener, addOrientationChangeListener, addWindowSizeChangeListener, darkModeTransformClass } from '../../helpers/common';
import { 
  MemeState,
  memeState as originMemeState,
  setIosInnerHeight
} from "../../reducers/meme";
import { useLayoutEffect } from 'react';
import { fontLoader } from '../font';
import { useAppSelector } from '../../app/hooks';

var innerHeight = require('ios-inner-height');

interface Props {
    dispatch:Dispatch,
    title: string;
  }


const Home: NextPage<Props> = (props) => {
  const memeState:MemeState = useAppSelector(originMemeState);
  const sizeChangeHandler = ()=>{
    props.dispatch(setIosInnerHeight(innerHeight()));
    console.log(innerHeight());
  }

  useLayoutEffect(() => {
    props.dispatch(setIosInnerHeight(innerHeight()));
    fontLoader();

    if(document && document.body)
      document.body.classList.add('fixed');
      document.body.classList.add('bg-my-purple');
      document.body.classList.add('dark:bg-dark-purple');
      
    
    addDarkModeListener(props.dispatch);
    addOrientationChangeListener(sizeChangeHandler);
    addWindowSizeChangeListener(sizeChangeHandler);

    return () => {
      window.removeEventListener('orientationchange', sizeChangeHandler);
      window.removeEventListener('resize', sizeChangeHandler);
    }
  });



  let containerClass:string = 'box-border h-full w-screen bg-my-purple dark:bg-dark-purple grid grid-rows-[70px_1fr] overflow-hidden font-roboto';
  containerClass += ' myLandscape:grid-cols-[70px_1fr]';
  let subcontainer1Class = 'grid grid-rows-[1fr_96px] desktop:flex desktop:flex-row-reverse desktop:gap-6 desktop:h-full';
  subcontainer1Class += ' dark:bg-my-dark desktop:bg-lightGray';
  subcontainer1Class += ' landscapeFillAvailable myLandscape:pb-0.5 myLandscape:rounded-bl-3xl';
  let subSubcontainer1Class = 'bg-lightGray dark:bg-my-dark w-full grid grid-rows-[48px_1fr] justify-items-center gap-y-4 rounded-t-3xl desktop:rounded-none p-6 shadow-[0_-10px_7px_2px_rgba(105,0,197,1)] dark:shadow-[0_-10px_7px_2px_rgba(23,23,23,0.5)] desktop:shadow-none z-0';
  subSubcontainer1Class +=' myLandscape:rounded-tr-none myLandscape:flex myLandscape:flex-row myLandscape:gap-2 myLandscape:items-center';
  let subSubcontainer2Class = 'border-t desktop:border-0 border-my-gray2 dark:border-my-dark h-24 w-full bg-white dark:bg-my-darkGray2 desktop:h-full desktop:w-[300px] desktop:shadow-[1px_0_15px_1px_rgba(0,0,0,0.2)]';
  subSubcontainer2Class +=' myLandscape:bg-my-purple';
  
  return (
    
    <div className={containerClass} >
      <Head>
        <link rel="shortcut icon" href="/icos/favicon.ico" />
      </Head>
      <div className='landscapeFillAvailable' >
        <ExportDialog />
        <Menu />
        <Header title={props.title} />
      </div>
      <div className={subcontainer1Class}>
        <div className={subSubcontainer1Class+darkModeTransformClass}>
          <Steps />2
          {/* <Canvas />  */}
        </div>
        <div className={subSubcontainer2Class+darkModeTransformClass}>
          <ControlPanel />
          
        </div>
      </div>
    </div>
  )
}


export default Home
