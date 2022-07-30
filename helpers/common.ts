import { Dispatch } from "@reduxjs/toolkit";
import { ORIENTATION } from "../models/common";
import { 
    setDarkMode,
} from "../reducers/meme";

export const delay = (ms:number) => new Promise(res => setTimeout(res, ms));

export const darkModeTransformClass:string = ' delay-1000 duration-1000 ease-in-out transform';

export const waitForWindow = async () => {
    let retryCount:number = 0;
    while(!window)
    {
        await delay(70);
        retryCount++;
        if(retryCount>30) return false;
    }
    return true;
}

export const addDarkModeListener = async (dispatch:Dispatch) => {
    await waitForWindow();
    
    dispatch(setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches));
    window.matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', event => {
        dispatch(setDarkMode(event.matches))
    });

    return true;
}

export const addSizeChangeListener = async (ele:HTMLElement | Window, handler:()=>void) => {
    await waitForWindow();
    
    window.addEventListener('resize', handler);
}

export const addOrientationChangeListener = async (ele:HTMLElement | Window, handler:()=>void) => {
    await waitForWindow();
    window.addEventListener("orientationchange", handler);
}

export const isOrientation =  ():ORIENTATION => {
    return window.innerHeight >= window.innerWidth ? ORIENTATION.PORTRAIT : ORIENTATION.LANDSCAPE
}

export const addScrollListener = async(handler:()=>void) => {
    await waitForWindow();
    
    window.addEventListener('scroll', handler, { passive: true });

    return true;
}

export var subContainerRef:HTMLDivElement;
export const setSubContainerRef = (ref:HTMLDivElement) =>{
    subContainerRef = ref;
}

export var canvasRef:HTMLDivElement;
export const setCanvasRef = (ref:HTMLDivElement) =>{
    canvasRef = ref;
}

export const scrollToIndex = async (index:number) => {
    await waitForWindow();
    window.scrollTo({
        top: index
    });
};