import { useAppDispatch } from "../app/hooks";
export const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

export const darkModeTransformClass:string = ' delay-1000 duration-1000 ease-in-out transform';