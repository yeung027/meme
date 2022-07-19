import { Dispatch } from "@reduxjs/toolkit";
import { 
    setDarkMode,
} from "../reducers/meme";

export const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

export const darkModeTransformClass:string = ' delay-1000 duration-1000 ease-in-out transform';

export const addDarkModeListener = async (dispatch:Dispatch) => {
    let retryCount:number = 0;
    while(!window)
    {
        await delay(70);
        retryCount++;
        if(retryCount>30) return false;
    }
    
    dispatch(setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches));
    window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
        dispatch(setDarkMode(event.matches))
    });

    return true;
}


export const getInnerHeight = (isMobile:boolean) => {
    if(!window || !window.innerHeight || isNaN(window.innerHeight) || !isMobile) return 'h-screen';

    return 'h-['+window.innerHeight+'px]';
};

export const getInnerHeightLandscape = (isMobile:boolean) => {
    //console.log('window.innerHeight: '+window.innerHeight)
    //var innerHeight = require('ios-inner-height');
    if(!window || !window.innerWidth || isNaN(window.innerWidth) || !isMobile) return 'h-screen';

    return 'h-screen';
};