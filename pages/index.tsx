import type { NextPage } from 'next'
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fontLoader } from '../components/font';
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
    <div className='bg-[#5f00d2] w-screen h-screen flex flex-col justify-start items-center overflow-hidden font-roboto'>
      <Menu />
      <Header />
      <div className='bg-[#F5F5F5] w-full h-full rounded-t-3xl p-6 box-border shadow-[0_-10px_7px_2px_rgba(105,0,197,1)] z-0'>
        
      </div>
      <div className='border-t border-[#EEEEEE] h-24 w-full bg-white flex justify-center items-center'>

      </div>
    </div>
  )
}

export default Home
