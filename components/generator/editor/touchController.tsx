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


    //let rect = tappableNode.getBoundingClientRect();
    /* console.log(rect.left);
    console.log(currentTouchClientX);
    console.log(tappableNode.style.left); */
    
    //document.getElementById("img-tappable-0").style.left = currentTouchClientX+'px';

    
    let tappableNode_w_half  = parseInt(tappableNode.style.width);
    let tappableNode_h_half  = parseInt(tappableNode.style.height);
    if(!isNaN(tappableNode_w_half)) tappableNode_w_half /= 2;
    if(!isNaN(tappableNode_h_half)) tappableNode_h_half /= 2;

    //console.log(tappableNode_w_half);

    let new_post_left = currentTouchClientX - tappableNode_w_half;
    let new_post_top  = currentTouchClientY - tappableNode_h_half;

    //tappableNode.style.left = new_post_left+'px';
    //tappableNode.style.top  = new_post_top+'px';

    if(isNaN(keynum))
    {
      console.error('touchmove received but target keynum is NAN');
      return;
    }
    let imgObj:any  =  this.parent.state.images;

    imgObj[keynum].x = new_post_left+'px'
    imgObj[keynum].y = new_post_top+'px';

    this.parent.setState({ 
      images: imgObj
     });

    //console.log('xy:' + x +', '+y);

  }//END touchMove

  getKeyNumByNode(node:any)
  {
    let id:any = node.id;
    let num = id.substring(13);
    let target_key_num = parseInt(num);
    return target_key_num;
  }//END getKeyNumByNode

  

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
    return null;
  }

}//END class TouchController


export default TouchController;