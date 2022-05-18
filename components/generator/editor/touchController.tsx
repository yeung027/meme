import { RestoreOutlined } from '@material-ui/icons';
import React,{Component} from 'react';
const Pinchable  = require('react-tappable');

type MyProps = {
  parent:any
};

type MyStates = {
  touchStart:boolean
  debugLog: any[],
  pinchStarted: boolean,
  pinchStartObj: any,
  touchStartObj: any,
  isMouseDownHold: boolean
};

interface TouchController  {
  parent: any
  debugRef: any
  tappableRef: any
}

class TouchController extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;


    this.state = {
      touchStart: false,
      pinchStarted: false,
      pinchStartObj: null,
      touchStartObj:null,
      isMouseDownHold: false,
      debugLog: ['Debug:']
    }//END state

    this.debugRef = React.createRef();
    this.tappableRef = React.createRef();


    this.getbottomControlPanel  = this.getbottomControlPanel.bind(this);
    this.getCanvas              = this.getCanvas.bind(this);
    this.onTouchStart           = this.onTouchStart.bind(this);
    this.onTouchMove            = this.onTouchMove.bind(this);
    this.onTouchEnd             = this.onTouchEnd.bind(this);
    this.getKeyNumByNode        = this.getKeyNumByNode.bind(this);
    this.getKeyNumByID          = this.getKeyNumByID.bind(this);
    this.checkPositionIsOverflowAndFix      = this.checkPositionIsOverflowAndFix.bind(this);
    this.checkBottomControlIsStageEditimg   = this.checkBottomControlIsStageEditimg.bind(this);
    this.onPinchStart   = this.onPinchStart.bind(this);
    this.onPinchMove    = this.onPinchMove.bind(this);
    this.onPinchEnd     = this.onPinchEnd.bind(this);
    this.handleTap      = this.handleTap.bind(this);
    this.debugLog       = this.debugLog.bind(this);
    this.getCanvasSize  = this.getCanvasSize.bind(this);
    this.fixImgSizeWhileZoomOverflow          = this.fixImgSizeWhileZoomOverflow.bind(this);
    this.fixImgWhileOutOfScreen               = this.fixImgWhileOutOfScreen.bind(this);
    this.zoomByPinchMove                      = this.zoomByPinchMove.bind(this);
    this.getImageCoorByPinchEventCenter       = this.getImageCoorByPinchEventCenter.bind(this);
    this.tappableElement        = this.tappableElement.bind(this);
    this.isTouchDevice          = this.isTouchDevice.bind(this);
    this.onMouseOver            = this.onMouseOver.bind(this);
    this.onMouseOut             = this.onMouseOut.bind(this);
    this.onMouseDown            = this.onMouseDown.bind(this);
    this.onMouseUp              = this.onMouseUp.bind(this);
    this.onMouseMove            = this.onMouseMove.bind(this);
    this.moveImg                = this.moveImg.bind(this);
    
    
  }//END constructor

  onMouseMove(e: any, key: any)
  {
    //console.log(Object.keys(e));
    //console.log(e.pageX+', '+e.pageY);
    if(!this.state.isMouseDownHold) return;
    this.moveImg(e, key, false);
  }//END onMouseMove

  onMouseUp(e: any, key: any)
  {
    console.log('up');
    this.setState({ 
      isMouseDownHold: false
    });
  }//END onMouseUp

  onMouseDown(e: any, key: any)
  {
    //console.log('down');
    this.setState({ 
      isMouseDownHold: true
    });

    //if(this.state.touchStart) return;

    let keynum= this.getKeyNumByID(key);
    let imgObj:any  =  this.parent.state.images.length > keynum ? this.parent.state.images[keynum] : null;

    if(!imgObj) return this.debugLog('error! imgObj');

    this.setState({ 
      touchStart: true,
      touchStartObj:{
        key: key,
        keynum: keynum,
        e: e,
        imgObj: {
          x: imgObj.x,
          y:imgObj.y,
          w: imgObj.w,
          h: imgObj.h
        }
      }
     });
  }//END onMouseDown

  onMouseOut(e: any, key: any)
  {

  }//END onMouseOut

  onMouseOver(e: any, key: any)
  {

  }//END onMouseOver

  isTouchDevice() 
  {
    let nav:any = navigator;
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (nav.msMaxTouchPoints > 0));
  }

  onPinchStart(e: any, key: any)
  {
    let keynum= this.getKeyNumByID(key);
    let imgObj:any  =  this.parent.state.images.length > keynum ? this.parent.state.images[keynum] : null;

    if(!imgObj) return this.debugLog('error! imgObj');

    this.setState({ 
      pinchStarted: true,
      pinchStartObj:{
        key: key,
        keynum: keynum,
        e: e,
        imgObj: imgObj
      }
     });
  }//END onPinchStart

  onPinchEnd(e: any, key: any)
  {
    this.setState({ 
      pinchStarted: false,
      pinchStartObj: null
     });
  }//END onPinchEnd

  handleTap(e:any)
  {
    //this.debugLog(e.target.toString());
  }//END handleTap


  getCanvasSize()
  {
    let canvas:any = document.querySelector('#canvas');
    let style = window.getComputedStyle(canvas);
    let w:number, h:number;
    w = parseInt(style.width);
    h = parseInt(style.height);
    if (isNaN(w)) w = 0;
    if (isNaN(h)) h = 0;

    return [w, h];
  }
  onPinchMove(e: any, key: any)
  {
    this.zoomByPinchMove(e, key, true);
  }//END onPinchMove

  zoomByPinchMove(e: any, key: any, isTouch:boolean)
  {

    if(!this.checkBottomControlIsStageEditimg()) return;
    let keynum= this.getKeyNumByID(key);
    //this.debugLog(keyNum);
    //let eTarget:any = e.target;
    //this.debugLog(Object.keys(e.touches[0].identifier).toString());
    //this.debugLog(e.touches[0].identifier);
    //let tappableNode:any  = eTarget.parentNode;
    //let keynum  = this.getKeyNumByNode(tappableNode);
    let tappableNode:any  = document.querySelector('#'+key);

    if(isNaN(keynum))
    {
      console.error('touchmove received but target keynum is NaN');
      return;
    }

    let imgObj:any  =  this.parent.state.images;

    if(!imgObj || imgObj.length<(keynum+1)) return this.debugLog('error! imgObj');


    let zoom = e.zoom;
    let desktopStartObj:any = {};
    //this.debugLog(this.state.pinchStartObj.keynum == keynum);
    this.debugLog(e.zoom);
    if(isTouch && this.state.pinchStartObj.keynum != keynum) return this.debugLog('error! cannot find pinchStartObj');
    else if(!isTouch)
    {
      desktopStartObj = {
        key: key,
        keynum: keynum,
        e: e,
        imgObj: e.imgObj
      }
    }

    let new_scale= 1, new_w = 0 ,new_h = 0;
    if(isTouch)
    {
      new_scale = this.state.pinchStartObj.imgObj.scale * zoom;
      new_w = this.state.pinchStartObj.imgObj.w * zoom;
      new_h = this.state.pinchStartObj.imgObj.h * zoom;
    }
    else
    {
      
      let scaling = Math.pow(2,(zoom - 50) / 25);
      
      //console.log('scaling: '+scaling);

      //console.log("w: "+this.parent.state.images[desktopStartObj.keynum].org.w);
      //console.log("h: "+this.parent.state.images[desktopStartObj.keynum].org.h);
      new_w = this.parent.state.images[desktopStartObj.keynum].org.w * scaling;
      new_h = this.parent.state.images[desktopStartObj.keynum].org.h * scaling;
      
    }

    let finally_size  = this.fixImgSizeWhileZoomOverflow(isTouch, new_w, new_h, new_scale);
    let fixed_xy_by_event_center:any[] = [0,0];
    
    
    if(isTouch)
    {
      fixed_xy_by_event_center = this.getImageCoorByPinchEventCenter(e, this.state.pinchStartObj.imgObj);
    }
    else
    {
      fixed_xy_by_event_center = this.getImageCoorByPinchEventCenter(e, desktopStartObj.imgObj);
      let xy:any = this.fixImgWhileOutOfScreen(fixed_xy_by_event_center[0], fixed_xy_by_event_center[1]);
      fixed_xy_by_event_center = [xy.x, xy.y];
    }


    //console.log('finally_size: '+finally_size[0] +", "+finally_size[1]);
    //console.log('zoom: '+zoom);
    imgObj[keynum].scale = finally_size[2];
    imgObj[keynum].w = isTouch ? finally_size[0] : new_w;
    imgObj[keynum].h = isTouch ? finally_size[1] : new_h;
    imgObj[keynum].x = fixed_xy_by_event_center[0];
    imgObj[keynum].y = fixed_xy_by_event_center[1];

    this.parent.setState({ 
      images: imgObj
     });


     this.setState({ 
      touchStartObj:{}
     });
    //this.debugLog(imgObj[keynum].scale);
    //this.debugLog(e.center.x + ', ' + e.center.y);
  }//END zoomByPinchMove

  getImageCoorByPinchEventCenter(e:any, imageObj: any)
  {
    //let touch_x_percent = this.state.touch_x_percent;
    //let touch_y_percent = this.state.touch_y_percent;

    /* let x = parseInt(imageObj.x);
    let y = parseInt(imageObj.y);
    let w = parseInt(imageObj.w);
    let h = parseInt(imageObj.h); */

    let center_x:number = 0;
    let center_y:number = 0;

    if(e.center)
    {
      center_x = e.center.x;
      center_y = e.center.y;
    }
    else
    {
      center_x = imageObj.x + (imageObj.w / 2);
      center_y = imageObj.y+ (imageObj.h / 2);
    }

    let half_image_w = imageObj.w / 2;
    let half_image_h = imageObj.h / 2;
    let result_x  = center_x - half_image_w;
    let result_y  = center_y - half_image_h;


    //this.debugLog('(touch_x_percent * ((x+w)/100)): ' +((touch_x_percent * ((x+w)/100))+(x)));
    return [result_x, result_y];
  }//END zoomByPinchMove

  fixImgWhileOutOfScreen(x:number, y:number)
  {
    let canvasSize: any[] = this.getCanvasSize();
    let new_x = x, new_y = y;
    if(new_x<0 || isNaN(x)) new_x = 0;
    if(new_y<0|| isNaN(y)) new_y = 0;
    if(new_x>canvasSize[0]) new_x = canvasSize[0];
    if(new_y>canvasSize[1]) new_y = canvasSize[1];

    //console.log("fix_x: "+ x+", fix_y: "+ y);

    return {
      x:new_x,
      y:new_y
    };
  }//END fixImgWhileOutOfScreen

  fixImgSizeWhileZoomOverflow(isTouch:boolean, w:number, h:number, new_scale:number)
  {
    let canvasSize: any[] = this.getCanvasSize();
    let fix_w:number = w, fix_h:number = h;
    let wh_rate = h / w;
    const min_percentage:number = isTouch? 0.3 : 0;
    /* if(fix_w > canvasSize[0]) fix_w = canvasSize[0];
    if(fix_h > canvasSize[1]) fix_h = canvasSize[1]; */

    if(fix_w < (canvasSize[0] * min_percentage))
    {
      fix_w = (canvasSize[0] * min_percentage);
      fix_h = fix_w * wh_rate;
    }
    if(fix_h < (canvasSize[1] * min_percentage)) 
    {
      fix_h = (canvasSize[1] * min_percentage);
      fix_w = fix_h / wh_rate;
    }


    return [fix_w, fix_h, new_scale];
  }//END fixImgSizeWhileZoomOverflow


  debugLog(str:any)
  {
    if(!this.debugRef || !this.debugRef.current) return;
    let show: string = '';


    if (typeof str === 'string') show = str;
    else if(str)  show = str.toString();

    let debug = this.state.debugLog;
    debug[debug.length] = show;

    if(debug.length >5) debug = debug.splice(0,1);

    this.setState({ 
      debugLog: debug
    });
   

  }//END debugLog

  getCanvas()
  {
    let result;
    try
    {
      //console.log(this.parent.parent.canvasRef.current);
      result  = this.parent.parent.canvasRef.current;
    }
    catch(error)
    {
      console.error(error);
    }
    return result;
  }//END getCanvas

  getbottomControlPanel()
  {
    let result;
    try
    {
      //result = this.parent.parent.bottomControlPanelRef.current.state.currentUI;
      result = this.parent.parent.bottomControlPanelRef.current;
    }
    catch(error)
    {
      console.error(error);
    }
    return result;
  }//END getbottomControlPanel
  
  onTouchStart(e: any, key: any)
  {
    if(this.state.touchStart) return;
    if(!e || e.touches.length<=0)
    {
      console.error('touchStart error...');
      return;
    }

    let keynum= this.getKeyNumByID(key);
    let imgObj:any  =  this.parent.state.images.length > keynum ? this.parent.state.images[keynum] : null;

    if(!imgObj) return this.debugLog('error! imgObj');

    this.setState({ 
      touchStart: true,
      touchStartObj:{
        key: key,
        keynum: keynum,
        e: e,
        imgObj: {
          x: imgObj.x,
          y:imgObj.y,
          w: imgObj.w,
          h: imgObj.h
        }
      }
     });

  }//END onTouchStart

  onTouchEnd(e: any, key: any)
  {
    this.setState({ 
      touchStart:false,
      touchStartObj: null
     });
  }//END onTouchEnd
  

  checkBottomControlIsStageEditimg()
  {
    return this.parent.parent.bottomControlPanelRef.current.state.currentUI === this.parent.parent.bottomControlPanelRef.current.stage.EDITIMG;
  }//END checkBottomControlIsStageEditimg


  moveImg(e: any, key: any, isTouch: boolean)
  {
    
    if(!this.checkBottomControlIsStageEditimg()) return;
    let touchStartTouchX = 0 , 
      touchStartTouchY = 0, 
      touchStartImgX = 0, 
      touchStartImgY = 0,
      noTouchStartObj = false;
    
      let new_post_left = 0,
      new_post_top = 0;

    let imgObj:any  =  this.parent.state.images;
    let keynum= this.getKeyNumByID(key);
    //console.log(this.state.touchStartObj);
    if(this.state.touchStartObj && this.state.touchStartObj.e && this.state.touchStartObj.e.touches 
      && this.state.touchStartObj.imgObj && this.state.touchStartObj.imgObj.x && this.state.touchStartObj.imgObj.y)
    {
      touchStartImgX    = parseInt(this.state.touchStartObj.imgObj.x);
      touchStartImgY    = parseInt(this.state.touchStartObj.imgObj.y);
      touchStartTouchX  = this.state.touchStartObj.e.touches[0].clientX - touchStartImgX;
      touchStartTouchY  = this.state.touchStartObj.e.touches[0].clientY - touchStartImgY;
    }
    else if(this.state.touchStartObj && this.state.touchStartObj.e && this.state.touchStartObj.imgObj && this.state.touchStartObj.imgObj.x && this.state.touchStartObj.imgObj.y)
    {
      touchStartImgX    = parseInt(this.state.touchStartObj.imgObj.x);
      touchStartImgY    = parseInt(this.state.touchStartObj.imgObj.y);
      touchStartTouchX  = this.state.touchStartObj.e.pageX - touchStartImgX;
      touchStartTouchY  = this.state.touchStartObj.e.pageY - touchStartImgY;
    }
    else
    {
      noTouchStartObj = true;
      /* touchStartTouchX = e.touches[0].clientX - (imgObj[keynum].w );
      touchStartTouchY = e.touches[0].clientY - (imgObj[keynum].h ); */
    }

    //this.debugLog('touchStartTouchX: ' + touchStartTouchX);
    let currentTouchClientX = 0,
    currentTouchClientY = 0;
    let canvasDom:any = document.querySelector('#canvas');
    let convasRect = canvasDom.getBoundingClientRect();

    if(this.parent.parent.state.isMobile)
    {
      currentTouchClientX = e.touches[0].clientX;
      currentTouchClientY = e.touches[0].clientY;
    }
    else
    {
      //console.log("mouse xy: "+e.pageX+', '+e.pageY);
      //console.log("convasRect.left: "+convasRect.left);
      currentTouchClientX = e.pageX;
      currentTouchClientY = e.pageY;
    }

    //console.log('touchStartImgX: ' + touchStartImgX);

    if(noTouchStartObj && this.parent.parent.state.isMobile)
    {
      new_post_left = currentTouchClientX - convasRect.left - (imgObj[keynum].w / 2);
      new_post_top  = currentTouchClientY - convasRect.top - (imgObj[keynum].h / 2);
    }
    else if(noTouchStartObj && !this.parent.parent.state.isMobile)
    {
      new_post_left = currentTouchClientX - convasRect.left - (imgObj[keynum].w / 2);
      new_post_top  = currentTouchClientY - convasRect.top - (imgObj[keynum].h / 2);
    }
    else
    {
      new_post_left = currentTouchClientX - touchStartTouchX;
      new_post_top  = currentTouchClientY - touchStartTouchY;
    }
    

    if(isNaN(keynum))
    {
      console.error('touchmove received but target keynum is NaN');
      return;
    }
    
    //console.log('noTouchStartObj: ' + noTouchStartObj);
    imgObj[keynum].x = new_post_left+'px'
    imgObj[keynum].y = new_post_top+'px';

    this.parent.setState({ 
      images: imgObj
     });

  }//END moveImg

  onTouchMove(e: any, key: any)
  {
    this.moveImg(e, key, true);
  }//END onTouchMove

  checkPositionIsOverflowAndFix(x:number, y:number, targetWidthHeight:any[])
  {
    let canvasDom:any = document.querySelector('#canvas');
    let convasRect = canvasDom.getBoundingClientRect();
    
    let maxX  = convasRect.left + convasRect.width;
    let maxY  = convasRect.top + convasRect.height;

    let resultX = x;
    let resultY = y;


    if((x + targetWidthHeight[0]) > maxX)
      resultX = maxX - (targetWidthHeight[0] );
    else if(x < convasRect.left)
      resultX = convasRect.left;

    if((y + targetWidthHeight[1]) > maxY)
      resultY = maxY - (targetWidthHeight[1] );
    else if(y < convasRect.top)
      resultY = convasRect.top;


    return [resultX, resultY];
  }//END checkPositionIsOverflowAndFix

  getKeyNumByNode(node:any)
  {
    let id:any = node.id;
    return this.getKeyNumByID(id);
  }//END getKeyNumByNode

  getKeyNumByID(id:any)
  {
    let num = id.substring(13);
    let target_key_num = parseInt(num);
    return target_key_num;
  }//END getKeyNumByID

  

  tappableElement(tappableClass:any, wrapperStyle:any, children:any, key:string)
  {
    var self = this;
    if(this.isTouchDevice())
      return <Pinchable  

        id={key}
        ref={this.tappableRef}
        onTap={function(e:any)
        {
          self.handleTap(e);
        }} 

        onPinchStart={function(e:any)
        {
          self.onPinchStart(e, key);
        }}

        onPinchMove={function(e:any)
        {
          self.onPinchMove(e, key);
        }}

        onPinchEnd={function(e:any)
        {
          self.onPinchEnd(e, key);
        }}

        onTouchStart={function(e:any)
        {
          self.onTouchStart(e, key);
        }}

        onTouchEnd={function(e:any)
        {
          self.onTouchEnd(e, key);
        }}

        onTouchMove={function(e:any)
        {
          self.onTouchMove(e, key);
        }}

        className={tappableClass}
        style={wrapperStyle}
        key={key}
      >
        {children}
      </Pinchable>
    else
    return <Pinchable  

        id={key}
        ref={this.tappableRef}
        className={tappableClass}
        style={wrapperStyle}
        key={key}

        onMouseOver={function(e:any)
        {
          self.onMouseOver(e, key);
        }}

        onMouseLeave={function(e:any)
        {
          self.onMouseOut(e, key);
        }}

        onMouseDown={function(e:any)
        {
          self.onMouseDown(e, key);
        }}

        onMouseUp={function(e:any)
        {
          self.onMouseUp(e, key);
        }}

        onMouseMove={function(e:any)
        {
          self.onMouseMove(e, key);
        }}
      >
        {children}
      </Pinchable>

  }//END tappableElement

  componentDidMount() 
  {
    document.addEventListener('touchmove', function(e){
      e.preventDefault();
    }, {
      passive: false,
    })
  }//END componentDidMount

  render() 
  {
      let debugStyle: any={
          width:'340px',
          height:'120px',
          position: 'absolute',
          backgroundColor: '#ededed',
          border: '#ff952b 2px solid',
          zIndex:25,
          top:10,
          left:10,
          padding:'5px',
          color: '#363636',
          fontFamily: 'Roboto',
          fontWeight: 400,
          lineHeight:'20px',
          wordWrap: 'break-word',
          display: this.parent.parent.state.debug ? 'block' : 'none'
      }
      
    return  <div style={debugStyle} ref={this.debugRef}>
              {
                this.state.debugLog.map((log, i ) => {    
                  
                 return   <p key={'debug-p-'+i}>
                            {log}
                          </p>
                } )
              }
            </div>;
  }

}//END class TouchController


export default TouchController;