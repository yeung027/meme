import type { NextPage } from 'next'

import Canvas from '../components/generator/canvas';
import ControlPanel from '../components/generator/controlPanel';
import ExportDialog from '../components/generator/exportDialog';
import Steps from '../components/generator/steps';
import Header from '../components/header';
import Menu from '../components/menu';

import { Dispatch } from '@reduxjs/toolkit';
import Head from 'next/head';
import { addDarkModeListener, addOrientationChangeListener, addSizeChangeListener, darkModeTransformClass, setSubContainerRef, scrollToIndex } from '../helpers/common';
import { 
  MemeState,
  memeState as originMemeState,
} from "../reducers/meme";
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { fontLoader } from '../helpers/font';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setRawImageUrl } from '../reducers/generator';
import { createText } from '../helpers/generator/text';
import { compile } from '../helpers/generator/compiler';




const Home: NextPage = () => {
    const dispatch = useAppDispatch();
    const memeState:MemeState = useAppSelector(originMemeState);
    const [version, setVersion] = useState(0);
    const containerEl   = useRef(null);
    const subContainerEl   = useRef(null);
    dispatch(setRawImageUrl('generator/rain/raw.jpg'));

    const sizeChangeHandler = ()=>{
        setVersion(version+1);
        scrollToIndex(1);
    }

    const orientationchangeHandler = ()=>{
        setVersion(version+1);
        scrollToIndex(1);
    }

    const loadFont = async () => {
        let webFont = await fontLoader();
        webFont.load({
            google: {
            families: ['Noto Sans TC']
            }
        });
    }

    useLayoutEffect(() => {
        setSubContainerRef(subContainerEl.current!);
    });
    
    useEffect(() => {
        loadFont();
        compile(dispatch);
        if(document && document.body)
        document.body.classList.add('fixed');
        document.body.classList.add('bg-my-purple');
        document.body.classList.add('dark:bg-dark-purple');

        addDarkModeListener(dispatch);
        addOrientationChangeListener(window, sizeChangeHandler);
        addSizeChangeListener(window, sizeChangeHandler);

        return () => {
            window.removeEventListener('orientationchange', orientationchangeHandler);
            window.removeEventListener('resize', sizeChangeHandler);
        }
    });

    useEffect(() => {
        createText(dispatch);
    });


//
    let containerClass:string = 'myLandscape:h-screen box-border landscapeFillAvailable portraitFillAvailable desktop:h-screen w-screen bg-my-purple dark:bg-dark-purple grid grid-rows-[70px_1fr] overflow-hidden font-roboto';
    containerClass += ' myLandscape:grid-cols-[70px_1fr]';
    let subcontainer1Class = 'myLandscape:h-screen grid grid-rows-[1fr_96px] desktop:flex desktop:flex-row-reverse desktop:gap-6 desktop:h-full desktopDark:bg-my-dark';
    subcontainer1Class += ' dark:bg-dark-purple desktop:bg-lightGray';
    subcontainer1Class += ' landscapeFillAvailable myLandscape:pb-0.5 myLandscape:rounded-bl-3xl';
    let subSubcontainer1Class = 'bg-lightGray dark:bg-my-dark w-full grid grid-rows-[48px_1fr] justify-items-center gap-y-4 rounded-t-3xl desktop:rounded-none p-6 shadow-[0_-6px_7px_2px_rgba(105,0,197,1)] dark:shadow-[0_-10px_7px_2px_rgba(23,23,23,0.5)] desktop:shadow-none z-10';
    subSubcontainer1Class +=' myLandscape:rounded-tr-none myLandscape:flex myLandscape:flex-row myLandscape:gap-2 myLandscape:items-center';
    let subSubcontainer2Class = 'border-t desktop:border-0 border-my-gray2 dark:border-my-dark h-24 w-full bg-white dark:bg-my-darkGray2 desktop:h-full desktop:w-[300px] desktop:shadow-[1px_0_15px_1px_rgba(0,0,0,0.2)]';
    subSubcontainer2Class +=' myLandscape:bg-my-purple mobileDark:bg-dark-purple ';
    
    return (
        
        <div className={containerClass} ref={containerEl}>
        <Head>
            <title>你嗰邊大雨啫，我呢邊無喎</title>
            <link rel="shortcut icon" href="/icos/favicon.ico" />
        </Head>
        <div className='landscapeFillAvailable'>
            <ExportDialog />
            <Menu isIndex={false} />
            <Header title="你嗰邊大雨啫，我呢邊無喎" isIndex={false} />
        </div>
        <div className={subcontainer1Class}>
            <div className={subSubcontainer1Class+darkModeTransformClass} ref={subContainerEl}>
                <Steps />
                <Canvas /> 
            </div>
            <div className={subSubcontainer2Class+darkModeTransformClass}>
            <ControlPanel />
            
            </div>
        </div>
        </div>
    )
}


export default Home
