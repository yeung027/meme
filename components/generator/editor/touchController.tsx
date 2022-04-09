import { RestoreOutlined } from '@material-ui/icons';
import React,{Component} from 'react';
const Pinchable  = require('react-tappable');

type MyProps = {
  parent:any
  touchevent:any
};

type MyStates = {
  touchStart:boolean
  lastEventType:string
  lastEvent: any,
  debugLog: any[],
  pinchStarted: boolean
  pinchMoveCount: number
};

interface TouchController  {
  parent: any
  touchevent: any
  debugRef: any
  tappableRef: any
}

class TouchController extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;
    
    enum TOUCHEVENT {
      TOUCH_START = 'touch_start',
      TOUCH_MOVE = 'touch_move',
      NULL = 'null'
    }

    this.touchevent = TOUCHEVENT;

    this.state = {
      touchStart: false,
      lastEventType: this.touchevent.NULL,
      lastEvent: null,
      pinchStarted: false,
      pinchMoveCount:0,
      debugLog: ['Debug:']
    }//END state

    this.debugRef = React.createRef();
    this.tappableRef = React.createRef();


    this.getbottomControlPanel = this.getbottomControlPanel.bind(this);
    this.getCanvas  = this.getCanvas.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove  = this.touchMove.bind(this);
    this.onPinchEnd = this.onPinchEnd.bind(this);
    this.getKeyNumByNode  = this.getKeyNumByNode.bind(this);
    this.getKeyNumByID     = this.getKeyNumByID.bind(this);
    this.checkPositionIsOverflowAndFix      = this.checkPositionIsOverflowAndFix.bind(this);
    this.checkBottomControlIsStageEditimg   = this.checkBottomControlIsStageEditimg.bind(this);
    this.onPinchStart   = this.onPinchStart.bind(this);
    this.onPinchMove   = this.onPinchMove.bind(this);
    this.handleTap       = this.handleTap.bind(this);
    this.debugLog       = this.debugLog.bind(this);
    this.getCanvasSize       = this.getCanvasSize.bind(this);
    this.fixImgSizeWhileZoomOverflow       = this.fixImgSizeWhileZoomOverflow.bind(this);
    
  }//END constructor


  onPinchStart(e: any)
  {
    if(this.state.pinchStarted) return;
    this.setState({ 
      pinchStarted: true,
      pinchMoveCount:0
     });
  }//END onPinchStart

  onPinchEnd(e: any)
  {
    this.setState({ 
      pinchStarted: false,
      pinchMoveCount:0
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
    if(this.state.pinchMoveCount >5) return;
    
    let pinchMoveCount = this.state.pinchMoveCount + 1;
    this.setState({ 
      pinchStarted: false,
      pinchMoveCount: pinchMoveCount
     });
    
     



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

    let new_scale = imgObj[keynum].scale * zoom;
    let new_w = imgObj[keynum].w * zoom;
    let new_h = imgObj[keynum].h * zoom;


    let finally_size  = this.fixImgSizeWhileZoomOverflow(new_w, new_h, new_scale);

    imgObj[keynum].scale = finally_size[2];
    imgObj[keynum].w = finally_size[0];
    imgObj[keynum].h = finally_size[1];

    this.parent.setState({ 
      images: imgObj
     });

    //this.debugLog(imgObj[keynum].scale);
    this.debugLog(finally_size);
  }//END onPinchMove

  fixImgSizeWhileZoomOverflow(w:number, h:number, new_scale:number)
  {
    let canvasSize: any[] = this.getCanvasSize();
    let fix_w:number = w, fix_h:number = h;

    if(fix_w > canvasSize[0]) fix_w = canvasSize[0];
    if(fix_h > canvasSize[1]) fix_h = canvasSize[1];


    return [fix_w, fix_h, new_scale];
  }//END fixImgSizeWhileZoomOverflow


  debugLog(str:any)
  {
    if(!this.debugRef || !this.debugRef.current) return;
    let show: string;


    if (typeof str === 'string') show = str;
    else  show = str.toString();

    let debug = this.state.debugLog;
    debug = debug.concat(show);

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
  
  touchStart(e:TouchEvent)
  {
    if(!e || e.touches.length<=0)
    {
      console.error('touchStart error...');
      return;
    }
    this.setState({ 
      touchStart:true,
      lastEventType: this.touchevent.TOUCH_START,
      lastEvent: e
     });
  }//END touchStart

  checkBottomControlIsStageEditimg()
  {
    return this.parent.parent.bottomControlPanelRef.current.state.currentUI === this.parent.parent.bottomControlPanelRef.current.stage.EDITIMG;
  }//END checkBottomControlIsStageEditimg

  touchMove(e:TouchEvent)
  {
    if(!e || e.touches.length<=0)
    {
      console.error('touchStart error...');
      return;
    }
    
    if(!this.checkBottomControlIsStageEditimg()) return;

    let currentTouchClientX = e.touches[0].clientX;
    let currentTouchClientY = e.touches[0].clientY;

/* 
    console.log('lastTouchClient:' + lastTouchClientX +', '+lastTouchClientY);
    console.log('currentTouchClient:' + currentTouchClientX +', '+currentTouchClientY);
    console.log('Move:' + xMove +', '+yMove);
 */
    
    let eTarget:any = e.target;
    let tappableNode:any  = eTarget.parentNode;
    let keynum  = this.getKeyNumByNode(tappableNode);
    
    let tappableNode_w_half  = parseInt(tappableNode.style.width);
    let tappableNode_h_half  = parseInt(tappableNode.style.height);

    if(!isNaN(tappableNode_w_half)) tappableNode_w_half /= 2;
    if(!isNaN(tappableNode_h_half)) tappableNode_h_half /= 2;

    //console.log(tappableNode_w_half);

    let new_post_left = currentTouchClientX - tappableNode_w_half;
    let new_post_top  = currentTouchClientY - tappableNode_h_half;

    let fixXY:any[] = this.checkPositionIsOverflowAndFix(new_post_left, new_post_top, [parseInt(tappableNode.style.width), parseInt(tappableNode.style.height)]);

    if(isNaN(keynum))
    {
      console.error('touchmove received but target keynum is NaN');
      return;
    }
    let imgObj:any  =  this.parent.state.images;

    imgObj[keynum].x = fixXY[0]+'px'
    imgObj[keynum].y = fixXY[1]+'px';

    this.parent.setState({ 
      images: imgObj
     });

    //console.log('xy:' + x +', '+y);

  }//END touchMove

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
    return <Pinchable  

      id={key}
      ref={this.tappableRef}
      onTap={function(e:any)
      {
        self.handleTap(e);
      }} 
      /* onTouchStart={function(e:any)
      {
        self.touchStart(e);
      }} */

      onPinchStart={function(e:any)
      {
        self.onPinchStart(e);
      }}

      onPinchMove={function(e:any)
      {
        self.onPinchMove(e, key);
      }}

      onPinchEnd={function(e:any)
      {
        self.onPinchEnd(e);
      }}

      onTouchMove={function(e:any)
      {
        self.touchMove(e);
      }}

      className={tappableClass}
      style={wrapperStyle}
      key={key}
    >
      {children}
    </Pinchable >
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
          wordWrap: 'break-word'
      }
      
    return  <div style={debugStyle} ref={this.debugRef}>
              {
                this.state.debugLog.map((log) => {    
                  
                 return   <p>
                            {log}
                          </p>
                } )
              }
            </div>;
  }

}//END class TouchController


export default TouchController;