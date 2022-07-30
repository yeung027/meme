/* @ts-ignore */
import fx from "glfx";
import { Dispatch } from "@reduxjs/toolkit";
import { Base64, Editable, EditableText } from "../../models/generator";
import { setEditables } from "../../reducers/generator";

export const createText = (dispatch:Dispatch) =>
{
    //let canvas = fx.canvas();
    let canvas:HTMLCanvasElement = document.createElement("canvas");
    canvas.style.fontWeight = '400';
    let ctx = canvas.getContext('2d', {alpha:true})!;
    canvas.width = 200;
    canvas.height = 100;
    ctx.font = "20px Noto Sans TC, Roboto";
    canvas.style.background = 'transparent';
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    ctx.fillRect(0, 0, 200, 100);
    ctx.fillStyle= '#f53500';
    ctx.fillText('hello world', 10, 30);

    var img:HTMLImageElement = document.createElement("img");

    let url:string = canvas.toDataURL();
    img.src = url;

    let editableText:EditableText = {
        fontSize:20,
        value:'hello world',
        color:'#f53500'
    }

    let editable:Editable = {
        index:0,
        b64: url,
        x:0,
        y:0,
        width:0.5,
        height:0.5,
        zindex:20,
        text:editableText
    }

    dispatch(setEditables([editable]));
}//END createText
