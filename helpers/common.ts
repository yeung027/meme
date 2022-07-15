import { useAppDispatch } from "../app/hooks";
export const delay = (ms:number) => new Promise(res => setTimeout(res, ms));