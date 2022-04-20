import React,{Component} from 'react';
import ImageText from './imageText';

type MyProps = {
    parent:any
    rawImgSrc: string
};

type MyStates = {
  imgSrc:string
};

interface ImageEditor  {
  parent: any
  rawImgSrc: string
  imageTextRef: any
}

class ImageEditor extends Component<MyProps, MyStates>
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

    this.getCanvas                  = this.getCanvas.bind(this);
    this.addUploadedImage           = this.addUploadedImage.bind(this);
    this.getRawImgSize              = this.getRawImgSize.bind(this);
    this.getb64ImgSize              = this.getb64ImgSize.bind(this);
    this.getResizeRate_compareWithRaw          = this.getResizeRate_compareWithRaw.bind(this);
    this.getResizeRate_compareWithElement      = this.getResizeRate_compareWithElement.bind(this);
    this.getResizeRate_compareWithCanvas       = this.getResizeRate_compareWithCanvas.bind(this);
    
  }//END constructor

  getCanvas()
  {
    if(!this.parent) throw ('cannot get canvas');
    if(!this.parent.parent) throw ('cannot get main page');
    if(!this.parent.parent.canvasRef) throw ('cannot get canvasRef');
    if(!this.parent.parent.canvasRef.current) throw ('cannot get canvasRef curent');
    return this.parent.parent.canvasRef.current;
  }//END getCanvas

  getb64ImgSize(b64:any)
  {
    return new Promise<number[]>((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve([img.width, img.height])
      img.onerror = () => reject('Error occurred while get b64 Image Size');
      img.src = b64;
    })
  }//END getb64ImgSize

  async addUploadedImage(uploaded:any, callback:any)
  {
    let canvas  = this.getCanvas();
    if(!canvas) throw ('cannot get canvasRef curent #2');
    //console.log(canvas.state.images.length);
    let images  = canvas.state.images;
    if(!canvas.state.images || !Array.isArray(canvas.state.images) || canvas.state.images.length <=0)
      images = [];
    
    let b64ImageSize:any  = await this.getb64ImgSize(uploaded.data_url);
    if(!b64ImageSize)
    {
      callback(false);
      throw ('Cannot get image size!');
    }

    let resizeRate:number = 0.5;
    let finally_rate:any  = await this.getResizeRate_compareWithRaw(uploaded.data_url, resizeRate);
    
    let rateWithCanvas:any  = await this.getResizeRate_compareWithCanvas(uploaded.data_url, resizeRate);

    /* console.log('rateWithCanvas: '+rateWithCanvas);
    console.log('finally_rate: '+finally_rate);
    console.log('image finally size: '+b64ImageSize[1] * finally_rate); */

    //let canvasSize:any  = this.getCanvasComputedSize();

    let canvas_image_length = !canvas.state.images ? 0 : canvas.state.images.length;


    let canvasDom:any = document.querySelector('#canvas');
    let rect = canvasDom.getBoundingClientRect();
    //console.log(rect.left);


    let obj = {
      upload: uploaded,
      x: 0,
      y: 0,
      w: b64ImageSize[0] * rateWithCanvas ,
      h: b64ImageSize[1] * rateWithCanvas ,
      scale: finally_rate , 
      key_num: canvas_image_length
    };
    images  = images.concat(obj);
    canvas.setState({ 
      images: images
    }); 

    callback(true);
    //console.log(images[0]);
  }//END addUploadedImage

  async getResizeRate_compareWithCanvas(b64:any, rate:number)
  {
    let canvasSize:any  = this.getCanvasComputedSize();
    //console.log(canvasSize);
    if(!canvasSize)
    {
      console.error('Cannot get canvas size!');
      return false;
    }
    return this.getResizeRate_compareWithElement(b64, canvasSize, rate);
  }//END getResizeRate_compareWithCanvas

  async getResizeRate_compareWithRaw(b64:any, rate:number)
  {
    let rawImageSize:any  = await this.getRawImgSize();
    //console.log(b64ImageSize);
    if(!rawImageSize)
    {
      console.error('Cannot get image size!');
      return false;
    }
    return this.getResizeRate_compareWithElement(b64, rawImageSize, rate);
  }//END getResizeRate_compareWithRaw
  
  async getResizeRate_compareWithElement(b64:any, compareEleArr:number[], rate:number)
  {
    
    let w:number = compareEleArr[0]
    , h:number = compareEleArr[1];
    
    let b64Size:any = await this.getb64ImgSize(b64);
    let b64_w = b64Size[0], b64_h = b64Size[1];
    let w_rate  = b64_w / w;
    let h_rate  = b64_h / h;
    let larger_rate:number  = w_rate < h_rate ? h_rate : w_rate;
    let x_15:number = Number((Math.abs(larger_rate) * 100).toPrecision(15));
    let rounded_lager_rate = Math.round(x_15) / 100 * Math.sign(larger_rate);

    /* console.log('w_rate: '+w_rate);
    console.log('h_rate: '+h_rate);
    console.log('x_15: '+x_15);
    console.log('rounded_lager_rate: '+rounded_lager_rate); */
    return rate * (1 / rounded_lager_rate);

  }//END getResizeRate_compareWithElement

  getRawImgSize()
  {
    return this.getb64ImgSize(this.rawImgSrc);
  }//END getRawImgSize

  getCanvasComputedSize()
  {
    if(!window) throw ('Window is null');
    let canvas:any = document.querySelector('#canvas');
    if(!canvas) throw ('canvas is null');
    let canvascompStyles = window.getComputedStyle(canvas);
    let w:number, h:number;
    w = parseInt(canvascompStyles.width);
    h = parseInt(canvascompStyles.height);
    if (isNaN(w)) w = 0;
    if (isNaN(h)) h = 0;

    return [w, h];
  }//END getCanvasComputedSize

  render() 
  {
      return  <>
                <ImageText parent={this} ref={this.imageTextRef} />
              </>;
  }

}//END class ImageEditor


export default ImageEditor;