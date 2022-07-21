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



  let containerClass:string = 'box-border border border-4 border-red-500 h-full w-screen bg-my-purple dark:bg-dark-purple grid grid-rows-[70px_1fr] overflow-hidden font-roboto';
  containerClass += ' myLandscape:grid-cols-[70px_1fr]';

  return (
    
    <div className={containerClass} >
      <Head>
        <link rel="shortcut icon" href="/icos/favicon.ico" />
      </Head>
      <div className='bg-orange-500 landscapeFillAvailable' >
        <ExportDialog />
        <Menu />
        <Header title={props.title} />
      </div>
      <div className='border border-4 border-blue-500 myLandscape:h-full'>1LLLLLLLL
        {/* <div className={''+darkModeTransformClass}>
          <Steps />
          <Canvas />
        </div>
        <div className={''+darkModeTransformClass}>
          <ControlPanel />
          
        </div> */}
      </div>
    </div>
  )
}


export default Home
