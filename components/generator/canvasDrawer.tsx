import React,{Component} from 'react';
import ImageText from './imageText'
import mergeImages from 'merge-images';
import Compress from 'compress.js';
const convert = require('client-side-image-resize');

type MyProps = {
    parent:any
    rawImgSrc: string
};

type MyStates = {
  imgSrc:string
};

interface CanvasDrawer  {
  parent: any
  rawImgSrc: string
  imageTextRef: any
}

class CanvasDrawer extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;
    this.rawImgSrc  = '/generator/will_smith_punching/raw.png';
    this.state = {
      imgSrc: this.rawImgSrc
    }//END state
    
    this.imageTextRef = React.createRef();

    this.mergeImg           = this.mergeImg.bind(this);
    this.getRawImgSize      = this.getRawImgSize.bind(this);
    this.resizeIMG          = this.resizeIMG.bind(this);
    
  }//END constructor

  async mergeImg(b64:any)
  {
    var self = this;
    let imgEle: any  = document.querySelector('#canvasIMG');
    if(!imgEle)
    {
      console.error('IMG element not found!');
      return false;
    }
    //console.log(b64);

    let rawImageSize:any  = await this.getRawImgSize();
    if(!rawImageSize)
    {
      console.error('Cannot get image size!');
      return false;
    }

    //console.log(rawImageSize);
    let resizedIMG:any
    try
    {
      resizedIMG  = await this.resizeIMG(b64, rawImageSize[0] * 0.2, rawImageSize[1] * 0.2);
    }
    catch(error)
    {
      console.error(error);
      return;
    }
    //console.log(typeof(resizedIMG));

    let resizedIMG_URL = URL.createObjectURL(resizedIMG);

    mergeImages([resizedIMG_URL, this.rawImgSrc], {
      width: rawImageSize[0],
      height: rawImageSize[1]
    })
    .then(function (b64) 
    {
      //console.log(b64);
      imgEle.src = b64;
      //self.drawImageToCanvas(b64);
    })
    .catch(function (error:any) 
    {
      console.error(error);
    }) ;

  }//END mergeImg

  resizeIMG(b64:any, w:number, h:number)
  {
    return new Promise((resolve, reject) => 
    {
      convert({ 
        file: b64.file,  
        width: w, 
        height: h,
        type: 'jpeg'
      }).then((resp:any) => resolve(resp)).catch((error:any) => reject(error));
    })
  }//END resizeIMG

  getRawImgSize()
  {
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => resolve([img.width, img.height])
      img.onerror = reject
      img.src = this.rawImgSrc;
    })
  }//END getRawImgSize

  render() 
  {
      return  <>
                <ImageText parent={this} ref={this.imageTextRef} />
              </>;
  }

}//END class CanvasDrawer


export default CanvasDrawer;