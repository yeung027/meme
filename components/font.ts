import { delay } from "../helpers/common";

export const fontLoader = async () => {
    let retry = 0;
    while(window == undefined) 
    {
        retry++;
        await delay(50);
        if(retry>=50) return;
    }

    var WebFont = require('webfontloader');
    WebFont.load({
        google: {
        families: ['Roboto', 'sans-serif']
        }
    });
}