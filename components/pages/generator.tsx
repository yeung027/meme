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

var innerHeight = require('ios-inner-height');

interface Props {
    dispatch:Dispatch,
    title: string;
  }


const Home: NextPage<Props> = (props) => {
  
  const sizeChangeHandler = ()=>{
    console.log('change..')
  }

  useLayoutEffect(() => {
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



  let containerClass:string = `border border-4 border-red-500 h-screen w-screen bg-my-purple dark:bg-dark-purple grid grid-rows-[70px_1fr] desktop:flex desktop:flex-col overflow-hidden font-roboto`;
  return (
    
    <div className={containerClass} >
      <Head>
        <link rel="shortcut icon" href="/icos/favicon.ico" />
      </Head>
      <div className=''>
        {/* <ExportDialog />
        <Menu />
        <Header title={props.title} /> */}
      </div>
      <div className=''>
        <div className={''+darkModeTransformClass}>
          {/* <Steps />
          <Canvas /> */}
        </div>
        <div className={''+darkModeTransformClass}>
          {/* <ControlPanel /> */}
        </div>
      </div>
    </div>
  )
}


export default Home
