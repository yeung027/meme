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

interface ImageEditor  {
  parent: any
  rawImgSrc: string
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

    this.getCanvas                  = this.getCanvas.bind(this);
    this.addUploadedImage           = this.addUploadedImage.bind(this);
  }//END constructor

  getCanvas()
  {
    if(!this.parent) throw ('cannot get canvas');
    if(!this.parent.parent) throw ('cannot get main page');
    if(!this.parent.parent.canvasRef) throw ('cannot get canvasRef');
    if(!this.parent.parent.canvasRef.current) throw ('cannot get canvasRef curent');
    return this.parent.parent.canvasRef.current;
  }//END getCanvas

  addUploadedImage(uploaded:any, callback:any)
  {
    let canvas  = this.getCanvas();
    if(!canvas) throw ('cannot get canvasRef curent #2');
    //console.log(canvas.state.images.length);
    let images  = canvas.state.images;
    if(!canvas.state.images || !Array.isArray(canvas.state.images) || canvas.state.images.length <=0)
      images = [];
    images  = images.concat(uploaded);
    canvas.setState({ 
      images: images
    }); 

    //console.log(images[0]);
  }//END addUploadedImage

  render() 
  {
      return  <>
                <ImageText parent={this} ref={this.imageTextRef} />
              </>;
  }

}//END class ImageEditor


export default ImageEditor;