import { Dispatch } from "@reduxjs/toolkit";
import { ORIENTATION } from "../models/common";
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

export const addWindowSizeChangeListener = async (handler:()=>void) => {
    let retryCount:number = 0;
    while(!window)
    {
        await delay(70);
        retryCount++;
        if(retryCount>30) return false;
    }
    
    window.addEventListener('resize', handler);
}

export const addOrientationChangeListener = async (handler:()=>void) => {
    let retryCount:number = 0;
    while(!window)
    {
        await delay(70);
        retryCount++;
        if(retryCount>30) return false;
    }
    window.addEventListener("orientationchange", handler);
}

export const isOrientation =  ():ORIENTATION => {
    return window.innerHeight >= window.innerWidth ? ORIENTATION.PORTRAIT : ORIENTATION.LANDSCAPE
}