import React,{Component} from 'react';

type MyProps = {
    parent:any
};

type MyStates = {
  defaultText:string
  defaultCanvasHeight:number
  defaultFontSize:number
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
      defaultCanvasHeight:40,
      defaultFontSize:30,
    
    }//END state

    this.textBtnOnclick       = this.textBtnOnclick.bind(this);
    this.onEdit       = this.onEdit.bind(this);
    this.onBlur       = this.onBlur.bind(this);
    this.doEditText       = this.doEditText.bind(this);
    
  }//END constructor



  onBlur(e: any, keyNum:number)
  {
    let ele:HTMLInputElement = document.querySelector("#floatTextInputEdit-"+keyNum)!;
    this.doEditText(
      keyNum,
      ele.value, 
      this.state.defaultFontSize,
      'rgba(0,0,0,1)',
      this.state.defaultCanvasHeight,
      -1,
      -1
    );
    ele.remove();
  }//END onBlur

  onEdit(e: any, key: any)
  {
    var self = this;
    let canvasComponent = this.parent.parent.parent.canvasRef.current;
    let keynum= canvasComponent.touchControllerRef.current.getKeyNumByID(key);
    
    let imgObj:any  =  canvasComponent.state.images.length > keynum ? canvasComponent.state.images[keynum] : null;

    let canvasDom:any = document.querySelector('#canvas');
    let input = document.createElement("input");
    input.type = "text";
    input.className = "floatTextInputEdit";
    input.style.height = imgObj.height+'px';
    input.style.width = imgObj.width+'px';
    input.style.fontFamily = "Noto Sans TC, Roboto";
    input.style.fontSize = imgObj.fontSize+'px';
    input.value = imgObj.text;
    input.id = 'floatTextInputEdit-'+keynum;
    input.style.marginTop = imgObj.y;
    input.style.marginLeft = imgObj.x;
    canvasDom.appendChild(input);
    input.onblur=function(e:any)
    {
      self.onBlur(e, keynum);
    }
    input.onkeyup=function(e:any)
    {
      if (e.key === "Enter" || e.key === "Return" || e.key === 13) 
        self.onBlur(e, keynum);
    }

    setTimeout(
      function() {
        let ele:HTMLInputElement = document.querySelector("#floatTextInputEdit-"+keynum)!;
        ele.focus();
        ele.select();
      }
      .bind(this),
      200
  );
  }//END onEdit

  textBtnOnclick()
  {
    let canvasDom:any = document.querySelector('#canvas');
    let rect = canvasDom.getBoundingClientRect();
    this.doEditText(
      -1,
      this.state.defaultText, 
      this.state.defaultFontSize,
      'rgba(0,0,0,1)',
      this.state.defaultCanvasHeight,
      0,
      0,
    );
  }//END textBtnOnclick

  async doEditText( imgObjIndex:number, text:string, fontSize:number, fontColor:string, height:number, x:number, y:number)
  {
    var that = this;
    const start_x = 10, start_y = 30;
    let canvas = document.createElement("canvas");
    canvas.style.fontWeight = '400';
    let ctx = canvas.getContext('2d', {alpha:true})!;
    let width = (ctx.measureText(text).width * 1.5) * text.length +(start_x * 2);
    canvas.width = width;
    canvas.height = height;
    ctx.font = fontSize+"px Noto Sans TC, Roboto";
    canvas.style.background = 'transparent';
    ctx.fillStyle = "rgba(255, 255, 255, 0)";
    //ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, width, this.state.defaultCanvasHeight);
    ctx.fillStyle= fontColor;

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap';
    document.getElementsByTagName('head')[0].appendChild(link);
    
    // Trick from https://stackoverflow.com/questions/2635814/
    var image = new Image();
    image.src = link.href;
    image.onerror = function() {
        ctx.font = fontSize+"px Noto Sans TC, Roboto";
        ctx.fillText(text,start_x, start_y);
    };
    image.onload = function() {
      ctx.font = fontSize+"px Noto Sans TC, Roboto";
      ctx.fillText(text,start_x, start_y);
  };



    ctx.fillText(text,start_x, start_y);


    var img = document.createElement("img");

    img.src=canvas.toDataURL();

    let uploaded = {
      data_url: img.src,
      //file: file
    }

    //let b64ImageSize:any  = await this.parent.getb64ImgSize(uploaded.data_url);
    let canvas_image_length = !this.parent.parent.parent.canvasRef.current || !this.parent.parent.parent.canvasRef.current.state.images ? 0 : this.parent.parent.parent.canvasRef.current.state.images.length;

    if(imgObjIndex<=-1)
    {
      let obj:any = {

        upload: uploaded,
        x: x,
        y: y,
        w: width ,
        h: height,
        scale: 1 , 
        key_num: canvas_image_length,
        isText: true,
        text:text,
        height: height,
        width: width,
        fontSize:fontSize
      };

      let images  = this.parent.parent.parent.canvasRef.current.state.images;
      images  = images.concat(obj);
      this.parent.parent.parent.canvasRef.current.setState({ 
        images: images
      }); 
    }//END if -1
    else
    {
      
      let images  = this.parent.parent.parent.canvasRef.current.state.images;
      let imagesCopy  = images;
      if(!images[imgObjIndex]) throw('imgObj not found #######122322121');
      let obj = images[imgObjIndex];
      //console.log(obj.text);
      
      obj.upload = uploaded;
      obj.w = width;
      obj.h = height;
      obj.text = text;
      obj.height = height;
      obj.width = width;
      obj.fontSize = fontSize;
      imagesCopy[imgObjIndex] = obj;
      this.parent.parent.parent.canvasRef.current.setState({ 
        images: imagesCopy
      }); 

    }
    
    

    //console.log(obj);
  }//END doEditText

  render() 
  {
    return null;
  }

}//END class ImageText


export default ImageText;