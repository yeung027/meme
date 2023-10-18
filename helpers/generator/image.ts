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


export const getDataUrlByUrl = (url:string):Promise<string> =>
{
    return new Promise<string>((resolve, reject) => {
        let img= new Image();
        img.onload = function(){ 
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');

            // We set the dimensions at the wanted size.
            canvas.width = img.width;
            canvas.height = img.height;

            if(ctx) ctx.drawImage(img, 0, 0, img.width, img.height);
            else reject('Error occurred while ctx is null');
            var result = canvas.toDataURL();
            resolve(result);
        };
    img.onerror = () => reject('Error occurred while get b64 Image Size');
    img.src = url;
    })
}//END getDataUrlByUrl

export const dataUrlToBase64 = (dataURL:string):Base64<any> =>
{
    const prefix = 'data:image/';
    const prefixBeforeCode = ';base64';

    const indexOfPrefix         = dataURL.indexOf(prefix);
    const indexOfBeforeCode     = dataURL.indexOf(prefixBeforeCode);
    if(indexOfPrefix < 0 || indexOfBeforeCode < 0) throw('invalid dataurl!!');
    let imgtype = dataURL.substring(indexOfPrefix+prefix.length, indexOfBeforeCode);
    let imgcode = dataURL.substring(indexOfBeforeCode+prefixBeforeCode.length);
    let result:Base64<any> = `data:image/${imgtype};base64${imgcode}`
    return result;
}//END dataUrlToBase64

export const getImageBasicInfoCompareWithImage = (orgInfo:ImageBasicInfo, imageEle:HTMLImageElement, ):ImageBasicInfo | null =>
{
    if(!window || window == undefined || window === null || !imageEle) return null;
    let imgCompStyles:CSSStyleDeclaration = window.getComputedStyle(imageEle);
    let result:ImageBasicInfo = {
        width: parseInt(imgCompStyles.width) * orgInfo.width,
        height: parseInt(imgCompStyles.height) * orgInfo.height
    }
    return result;
}

