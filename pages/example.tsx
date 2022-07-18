import { NextPage } from "next"
import Generator from '../components/pages/generator';
import {
  setRawImageUrl,
  // generatorState as originGeneratorState,
  // GeneratorState,
  setSteps,
} from '../reducers/generator';
import { useAppDispatch } from "../app/hooks";
import { STEP } from "../models/generator";

const Example: NextPage = () => {
  // const generatorState:GeneratorState = useAppSelector(originGeneratorState);
  const dispatch = useAppDispatch();
  let steps:STEP[] = [STEP.UPLOADIMG];
  dispatch(setSteps(steps));
  dispatch(setRawImageUrl('generator/example/5.png'));
  return  <>
            <Generator 
              dispatch={dispatch}
              title='Welcome to example'
            />
          </>
}

export default Example
