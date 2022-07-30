import { Dispatch } from "@reduxjs/toolkit";
import { Base64 } from "../../models/generator";
import { setCompiledOutput } from "../../reducers/generator";
import { dataUrlToBase64, getDataUrlByUrl } from "./image";

export const compile = async (dispatch:Dispatch) => {
    let dataURL  = await getDataUrlByUrl('generator/rain/raw.jpg');
    //console.log(dataURL);
    let a:Base64<any> = dataUrlToBase64(dataURL);
    dispatch(setCompiledOutput(a));
}