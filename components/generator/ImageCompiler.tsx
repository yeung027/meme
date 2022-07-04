import React,{Component} from 'react';
import ImageText from './imageText'
import mergeImages from 'merge-images'; //, { Image as MergeImage }
//import NextImage from 'next/image';
import EditingImage from '../../models/editingImage';
import UploadedImage from '../../models/uploadedImage';
//const convert = require('client-side-image-resize');

type MyProps = {
    parent:any
};

type MyStates = {
  output_image_index:number
  output_requester_callback: any
  mergeCount:number
  mergeItems:any[]
};

interface ImageCompiler  {
  parent: any
  imageTextRef: any
}

class ImageCompiler extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;
    this.state = {
      output_image_index: -1,
      output_requester_callback: null,
      mergeCount:0,
      mergeItems:[]
    }//END state
    
    this.imageTextRef = React.createRef();

    this.componentsGetter        = this.componentsGetter.bind(this);
    this.resizeIMG          = this.resizeIMG.bind(this);
    this.getRawImgSize      = this.getRawImgSize.bind(this);
    this.getb64ImgSize      = this.getb64ImgSize.bind(this);
    this.getResizeRate_compareWithRaw          = this.getResizeRate_compareWithRaw.bind(this);
    this.b64ToImgFile       = this.b64ToImgFile.bind(this);
    this.getOutPut          = this.getOutPut.bind(this);
    this.doOutput           = this.doOutput.bind(this);
    this.getCanvasSize      = this.getCanvasSize.bind(this);
    this.doSignleOutput      = this.doSignleOutput.bind(this);
    this.prepareMergeItems      = this.prepareMergeItems.bind(this);
    // this.rotateB64  = this.rotateB64.bind(this);
    // this.doRotateB64  = this.doRotateB64.bind(this);
    
  }//END constructor

  componentDidMount() 
  {
    this.parent.parent.imageCompilerDidMountCallback();
  }//END componentDidMount

  componentsGetter()
  {
    return this.parent.parent.componentsGetterRef.current;
  }//END componentsGetter

  // async rotateB64(key: any, degrees:number) 
  // {
  //   let keynum= this.getKeyNumByID(key);
  //   let imgObj:any  =  this.parent.state.images.length > keynum ? this.parent.state.images[keynum] : null;
  //   console.log('rotateB64 imgObj:' +imgObj);
  //   let rotated:any = await this.doRotateB64(this.componentsGetter().canvas().state.images[keynum].upload.data_url, degrees);
  //   let images = this.componentsGetter().canvas().state.images;
  //   let image = this.componentsGetter().canvas().state.images[keynum];
  //   image.upload.data_url = rotated.data_url;
  //   image.w = rotated.w;
  //   image.h = rotated.h;
  //   images[keynum] = image;
  //   this.componentsGetter().canvas().setState({ 
  //     images: images
  //   });
  // }//END rotateB64


  // doRotateB64(srcBase64:any, degrees:number) 
  // {
  //   return new Promise((resolve, reject) => 
  //   {
  //     const canvas = document.createElement('canvas');
  //     let ctx = canvas.getContext("2d")!;
  //     let image = new Image();
  //     const scale:number = 1.01;
  //     image.onload = function () {
  //       canvas.width = degrees % 180 === 0 ? (image.width * scale) : (image.height * scale);
  //       canvas.height = degrees % 180 === 0 ? (image.height * scale) : (image.width * scale);
    
  //       ctx.translate(canvas.width / 2, canvas.height / 2);
  //       ctx.rotate(degrees * Math.PI / 180);
  //       ctx.drawImage(image, image.width / -2, image.height / -2);
        
  //       let result = {
  //         data_url:canvas.toDataURL(),
  //         w:canvas.width,
  //         h:canvas.height
  //       }

  //       resolve(result);
  //     };

  //     image.onerror = function(e)
  //     {
  //       reject(e);
  //     }
  
  //   image.src = srcBase64;

  //   });//END Promise
    
  // }//END doRotateB64

  getOutPut(callback: any)
  {

    if(!this.componentsGetter().canvas().state.images) throw ('uploaded images not found!');
    var self  = this;
    let index = 0;
    //if(this.componentsGetter().canvas().state.images.length<=0) throw ('no photo uploaded or images data wrong');
    if(this.componentsGetter().canvas().state.images.length>1) index = 1;
    this.setState({ 
      output_image_index:index,
      output_requester_callback: callback
     }, function(){
      self.doOutput();
    });
    
  }//END getOutPut

  getCanvasSize()
  {
    if(!window) return;
    let canvas:any = document.querySelector('#canvas');
    if(!canvas) return;
    //let canvascompStyles  = window.getComputedStyle(canvas);
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

  async doSignleOutput(previous_src:any)
  {
    let rawImageSize:any  = await this.getRawImgSize();
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

    let output = await this.b64ToImgFile(merge);//s
    //console.log(output);
    this.state.output_requester_callback(merge, output);

    return;
  }//END doSignleOutput

  async prepareMergeItems(index:number)
  {
    //console.log(index)
    let image:EditingImage = this.componentsGetter().canvas().state.images[index];

    let b64:UploadedImage = image.upload;
    let b64ImageSize:any  = await this.getb64ImgSize(b64.data_url);
    //console.log('prepareMergeItems b64ImageSize: '+ b64ImageSize[0]+', '+b64ImageSize[1]);
    if(!b64ImageSize)
    {
      throw ('Cannot get image size!');
    }

    let rawImageSize:any  = await this.getRawImgSize();

    if(!rawImageSize)
    {
      throw ('Cannot get raw image size!');
    }
    

    let canvasDetails:any = this.getCanvasSize();

    let compare_output_x = rawImageSize[0] / canvasDetails.w;
    let compare_output_y = rawImageSize[1] / canvasDetails.h;

    let image_org_x = image.x - canvasDetails.left;
    let image_org_y = image.y - canvasDetails.top;

    

    let output_x  =  image_org_x * (compare_output_x);
    let output_y  =  image_org_y * (compare_output_y);

    if(!this.parent.parent.state.isMobile)
    {
      output_x = image.x* (compare_output_x);
      output_y = image.y* (compare_output_y);
    }

    let output_w = image.width * (compare_output_x);
    let output_h = image.height * (compare_output_y);

    let resizedIMG:any;

    //console.log('before resize!!!!');
    try
    {
      resizedIMG  = await this.resizeIMG(b64.data_url, output_w, output_h);
    }
    catch(error)
    {
      //console.error(error);
      throw (error);
    }
    //console.log('after resize!!!!' + resizedIMG);
    let resizedIMG_URL = resizedIMG;//URL.createObjectURL(resizedIMG);
    let obj = {
      src: resizedIMG_URL,//resizedIMG_URL, //image.upload.data_url,
      x: output_x, 
      y: output_y ,
      //opacity: 0.2
    };
    //console.log(obj);
    return obj;
    
  }//END prepareMergeItems

  async doOutput()
  {
    let i =0;
    let objs:any[] = [];

    objs[i] ={
      src: this.componentsGetter().page().state.rawImgSrc,//resizedIMG_URL, //image.upload.data_url,
      x: 0, 
      y: 0 ,
      //opacity: 0.7
    };
    i++;

    for (const image of this.componentsGetter().canvas().state.images) {
      let obj = await this.prepareMergeItems(i-1);
      //console.log(i);
      objs[i] = obj;
      i++;
    }
    

    //console.log('finally'+objs.length);

    let rawImageSize:any  = await this.getRawImgSize();
    let merge = await new Promise((resolve, reject) => 
      {
        mergeImages(objs, {
          width: rawImageSize[0],
          height: rawImageSize[1],
          format: 'image/png'
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
      this.state.output_requester_callback(merge, output);




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
    
    let b64Size:any = await this.getb64ImgSize(b64.data_url);
    let b64_w = b64Size[0], b64_h = b64Size[1];
    let w_rate  = b64_w / w;
    let h_rate  = b64_h / h;
    let smaller_rate:number  = w_rate > h_rate ? h_rate : w_rate;
    let x_15:number = Number((Math.abs(smaller_rate) * 100).toPrecision(15));
    let rounded_smaller_rate = Math.round(x_15) / 100 * Math.sign(smaller_rate);
    return rate * (1 / rounded_smaller_rate);

    

  }//END getResizeRate_compareWithRaw

  async resizeIMG(datas:any, wantedWidth:any, wantedHeight:any)
  {
    //console.log('resizeIMG ####1');
    return new Promise(async function(resolve,reject){

      // We create an image to receive the Data URI
      //var img = document.createElement('img');
      let img = new Image();
      
      // When the event "onload" is triggered we can resize the image.
      img.onload = function()
      {        
        //console.log('resizeIMG inside onload');
          // We create a canvas and get its context.
          var canvas = document.createElement('canvas');
          var ctx = canvas.getContext('2d');

          // We set the dimensions at the wanted size.
          canvas.width = wantedWidth;
          canvas.height = wantedHeight;
          //console.log(this);
          
          // We resize the image with the canvas method drawImage();
          if(ctx) ctx.drawImage(img, 0, 0, wantedWidth, wantedHeight);

          var dataURI = canvas.toDataURL();
          //console.log('resizeIMG before resolve');
          // This is the return of the Promise
          resolve(dataURI);
      };

      // We put the Data URI in the image's src attribute
      img.src = datas;
      //console.log('resizeIMG set src: '+datas);
  })
  }//END resizeIMG


  async b64ToImgFile(b64:any)
  {
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext('2d', {alpha:true})!;
    //let size = await this.getb64ImgSize(b64);
    let rawImageSize:any  = await this.getRawImgSize();
    //let size = [100, 200];
    canvas.width = rawImageSize[0];
    canvas.height = rawImageSize[1];
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, rawImageSize[0], rawImageSize[1]);
    let image = new Image();
    image.src = b64;
    let file2 = await new Promise(async (resolve, reject) => 
    {
      image.onload = async function()
      {
        ctx.fillStyle= 'rgba(0,0,0,1)';
        ctx.drawImage(image, 30, 20);
        canvas.toBlob(function(blob:any){
          let file = new File([blob], 'text.png', { type: "image/png" });
          resolve(file)
        })
        
      }
    });//END Promise
    // let blob = await (await fetch(image.src)).blob();
    // let file = new File([blob], 'text.png', { type: "image/png" });


    //let blob = await (await fetch(b64)).blob();
   // let file = new File([blob], 'willsmith.png', { type: "image/png" });
    return file2;
  }//END b64ToImgFile

  getb64ImgSize(b64:any)
  {
    return new Promise<number[]>((resolve, reject) => {
      let img= new Image();
     // if(b64 == this.rawImgSrc) resolve([1024, 1024]);
     // console.log('getb64ImgSize');
      //console.log('getb64ImgSize: '+b64);
      img.onload = function(){ 
        //console.log('getb64ImgSize img.onload~~~~');
        resolve([img.width, img.height])
      };
      img.onerror = () => reject('Error occurred while get b64 Image Size');
      img.src = b64;
    })
  }//END getb64ImgSize

  getRawImgSize()
  {
    return this.getb64ImgSize(this.componentsGetter().page().state.rawImgSrc);
  }//END getRawImgSize

  render() 
  {
      return  <>
                <ImageText parent={this} ref={this.imageTextRef} />
              </>;
  }

}//END class ImageCompiler


export default ImageCompiler;