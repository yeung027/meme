import React,{Component} from 'react';
import styles from '../../styles/generator/canvas/desktop.module.css'
import mobileStyles from '../../styles/generator/canvas/mobile.module.css'
import TouchController from './editor/touchController';
import EditingImage from '../../models/editingImage';

type MyProps = {
    parent:any
};

type MyStates = {
  images: EditingImage[]
  canvasWidth: number
  canvasHeight: number
  canvasLeft: number
  canvasTop: number
  headerHeight: number
  touchController:any
  updateCanvasComputedStyleCount: number
  rawImageSize:number[]
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
      headerHeight:0,
      touchController: null,
      updateCanvasComputedStyleCount:0,
      rawImageSize:[]
    }//END state

    this.touchControllerRef = React.createRef();
    
    this.componentsGetter        = this.componentsGetter.bind(this);
    this.updateCanvasComputedStyle                  = this.updateCanvasComputedStyle.bind(this);
    this.doUpdateCanvasComputedStyle                = this.doUpdateCanvasComputedStyle.bind(this);
    this.loadTouchController                        = this.loadTouchController.bind(this);
    this.onImgdragstart                             = this.onImgdragstart.bind(this);
    this.getRawImageSize                             = this.getRawImageSize.bind(this);
    this.canvasMouseUp                              = this.canvasMouseUp.bind(this);
    this.canvasMouseMove                             = this.canvasMouseMove.bind(this);
    
  }//END constructor

  componentsGetter()
  {
    return this.parent.componentsGetterRef.current;
  }//END componentsGetter

  componentDidMount() 
  {
    this.updateCanvasComputedStyle();
    this.loadTouchController();
    this.parent.canvasDidMountCallback();
    this.getRawImageSize();
  }//END componentDidMount


  async getRawImageSize()
  {
    let that = this;
    if(!this.componentsGetter() || !this.componentsGetter().compiler()) return setTimeout(
      function() {
        
       that.getRawImageSize();

      }
      .bind(this),
      70
    );

    let rawImgSize:[] = await that.componentsGetter().compiler().getRawImgSize();
    this.setState({ 
      rawImageSize : rawImgSize
    }); 
    //console.log(await that.componentsGetter().compiler().getRawImgSize())
  }

  doUpdateCanvasComputedStyle()
  {
    if(!window) return;
    let that= this;
    if(!this.state.rawImageSize || this.state.rawImageSize == [] || this.state.rawImageSize.length<=1) return setTimeout(
      function() { 
       that.doUpdateCanvasComputedStyle();
      }
      .bind(this),
      70
    );
    let wScale:number = this.state.rawImageSize[0] / this.state.rawImageSize[1];

    //console.log('wScale: '+wScale);

    let canvas:any = document.querySelector('#canvas');
    if(!canvas) return;
    let canvascompStyles  = window.getComputedStyle(canvas);
    let canvasRect        = canvas.getBoundingClientRect();
    let w:number, h:number;
    w = parseInt(canvascompStyles.width);
    h = parseInt(canvascompStyles.height);
    if (isNaN(w)) w = 0;
    if (isNaN(h)) h = 0;

    let header:any = document.querySelector('#rootHeader');
    if(!header) return;
    let headerRect        = header.getBoundingClientRect();
    

    w = h * wScale;
    /*  console.log('w: '+w);
     console.log('h: '+h); */
    this.setState({ 
      canvasWidth: w ,
      canvasHeight: h,
      canvasLeft: canvasRect.left,
      canvasTop: canvasRect.top,
      headerHeight: headerRect.height,
    }); 
    //console.log(canvasRect.left)
  }//END doUpdateCanvasComputedStyle

  updateCanvasComputedStyle()
  {
    let that  = this;
    let count:number = this.state.updateCanvasComputedStyleCount;


    if(count>10) return;
    this.setState({ updateCanvasComputedStyleCount: count+1 });
    this.doUpdateCanvasComputedStyle();
    setTimeout(
      function() {
        that.updateCanvasComputedStyle();
      }
      .bind(this),
      200
    );
  }//END updateCanvasComputedStyle

  onImgdragstart(e:any)
  {
    e.preventDefault();
  }//END onImgdragstart

  loadTouchController()
  {
    var self = this;
    try
    {
      let v = this.componentsGetter().touchController();

      this.setState({ 
        touchController: v
       });
    }
    catch(error)
    {
      //console.error(error);
      setTimeout(
        function() {
          self.loadTouchController();
        }
        .bind(this),
        200
    );
    }
  }//END loadTouchController

  canvasMouseMove(e:any)
  {
    if(!this.parent.state.isMobile && this.touchControllerRef.current && this.touchControllerRef.current.state.isMouseDownHold 
      && this.touchControllerRef.current.mouseMovingKey=='' && this.touchControllerRef.current.lastMouseMovingKey!='')
      {
        let temp = this.touchControllerRef.current.lastMouseMovingKey;
        this.touchControllerRef.current.lastMouseMovingKey = '';
        this.touchControllerRef.current.moveImg(e, temp, false);
      }
  }//END canvasMouseMove

  canvasMouseUp(e:any)
  {
    if(!this.parent.state.isMobile && this.touchControllerRef.current && this.touchControllerRef.current.state.isMouseDownHold 
      && this.touchControllerRef.current.mouseMovingKey=='')
        this.touchControllerRef.current.setState({ 
          isMouseDownHold: false
        });
  }//END canvasMouseUp

  render() 
  {
    let that = this;
    let canvasBGStyle = {
      width: this.parent.state.isMobile? (this.state.canvasWidth * 0.9)+'px': this.state.canvasWidth+'px',
      height:(this.state.canvasHeight-1)+'px',
    }

    let canvasOutterStyles = {}; 
    if(!this.parent.state.isMobile || true)
    {
      canvasOutterStyles = {width: this.state.canvasWidth+'px'};
    }
    

    let clipLeft    =  0 ;
    let clipTop     =   0 ;
    let clipRight   =   0;
    let clipBottom  =  0;
    
    let canvasStyle:any = {
      clipPath: 'inset('+clipTop+'px '+clipRight+'px '+clipBottom+'px '+clipLeft+'px)',
    }

    let rawImageWrapperStyle:any = {
      zIndex:this.parent.state.rawImgZindex
    }

      return  <div className={this.parent.state.isMobile? mobileStyles.container : styles.container} id='canvasOutter'>
                <TouchController parent={this} ref={this.touchControllerRef} />
                <div className={this.parent.state.isMobile? mobileStyles.canvasOutter : styles.canvasOutter} style={canvasOutterStyles}>
                <div 
                  id='canvas' 
                  className={this.parent.state.isMobile? mobileStyles.canvas : styles.canvas} 
                  style={canvasStyle}
                  onMouseMove={function(e:any)
                  {
                    that.canvasMouseMove(e);
                  }}

                  onMouseUp={function(e:any)
                  {
                    that.canvasMouseUp(e);
                  }}
                >
                  {

                    this.state.images.map((image:EditingImage, i) => {     
                    
                    let tappableId  = 'img-tappable-'+image.index;
                    // let clipLeft    =  this.parent.state.isMobile? this.state.canvasLeft - image.x + 1 : 0 - image.x;
                    // let clipTop     =  this.parent.state.isMobile? this.state.canvasTop - image.y + 1 : 0 - image.y;
                    // let clipRight   =  this.parent.state.isMobile? (image.x+  image.width )- (this.state.canvasLeft + (this.state.canvasWidth * 0.9)) - 1 : (image.x +  image.width) - this.state.canvasWidth;
                    // let clipBottom  =  this.parent.state.isMobile? (image.y +  image.height) - (this.state.canvasTop + this.state.canvasHeight) - 1 :  (image.y +  image.height) - this.state.canvasHeight;
                    let left  = image.x;
                    let top   = image.y;
                    
                    let rotation = image.rotation;
                    if(!rotation || isNaN(rotation)) rotation = 0;

                    //console.log('image.y: ' + image.y);
                    //console.log('image.x: ' + image.x);
                    //console.log((this.state.canvasLeft+ parseInt(image.x) +  parseInt(image.w)));
                    let wrapperStyle:any = {
                      width: image.width,
                      height:image.height,
                      top: top,
                      left: left,
                      transform: 'rotate('+rotation+'deg)',
                      zIndex:this.parent.state.imgZindex
                      //border:'red 2px solid',
                      //clipPath: 'inset('+clipTop+'px '+clipRight+'px '+clipBottom+'px '+clipLeft+'px)',
                    }  

                    let imageStyle:any = {
                      //transform: 'rotate(90deg)'
                    }
                    

                    let tapperClass = this.parent.state.isMobile? mobileStyles.tappable : styles.tappable;
                    
                    let imgEle= <img key={'img-key-'+i} id={'img-key-'+i} src={image.upload.data_url} 
                                  className={this.parent.state.isMobile? mobileStyles.img : styles.img} 
                                  onDragStart={this.onImgdragstart}
                                  style={imageStyle}
                                />
                    let ele = imgEle;
                    if(this.state.touchController)
                      ele = this.state.touchController.tappableElement(tapperClass, wrapperStyle, imgEle, tappableId);
                    

                    return ele;
                    }
                  )}
                    <div 
                      className={this.parent.state.isMobile? mobileStyles.rawImgWrapper : styles.rawImgWrapper}
                      style={rawImageWrapperStyle}
                    >
 
                      <img 
                        id='canvasIMG' 
                        className={this.parent.state.isMobile? mobileStyles.rawImg : styles.rawImg} 
                        src={this.parent.state.rawImgSrc} 
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