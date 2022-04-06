import React,{Component} from 'react';
import ImageText from './imageText'
import mergeImages from 'merge-images';
//import Compress from 'compress.js';
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
    this.resizeIMG          = this.resizeIMG.bind(this);
    this.getRawImgSize      = this.getRawImgSize.bind(this);
    this.getb64ImgSize      = this.getb64ImgSize.bind(this);
    this.getResizeRate_compareWithRaw          = this.getResizeRate_compareWithRaw.bind(this);
    this.b64ToImgFile       = this.b64ToImgFile.bind(this);
    
  }//END constructor

  async mergeImg(b64:any, callback)
  {
    var self = this;
    let imgEle: any  = document.querySelector('#canvasIMG');
    if(!imgEle)
    {
      console.error('IMG element not found!');
      callback(false);
      throw ('IMG element not found!');
    }
    //console.log(b64);

    let rawImageSize:any  = await this.getRawImgSize();
    let b64ImageSize:any  = await this.getb64ImgSize(b64.data_url);
    if(!rawImageSize || !b64ImageSize)
    {
      console.error('Cannot get image size!');
      callback(false);
      throw ('Cannot get image size!');
    }

    let resizedIMG:any;
    let resizeRate:number = 0.5;
    let finally_rate:any  = await this.getResizeRate_compareWithRaw(b64.data_url, resizeRate);
    //console.log(b64ImageSize);
    

    try
    {
      resizedIMG  = await this.resizeIMG(b64, b64ImageSize[0] * finally_rate, b64ImageSize[1] * finally_rate).catch();
    }
    catch(error)
    {
      console.error(error);
      callback(false);
      throw (error);
    }

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
      callback(true);
    })
    .catch(function (error:any) 
    {
      console.error(error);
      callback(false);
      throw (error);
    });
  }//END mergeImg

  async getResizeRate_compareWithRaw(b64:any, rate:number)
  {
    let rawImageSize:any  = await this.getRawImgSize();
    //console.log(b64ImageSize);
    if(!rawImageSize)
    {
      console.error('Cannot get image size!');
      return false;
    }
    let w:number = rawImageSize[0]
    , h:number = rawImageSize[1];
    
    let b64Size:any = await this.getb64ImgSize(b64);
    let b64_w = b64Size[0], b64_h = b64Size[1];
    let w_rate  = b64_w / w;
    let h_rate  = b64_h / h;
    let smaller_rate:number  = w_rate > h_rate ? h_rate : w_rate;
    let x_15:number = Number((Math.abs(smaller_rate) * 100).toPrecision(15));
    let rounded_smaller_rate = Math.round(x_15) / 100 * Math.sign(smaller_rate);
    return rate * (1 / rounded_smaller_rate);

    

  }//END getResizeRate_compareWithRaw

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

  b64ToImgFile(b64:any)
  {
    return new Promise((resolve, reject) => 
    {
      var image = new Image();
      image.onload = function() {
        resolve(image);
      };

      image.onerror = function() {
        console.error('Error occurred while converting b64 to file');
        reject('Error occurred while converting b64 to file');
      };

      image.src = b64;
    });
  }//END b64ToImgFile

  getb64ImgSize(b64:any)
  {
    return new Promise<number[]>((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve([img.width, img.height])
      img.onerror = () => reject('Error occurred while get b64 Image Size');
      img.src = b64;
    })
  }//END getb64ImgSize

  getRawImgSize()
  {
    return this.getb64ImgSize(this.rawImgSrc);
  }//END getRawImgSize

  render() 
  {
      return  <>
                <ImageText parent={this} ref={this.imageTextRef} />
              </>;
  }

}//END class CanvasDrawer


export default CanvasDrawer;