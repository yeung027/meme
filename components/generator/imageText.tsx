import { withThemeCreator } from '@material-ui/styles';
import React,{Component} from 'react';

type MyProps = {
    parent:any
};

type MyStates = {
  defaultText:string
  defaultCanvasHeight:number
  defaultFontSize:number
  reloadFontFamilyCount:number
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
      defaultText: 'Edit Text here',
      defaultCanvasHeight:40,
      defaultFontSize:30,
      reloadFontFamilyCount: 0
    
    }//END state

    this.textBtnOnclick       = this.textBtnOnclick.bind(this);
    this.onEdit       = this.onEdit.bind(this);
    this.onBlur       = this.onBlur.bind(this);
    this.doEditText       = this.doEditText.bind(this);
    this.calWidth = this.calWidth.bind(this);
    this.createReloadFontFamilyTimeout        = this.createReloadFontFamilyTimeout.bind(this);
    this.setBottomControlToEditText           = this.setBottomControlToEditText.bind(this);
    this.setEditTextUiSelectingTextIndex      = this.setEditTextUiSelectingTextIndex.bind(this);
    
  }//END constructor

  setEditTextUiSelectingTextIndex(index:number)
  {
    let self = this;
    let bottomControlPanel = this.parent.parent.parent.bottomControlPanelRef.current;
    let editText = bottomControlPanel.editTextRef? bottomControlPanel.editTextRef.current: null;
    if(!editText)
    {
      setTimeout(
        function() {
          self.setEditTextUiSelectingTextIndex(index);
        }
        .bind(this),
        200
      );
      return;
    }

    editText.setState({ 
      selectingTextIndex: index
    }); 
    //console.log(editText);
  }

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
    if(ele.parentNode)
    {
      let inputDom:any = document.querySelector('#floatTextInputEdit-'+keyNum);
      inputDom.removeEventListener("onblur", this.onBlur);
      setTimeout(
        function() {
          try{
            ele.remove();
          }catch(e){
            console.error(e);
          }
        }
        .bind(this),
        200
      );
      
    }
    
  }//END onBlur

  onEdit(e: any, key: any)
  {
    var self = this;
    let canvasComponent = this.parent.parent.parent.canvasRef.current;
    let keynum= canvasComponent.touchControllerRef.current.getKeyNumByID(key);
    
    let imgObj:any  =  canvasComponent.state.images.length > keynum ? canvasComponent.state.images[keynum] : null;

    let canvasDom:any = document.querySelector('#canvas');
    let rootDom:any = document.querySelector('#rootDiv');
    let rect = canvasDom.getBoundingClientRect();
    let input = document.createElement("input");
    input.type = "text";
    input.className = "floatTextInputEdit";
    input.style.height = imgObj.height+'px';
    input.style.width = imgObj.width+'px';
    input.style.fontFamily = "Noto Sans TC, Roboto";
    input.style.fontSize = imgObj.fontSize+'px';
    input.value = imgObj.text;
    input.id = 'floatTextInputEdit-'+keynum;

    let x:number = parseFloat(imgObj.x), y:number = parseFloat(imgObj.y);
    if(!this.parent.parent.parent.state.isMobile)
    {
      //x+=rect.left;
      //y+=rect.top;
    }
    input.style.top = y+'px';
    input.style.left = x+'px';

    //console.log(x+", "+y);

    // if(this.parent.parent.parent.state.isMobile)
    //   rootDom.appendChild(input);
    // else rootDom.appendChild(input);
    rootDom.appendChild(input);

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

    this.setBottomControlToEditText();
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
      this.parent.parent.parent.state.isMobile? rect.left : 0,
      this.parent.parent.parent.state.isMobile? rect.top : 0,
    );
    this.setBottomControlToEditText();
  }//END textBtnOnclick

  updateColor(index:number, color:string)
  {
    let canvasComponent = this.parent.parent.parent.canvasRef.current;
    let imgObj:any  =  canvasComponent.state.images.length > index ? canvasComponent.state.images[index] : null;


    
    this.doEditText(
      index,
      imgObj.text, 
      imgObj.fontSize,
      color,
      imgObj.height,
      -1,
      -1
    );


  }

  setBottomControlToEditText()
  {
    //console.log(this.parent.parent.parent.bottomControlPanelRef.current);
    let bottomControl = this.parent.parent.parent.bottomControlPanelRef.current;
    let step = this.parent.parent.parent.stepsRef.current;
    bottomControl.stageChange(bottomControl.stage.EDITTEXT);
    step.stepChange(step.step.EDITIMG);
  }//END setBottomControlToEditText

  calWidth(ctx:any, str:string)
  {
    const regex = /^[~`!@#$%^&*()_+=[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
    var normal = 0;
    var spec = 0;
    let noramlStrs = '';
    let sepStrs = '';
    var width = 0;
    for (var i = 0; i < str.length; i++)
    {
     if(str[i].match(regex))normal++
     else spec++;
    }

    console.log('normal: '+normal+', spec: '+spec);

    for (var i = 0; i < normal; i++) noramlStrs += 'a';
    for (var i = 0; i < spec; i++) sepStrs += '中';
    width += ctx.measureText(noramlStrs).width * 2.7;
    width += ctx.measureText(sepStrs).width * 3.3;
    width +=40;
    return width;
  }
  

  async doEditText( imgObjIndex:number, text:string, fontSize:number, fontColor:string, height:number, x:number, y:number)
  {
    var that = this;
    const start_x = 10, start_y = 30;
    let canvas = document.createElement("canvas");
    canvas.style.fontWeight = '400';
    let ctx = canvas.getContext('2d', {alpha:true})!;
    let width = this.calWidth(ctx, text);
    //(ctx.measureText(text).width * 1.5) * text.length +(start_x * 2);
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
      }, function(){
        that.createReloadFontFamilyTimeout(imgObjIndex, text, fontSize, fontColor, height);
      }); 

      this.setEditTextUiSelectingTextIndex(images.length-1);
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
      }, function(){
        that.createReloadFontFamilyTimeout(imgObjIndex, text, fontSize, fontColor, height);
      }); 
      this.setEditTextUiSelectingTextIndex(imgObjIndex);
    }

  }//END doEditText

  

  createReloadFontFamilyTimeout(imgObjIndex:number, text:string, fontSize:number, fontColor:string, height:number)
  {
    var that = this;
    if(this.state.reloadFontFamilyCount<=5)
    {
      let index = imgObjIndex;
      if(index<=0) index = this.parent.parent.parent.canvasRef.current.state.images.length-1;
      //let images  = this.parent.parent.parent.canvasRef.current.state.images;
      setTimeout(
        function() {
          that.doEditText(
            index,
            text,
            fontSize,
            fontColor,
            height,
            -1,
            -1,
          );
          that.setState({ 
            reloadFontFamilyCount: that.state.reloadFontFamilyCount+1
          }); 
        }
        .bind(this),
        500
      );
    }
  }//END createReloadFontFamilyTimeout

  render() 
  {
    return null;
  }

}//END class ImageText


export default ImageText;