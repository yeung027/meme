import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { fontLoader } from '../font';
import Canvas from '../generator/canvas';
import ControlPanel from '../generator/controlPanel';
import ExportDialog from '../generator/exportDialog';
import Steps from '../generator/steps';
import Header from '../header';
import Menu from '../menu';
import { addDarkModeListener, darkModeTransformClass } from '../../helpers/common';
import { 
  MemeState,
  memeState as originMemeState,
} from "../../reducers/meme";
import { Dispatch } from '@reduxjs/toolkit';

interface Props {
    dispatch:Dispatch,
    title: string;
  }

const Home: NextPage<Props> = (props) => {
  const memeState:MemeState = useAppSelector(originMemeState);

  useEffect(() => {
    fontLoader();

    if(document && document.body)
      document.body.classList.add('fixed');
      addDarkModeListener(props.dispatch);
  });

  let containerClass = 'bg-my-purple dark:bg-dark-purple w-screen h-screen grid grid-rows-[70px_1fr] desktop:flex desktop:flex-col overflow-hidden font-roboto'+darkModeTransformClass;
  let row2ContainerClass = 'grid grid-rows-[1fr_96px] desktop:flex desktop:flex-row-reverse desktop:gap-6 desktop:h-full';
  if(memeState.darkMode)
  {
    row2ContainerClass += ' desktop:bg-my-dark';
  }
  else
  {
    containerClass += ' desktop:bg-white';
    row2ContainerClass += ' desktop:bg-lightGray ';
  }
  
  return (
    <div className={containerClass}>
      <div className='w-full h-[70px] z-10'>
        <ExportDialog />
        <Menu />
        <Header title={props.title} />
      </div>
      <div className={row2ContainerClass}>
        <div className={'bg-lightGray dark:bg-my-dark w-full grid grid-rows-[48px_1fr] justify-items-center gap-y-4 rounded-t-3xl desktop:rounded-none p-6 shadow-[0_-10px_7px_2px_rgba(105,0,197,1)] dark:shadow-[0_-10px_7px_2px_rgba(23,23,23,0.5)] desktop:shadow-none z-0'+darkModeTransformClass}>
          <Steps />
          <Canvas />
        </div>
        <div className={'border-t desktop:border-0 border-my-gray2 dark:border-my-dark h-24 w-full bg-white dark:bg-my-darkGray2 desktop:h-full desktop:w-[300px] desktop:shadow-[1px_0_15px_1px_rgba(0,0,0,0.2)]'+darkModeTransformClass}>
          <ControlPanel />
        </div>
      </div>
    </div>
    //
  )
}

export default Home
