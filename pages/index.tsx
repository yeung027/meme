import type { NextPage } from 'next'
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fontLoader } from '../components/font';
import Canvas from '../components/generator/canvas';
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
  });

  return (
    <div className='bg-my-purple w-screen h-screen grid grid-rows-[70px_1fr_96px] overflow-hidden font-roboto'>
      <div className='w-full h-[70px] z-10'>
        <Menu />
        <Header />
      </div>
      <div className='bg-lightGray w-full grid grid-rows-[48px_1fr] justify-items-center gap-y-4 rounded-t-3xl p-6 shadow-[0_-10px_7px_2px_rgba(105,0,197,1)] z-0'>
        <Steps />
        <Canvas />
      </div>
      <div className='border-t border-lightGray2 h-24 w-full bg-white flex justify-center items-center'>
222
      </div>
    </div>
  )
}

export default Home
