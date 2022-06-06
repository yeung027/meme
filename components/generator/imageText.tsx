import React,{Component} from 'react';


type MyProps = {
    parent:any
};

type MyStates = {

};

interface ImageText {
parent: any
}

class ImageText extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      
    }//END state

    this.textBtnOnclick       = this.textBtnOnclick.bind(this);
    this.addText       = this.addText.bind(this);
  }//END constructor

  textBtnOnclick()
  {
    
    this.addText('Hei');
  }//END textBtnOnclick

  async addText(text:string)
  {
    var canvas = document.createElement("canvas");
    canvas.width = 620;
    canvas.height = 80;
    var ctx = canvas.getContext('2d')!;
    ctx.font = "30px Arial";

    ctx.fillText(text,10,50);
    var img = document.createElement("img");
    img.src=canvas.toDataURL();
    //console.log(this.parent.parent.parent.canvasRef.current);
    let uploaded = {
      data_url: img.src
    }

    let canvasDom:any = document.querySelector('#canvas');
    let rect = canvasDom.getBoundingClientRect();

    let b64ImageSize:any  = await this.parent.getb64ImgSize(uploaded.data_url);
    let canvas_image_length = !this.parent.parent.parent.canvasRef.current || !this.parent.parent.parent.canvasRef.current.state.images ? 0 : this.parent.parent.parent.canvasRef.current.state.images.length;

    let obj:any = {
      upload: uploaded,
      x: this.parent.parent.parent.state.isMobile? rect.left : 0,
      y: this.parent.parent.parent.state.isMobile? rect.top : 0,
      w: b64ImageSize[0] ,
      h: b64ImageSize[1],
      scale: 1 , 
      key_num: canvas_image_length
    };
    let images  = this.parent.parent.parent.canvasRef.current.state.images;
    images  = images.concat(obj);
    this.parent.parent.parent.canvasRef.current.setState({ 
      images: images
    }); 

    console.log(obj);
  }//END addText

  render() 
  {
    return null;
  }

}//END class ImageText


export default ImageText;