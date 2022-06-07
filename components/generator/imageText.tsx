import React,{Component} from 'react';

type MyProps = {
    parent:any
};

type MyStates = {
  defaultText:string
  canvasHeight:number
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
      defaultText: '中文',
      canvasHeight:40
    }//END state

    this.textBtnOnclick       = this.textBtnOnclick.bind(this);
    this.addText       = this.addText.bind(this);
    this.onEdit       = this.onEdit.bind(this);
  }//END constructor

  textBtnOnclick()
  {
    
    this.addText(this.state.defaultText);
  }//END textBtnOnclick

  onEdit(e: any, key: any)
  {
    let canvasComponent = this.parent.parent.parent.canvasRef.current;
    let keynum= canvasComponent.touchControllerRef.current.getKeyNumByID(key);
    
    let imgObj:any  =  canvasComponent.state.images.length > keynum ? canvasComponent.state.images[keynum] : null;

    let canvasDom:any = document.querySelector('#canvas');
    let input = document.createElement("input");
    input.type = "text";
    input.className = "floatTextInputEdit";
    input.style.height = this.state.canvasHeight+'px';
    input.style.fontFamily = "Noto Sans TC, Roboto";
    input.value = imgObj.text;
    canvasDom.appendChild(input);
    
  }//END onEdit

  async addText(text:string)
  {
    const start_x = 10, start_y = 30;
    let canvas = document.createElement("canvas");
    canvas.style.fontWeight = '400';
    let ctx = canvas.getContext('2d', {alpha:true})!;
    let width = (ctx.measureText(text).width * 1.5) * text.length +(start_x * 2);
    canvas.width = width;
    canvas.height = this.state.canvasHeight;
    ctx.font = "30px Noto Sans TC, Roboto";
    canvas.style.background = 'transparent';
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    //ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, width, this.state.canvasHeight);
    ctx.fillStyle= 'rgba(0,0,0,1)';

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap';
    document.getElementsByTagName('head')[0].appendChild(link);
    
    // Trick from https://stackoverflow.com/questions/2635814/
    var image = new Image();
    image.src = link.href;
    image.onerror = function() {
        ctx.font = "30px Noto Sans TC, Roboto";
        ctx.fillText(text,start_x, start_y);
    };
    image.onload = function() {
      ctx.font = "30px Noto Sans TC, Roboto";
      ctx.fillText(text,start_x, start_y);
  };



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
      key_num: canvas_image_length,
      isText: true,
      text:this.state.defaultText
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