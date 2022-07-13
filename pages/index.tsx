import type { NextPage } from 'next'
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  decrement,
  increment,
  generatorState,
  GeneratorState,
} from '../reducers/generator';

const Home: NextPage = () => {
  const state:GeneratorState = useAppSelector(generatorState);
  const dispatch = useAppDispatch();

  return (
    <div className='text-3xl font-bold underline'>
      {state.value}
      <input 
                        type="button" 
                        value="increment" 
                        onClick={() => dispatch(increment())}
                        className="w-11/12 bg-gray-400 p-1 text-zinc-900 hover:text-red-600 cursor-pointer"
                    />
    </div>
  )
}

export default Home
