import { RestoreOutlined } from '@material-ui/icons';
import React,{Component} from 'react';
const Tappable = require('react-tappable');

type MyProps = {
  parent:any
  touchevent:any
};

type MyStates = {
  touchStart:boolean
  lastEventType:string
  lastEvent: any
};

interface TouchController  {
  parent: any
  touchevent: any
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
      lastEvent: null
    }//END state

    this.getbottomControlPanel = this.getbottomControlPanel.bind(this);
    this.getCanvas  = this.getCanvas.bind(this);
    this.touchStart = this.touchStart.bind(this);
    this.touchMove  = this.touchMove.bind(this);
    this.getKeyNumByNode  = this.getKeyNumByNode.bind(this);
    
  }//END constructor

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

  touchMove(e:TouchEvent)
  {
    if(!e || e.touches.length<=0)
    {
      console.error('touchStart error...');
      return;
    }







    let lastEvent = this.state.lastEvent;
    if(!lastEvent) 
    {
      console.error('touchmove received but no last move found...');
      return;
    }

    let lastTouch = lastEvent.touches;
    if(!lastTouch || lastTouch.length<=0) 
    {
      console.error('touchmove received but lastTouch is null or 0 length');
      return;
    }
    let lastTouchClientX  = lastTouch[0].clientX;
    let lastTouchClientY  = lastTouch[0].clientY;

    let currentTouchClientX = e.touches[0].clientX;
    let currentTouchClientY = e.touches[0].clientY;


    let xMove = currentTouchClientX - lastTouchClientX;
    let yMove = currentTouchClientY - lastTouchClientY;


    let moveSpeed = 0.05;

    xMove *= moveSpeed;
    yMove *= moveSpeed;

/* 
    console.log('lastTouchClient:' + lastTouchClientX +', '+lastTouchClientY);
    console.log('currentTouchClient:' + currentTouchClientX +', '+currentTouchClientY);
    console.log('Move:' + xMove +', '+yMove);
 */
    
    let eTarget:any = e.target;
    let tappableNode:any  = eTarget.parentNode;
    let keynum  = this.getKeyNumByNode(tappableNode);
    if(isNaN(keynum))
    {
      console.error('touchmove received but target keynum is NAN');
      return;
    }
    let imgObj:any  =  this.parent.state.images;
    //console.log(this.parent.state.images[keynum]);
    let x = imgObj[keynum].x;
    let y = imgObj[keynum].y;

   /*  x +=xMove;
    y+=yMove;
 */
    imgObj[keynum].x +=xMove;
    imgObj[keynum].y +=yMove;
    //this.parent.state.images[keynum] = imgObj;
    

    this.parent.setState({ 
      images: imgObj
     });

    console.log('xy:' + x +', '+y);

  }//END touchMove

  getKeyNumByNode(node:any)
  {
    let id:any = node.id;
    let num = id.substring(13);
    let target_key_num = parseInt(num);
    return target_key_num;
  }//END getKeyNumByNode

  handleTap(e:any) 
  {
    let bottomControl = this.getbottomControlPanel();
    if(!bottomControl)
    { 
      console.error('bottomControl not found');
      return;
    }
    if(bottomControl.state.currentUI != bottomControl.stage.EDITIMG)
    {
      console.log('touch detected, but not in EDITIMG stage, so skipped, lol');
      return;
    }

    let canvas  = this.getCanvas();
    if(!canvas)
    { 
      console.error('canvas not found');
      return;
    }
    console.log(e.changedTouches[0] );

    //console.log(e.target.parentNode);
    let target = e.target.parentNode;
    let clientRect = target.getBoundingClientRect();
    var clientX = target.offsetTop;

    console.log('clientX: '+clientX);

    let images= canvas.state.images;
    images[0] = {
      upload: images[0].upload,
      x: images[0].x,
      y: 100,
      w: images[0].w ,
      h: images[0].h ,
      scale: images[0].scale,
      tappableId: images[0].tappableId,
      key_num: images[0].key_num
    };
    
    canvas.setState({ 
      images: images
    }); 
    //console.log(images[0]);

    /* console.log('handleTap');
    console.log(Object.keys(e));
    console.log(e.changedTouches[0] ); */
  }//END handleTap

  tappableElement(tappableClass:any, wrapperStyle:any, children:any, key:string)
  {
    var self = this;
    return <Tappable 
      id={key}
      /* onTap={function(e:any)
      {
        self.handleTap(e);
      }}  */

      onTouchStart={function(e:any)
      {
        self.touchStart(e);
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
    </Tappable>
  }//END tappableElement

  render() 
  {
    return null;
  }

}//END class TouchController


export default TouchController;