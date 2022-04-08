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
  lastEvent: Event
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
  
  touchStart(e:Event)
  {
    console.log(e.touches[0]);
    this.setState({ 
      touchStart:true,
      lastEventType: this.touchevent.TOUCH_START
     });
  }

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
      tappableId: images[0].tappableId
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