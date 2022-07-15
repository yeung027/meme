import { useAppDispatch } from "../app/hooks";
import { 
    setDarkMode,
} from "../reducers/meme";

export const delay = (ms:number) => new Promise(res => setTimeout(res, ms));


export const isDarkMode = async () => {
    let retryCount:number = 0;
    const dispatch = useAppDispatch();
    while(!window)
    {
        await delay(70);
        retryCount++;
        if(retryCount>30) return false;
    }

    window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
        dispatch(setDarkMode(event.matches))
    });

    return true;
}
