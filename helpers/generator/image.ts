import {Base64, ImageBasicInfo } from "../../models/generator";

export const wideEnoughToSetLandscape = async (b64:string):Promise<boolean> => {
    let info:ImageBasicInfo = await getImageSize(b64);
    const ratioForWider:number = 1.2;
    let ratio = info.width / info.height;
    return ratio >= ratioForWider;
}

export const getImageSize = (b64:string):Promise<ImageBasicInfo> =>
{
    return new Promise<ImageBasicInfo>((resolve, reject) => {
        let img= new Image();
        img.onload = function(){ 
            let result:ImageBasicInfo = {
                width: img.width,
                height: img.height
            }
            resolve(result);
        };
    img.onerror = () => reject('Error occurred while get b64 Image Size');
    img.src = b64;
    })
}//END getImageSize



export const divToImage = (divEl:HTMLDivElement):Promise<Base64<'png'>> =>
{
    var htmlToImage = require('html-to-image');
    return new Promise<Base64<'png'>>((resolve, reject) => {

        htmlToImage.toPng(divEl)
        .then(function (dataUrl:any) {
            var img = new Image();
            img.src = dataUrl;
            let png:Base64<'png'> = dataUrl;
            resolve(png);
        })
        .catch(function (error:any) {
            reject(error);
        });


    })
}//END divToImage