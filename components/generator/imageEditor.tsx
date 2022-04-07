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
    
    console.log('finally_rate: '+finally_rate);
    console.log('image failly size: '+b64ImageSize[1] * finally_rate);
    let obj = {
      upload: uploaded,
      x: 0,
      y: 0,
      w: b64ImageSize[0] * finally_rate * resizeRate,
      h: b64ImageSize[1] * finally_rate * resizeRate,
      scale: finally_rate
    };
    images  = images.concat(obj);
    canvas.setState({ 
      images: images
    }); 

    //console.log(images[0]);
  }//END addUploadedImage

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

    console.log('w_rate: '+w_rate);
    console.log('h_rate: '+h_rate);
    console.log('x_15: '+x_15);
    console.log('rounded_smaller_rate: '+rounded_smaller_rate);
    return rate * (1 / rounded_smaller_rate);

    

  }//END getResizeRate_compareWithRaw

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

}//END class ImageEditor


export default ImageEditor;