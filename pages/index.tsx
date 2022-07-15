import type { NextPage } from 'next'
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fontLoader } from '../components/font';
import Canvas from '../components/generator/canvas';
import ControlPanel from '../components/generator/controlPanel';
import ExportDialog from '../components/generator/exportDialog';
import Steps from '../components/generator/steps';
import Header from '../components/header';
import Menu from '../components/menu';
import {
  generatorState,
  GeneratorState,
} from '../reducers/generator';

const Home: NextPage = () => {
  const state:GeneratorState = useAppSelector(generatorState);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    fontLoader();

    console.log(window.screen.orientation.lock)
    //window.screen.orientation.lock('landscape');
    if(document && document.body)
      document.body.classList.add('fixed');
  });
//grid-rows-[70px_1fr_96px] border border-4 border-black 
  return (
    <div className='bg-my-purple desktop:bg-white w-screen h-screen grid grid-rows-[70px_1fr] desktop:flex desktop:flex-col overflow-hidden font-roboto'>
      <div className='w-full h-[70px] z-10'>
        <ExportDialog />
        <Menu />
        <Header />
      </div>
      <div className='grid grid-rows-[1fr_96px] desktop:flex desktop:flex-row-reverse desktop:gap-6 desktop:h-full desktop:bg-lightGray'>
        <div className='bg-lightGray w-full grid grid-rows-[48px_1fr] justify-items-center gap-y-4 rounded-t-3xl desktop:rounded-none p-6 shadow-[0_-10px_7px_2px_rgba(105,0,197,1)] desktop:shadow-none z-0'>
          <Steps />
          <Canvas />
        </div>
        <div className='border-t border-lightGray2 h-24 w-full bg-white desktop:h-full desktop:w-[300px] desktop:shadow-[1px_0_15px_1px_rgba(0,0,0,0.2)]'>
          <ControlPanel />
        </div>
      </div>
    </div>
  )
}

export default Home
