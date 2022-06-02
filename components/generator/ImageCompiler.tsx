import React,{Component} from 'react';
import ImageText from './imageText'
import mergeImages from 'merge-images';
const convert = require('client-side-image-resize');

type MyProps = {
    parent:any
    rawImgSrc: string
};

type MyStates = {
  imgSrc:string
  output_image_index:number
  output_requester_callback: any
};

interface ImageCompiler  {
  parent: any
  imageTextRef: any
  rawImgSrc: string
}

class ImageCompiler extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;
    this.rawImgSrc  = '/generator/will_smith_punching/raw.png';
    this.state = {
      imgSrc: this.rawImgSrc,
      output_image_index: -1,
      output_requester_callback: null
    }//END state
    
    this.imageTextRef = React.createRef();

    this.resizeIMG          = this.resizeIMG.bind(this);
    this.getRawImgSize      = this.getRawImgSize.bind(this);
    this.getb64ImgSize      = this.getb64ImgSize.bind(this);
    this.getResizeRate_compareWithRaw          = this.getResizeRate_compareWithRaw.bind(this);
    this.b64ToImgFile       = this.b64ToImgFile.bind(this);
    this.getOutPut          = this.getOutPut.bind(this);
    this.doOutput           = this.doOutput.bind(this);
    this.getCanvasSize      = this.getCanvasSize.bind(this);
  }//END constructor


  getOutPut(callback: any)
  {

    if(!this.parent.parent.canvasRef.current.state.images) throw ('uploaded images not found!');
    var self  = this;
    
    //if(this.parent.parent.canvasRef.current.state.images.length<=0) throw ('no photo uploaded or images data wrong');
    
    this.setState({ 
      output_image_index:0,
      output_requester_callback: callback
     }, function(){
      self.doOutput(self.rawImgSrc);
    });
    
  }//END getOutPut

  getCanvasSize()
  {
    if(!window) return;
    let canvas:any = document.querySelector('#canvas');
    if(!canvas) return;
    let canvascompStyles  = window.getComputedStyle(canvas);
    let canvasRect        = canvas.getBoundingClientRect();
    let w:number, h:number;
    w = parseInt(canvasRect.width);
    h = parseInt(canvasRect.height);
    if (isNaN(w)) w = 0;
    if (isNaN(h)) h = 0;
    
    return {
      w:canvasRect.width,
      h:canvasRect.height,
      left: canvasRect.left,
      top: canvasRect.top,
    };
  }//END getCanvasSize

  async doOutput(previous_src:any)
  {
    var self  = this;

    if(!this.parent.parent.canvasRef.current.state.images || this.parent.parent.canvasRef.current.state.images.length<=0)
    {
      let rawImageSize:any  = await self.getRawImgSize();
      let merge = await new Promise((resolve, reject) => 
      {
        mergeImages([previous_src], {
          width: rawImageSize[0],
          height: rawImageSize[1]
        })
        .then(function (b64) 
        {
          resolve(b64);
        })
        .catch(function (error:any) 
        {
          reject('mergeImages fail!');
        });
      });//END Promise

      let output = await this.b64ToImgFile(merge);
      //console.log(output);
      this.state.output_requester_callback(merge, output);

      return;

    }//end no image

    let image = this.parent.parent.canvasRef.current.state.images[this.state.output_image_index];

    let b64:any = image.upload;
    let b64ImageSize:any  = await self.getb64ImgSize(b64.data_url);

    if(!b64ImageSize)
    {
      throw ('Cannot get image size!');
    }

    let rawImageSize:any  = await self.getRawImgSize();

    if(!rawImageSize)
    {
      throw ('Cannot get raw image size!');
    }
    

    let canvasDetails:any = this.getCanvasSize();

    let compare_output_x = rawImageSize[0] / canvasDetails.w;
    let compare_output_y = rawImageSize[1] / canvasDetails.h;

    let image_org_x = parseInt(image.x) - canvasDetails.left;
    let image_org_y = parseInt(image.y) - canvasDetails.top;

    

    let output_x  =  image_org_x * (compare_output_x);
    let output_y  =  image_org_y * (compare_output_y);

    if(!this.parent.parent.state.isMobile)
    {
      output_x = parseInt(image.x)* (compare_output_x);
      output_y = parseInt(image.y)* (compare_output_y);
    }

    let output_w = parseInt(image.w)* (compare_output_x);
    let output_h = parseInt(image.h)* (compare_output_y);

    let resizedIMG:any;


    try
    {
      resizedIMG  = await self.resizeIMG(b64, output_w, output_h);
    }
    catch(error)
    {
      console.error(error);
      throw (error);
    }

    let resizedIMG_URL = URL.createObjectURL(resizedIMG);

    let merge = await new Promise((resolve, reject) => 
    {
      mergeImages([{ 
        src: resizedIMG_URL, 
        x: output_x, 
        y: output_y 
      }, previous_src], {
        width: rawImageSize[0],
        height: rawImageSize[1]
      })
      .then(function (b64) 
      {
        resolve(b64);
      })
      .catch(function (error:any) 
      {
        reject('mergeImages fail!');
      });
    });//END Promise


    if(this.parent.parent.canvasRef.current.state.images.length >= this.state.output_image_index+2)
    {
      this.setState({ output_image_index:(this.state.output_image_index+1) }, function(){
        self.doOutput(merge);
      });
    }
    else 
    {
      let output = await this.b64ToImgFile(merge);
      this.state.output_requester_callback(merge, output);
    }

  }//END doOutput


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

  async b64ToImgFile(b64:any)
  {
    let blob = await (await fetch(b64)).blob();
    let file = new File([blob], 'willsmith.png', { type: "image/jpeg" });
    return file;
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

}//END class ImageCompiler


export default ImageCompiler;