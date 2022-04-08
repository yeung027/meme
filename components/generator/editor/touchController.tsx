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
    this.checkPositionIsOverflowAndFix  = this.checkPositionIsOverflowAndFix.bind(this);
    
    
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