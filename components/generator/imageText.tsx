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
    
    this.addText('中文');
  }//END textBtnOnclick

  async addText(text:string)
  {
    const start_x = 10, start_y = 30;
    let canvas = document.createElement("canvas");
    canvas.style.fontWeight = '400';
    let ctx = canvas.getContext('2d', {alpha:true})!;
    let width = (ctx.measureText(text).width * 1.5) * text.length +(start_x * 2);
    canvas.width = width;
    canvas.height = 40;
    ctx.font = "30px Noto Sans TC, Roboto";
    canvas.style.background = 'transparent';
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    //ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, width, 40);
    ctx.fillStyle= 'rgba(0,0,0,1)';
    ctx.fillText(text,start_x, start_y);


    var img = document.createElement("img");

    img.src=canvas.toDataURL();

    //console.log(img.src);
    let blob = await (await fetch(img.src)).blob();
    let file = new File([blob], 'text.png', { type: "image/png" });
    //console.log(this.parent.parent.parent.canvasRef.current);
    let uploaded = {
      data_url: img.src,
      //file: file
    }

    let canvasDom:any = document.querySelector('#canvas');
    let rect = canvasDom.getBoundingClientRect();

    let b64ImageSize:any  = await this.parent.getb64ImgSize(uploaded.data_url);
    let canvas_image_length = !this.parent.parent.parent.canvasRef.current || !this.parent.parent.parent.canvasRef.current.state.images ? 0 : this.parent.parent.parent.canvasRef.current.state.images.length;
    
    

    //console.log(file);

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

    //console.log(obj);
  }//END addText

  render() 
  {
    return null;
  }

}//END class ImageText


export default ImageText;