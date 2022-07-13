import type { NextPage } from 'next'
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { fontLoader } from '../components/font';
import Header from '../components/header';
import {
  generatorState,
  GeneratorState,
} from '../reducers/generator';

const Home: NextPage = () => {
  const state:GeneratorState = useAppSelector(generatorState);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    fontLoader();
    console.log('yeah');
  });

  return (
    <div className='bg-[#5f00d2] w-screen h-screen flex flex-col justify-start items-center overflow-hidden font-roboto'>
      <Header />
      <div className='bg-[#F5F5F5] w-full rounded-t-3xl'>
1
      </div>
    </div>
  )
}

export default Home
