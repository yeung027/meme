import React,{Component} from 'react';
import styles from '../../styles/generator/canvas/desktop.module.css'
import mobileStyles from '../../styles/generator/canvas/mobile.module.css'
import TouchController from './editor/touchController';


type MyProps = {
    parent:any
};

type MyStates = {
  images: any[]
  canvasWidth: number
  canvasHeight: number
  canvasLeft: number
  canvasTop: number
  touchController:any
};

interface Canvas  {
  parent: any
  touchController:TouchController
  touchControllerRef: any
}

class Canvas extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      images: [],
      canvasWidth: 0,
      canvasHeight: 0,
      canvasLeft: 0,
      canvasTop: 0,
      touchController: null,
    }//END state

    this.touchControllerRef = React.createRef();
    
    this.updateCanvasComputedStyle                  = this.updateCanvasComputedStyle.bind(this);
    this.loadTouchController                        = this.loadTouchController.bind(this);
  }//END constructor

  componentDidMount() 
  {
    this.updateCanvasComputedStyle();
    this.loadTouchController();
  }//END componentDidMount



  updateCanvasComputedStyle()
  {
    if(!window) return;

    var body = document.body || document.getElementsByTagName("body")[0],
            clientTop = document.documentElement.clientTop || body.clientTop || 0,
            clientLeft = document.documentElement.clientLeft || body.clientLeft || 0,
            scrollTop = (window.pageYOffset || document.documentElement.scrollTop || body.scrollTop),
            scrollLeft = (window.pageXOffset || document.documentElement.scrollLeft || body.scrollLeft);





    let canvas:any = document.querySelector('#canvas');
    if(!canvas) return;
    let canvascompStyles  = window.getComputedStyle(canvas);
    let canvasRect        = canvas.getBoundingClientRect();
    let w:number, h:number;
    w = parseInt(canvascompStyles.width);
    h = parseInt(canvascompStyles.height);
    if (isNaN(w)) w = 0;
    if (isNaN(h)) h = 0;
    this.setState({ 
      canvasWidth: w ,
      canvasHeight: h,
      canvasLeft: canvasRect.left + scrollLeft - clientLeft,
      canvasTop: canvasRect.top + scrollTop - clientTop
    }); 
    //console.log(canvasRect.left)

    this.touchControllerRef.current.debugLog('clientTop: ' + clientTop);
    this.touchControllerRef.current.debugLog('scrollTop: ' + scrollTop);

  }//END updateCanvasComputedStyle


  loadTouchController()
  {
    var self = this;
    try
    {
      let v = this.touchControllerRef.current;

      this.setState({ 
        touchController: v
       });
    }
    catch(error)
    {
      console.error(error);
      setTimeout(
        function() {
          self.loadTouchController();
        }
        .bind(this),
        200
    );
    }
  }//END loadTouchController

  render() 
  {
      let canvasBGStyle = {
        width: this.state.canvasWidth,
        height:this.state.canvasHeight-1,
      }

      return  <div className={this.parent.state.isMobile? mobileStyles.container : styles.container}>
                <TouchController parent={this} ref={this.touchControllerRef} />
                <div className={this.parent.state.isMobile? mobileStyles.canvasOutter : styles.canvasOutter}>
                <div id='canvas' className={this.parent.state.isMobile? mobileStyles.canvas : styles.canvas}>
                  {

                    this.state.images.map((image, i) => {     
                    
                    let tappableId  = 'img-tappable-'+image.key_num;
                    let clipLeft =  this.state.canvasLeft - parseInt(image.x) + 1;
                    let clipTop =  this.state.canvasTop - parseInt(image.y) + 1;
                    let clipRight =  (parseInt(image.x) +  parseInt(image.w)) - (this.state.canvasLeft + this.state.canvasWidth) - 1;
                    let clipBottom =(parseInt(image.y) +  parseInt(image.h)) - (this.state.canvasTop + this.state.canvasHeight) - 1;


                    //console.log((this.state.canvasLeft + this.state.canvasWidth));
                    //console.log((this.state.canvasLeft+ parseInt(image.x) +  parseInt(image.w)));
                    let wrapperStyle = {
                      width: image.w,
                      height:image.h,
                      top: image.y,
                      left: image.x,
                      clipPath: 'inset('+clipTop+'px '+clipRight+'px '+clipBottom+'px '+clipLeft+'px)',
                    }  

                    let tapperClass = this.parent.state.isMobile? mobileStyles.tappable : styles.tappable;
                    
                    let imgEle= <img key={'img-key-'+i} id={'img-key-'+i} src={image.upload.data_url} 
                                  className={this.parent.state.isMobile? mobileStyles.img : styles.img} 
                                   
                                />
                    let ele = imgEle;
                    if(this.state.touchController)
                      ele = this.state.touchController.tappableElement(tapperClass, wrapperStyle, imgEle, tappableId);
                    

                    return ele;
                    }
                  )}
                    <div className={this.parent.state.isMobile? mobileStyles.rawImgWrapper : styles.rawImgWrapper}>
 
                      <img 
                        id='canvasIMG' 
                        className={this.parent.state.isMobile? mobileStyles.rawImg : styles.rawImg} 
                        src="/generator/will_smith_punching/raw.png" 
                        alt="meme" 
                      />
                      
                    </div>
                    <div className={this.parent.state.isMobile? mobileStyles.canvasBG : styles.canvasBG} style={canvasBGStyle}></div>
                  </div>
                </div>
              </div>
  }

}//END class Canvas


export default Canvas;