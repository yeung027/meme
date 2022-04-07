import { RestoreOutlined } from '@material-ui/icons';
import React,{Component} from 'react';
const Tappable = require('react-tappable');

type MyProps = {
  parent:any
};

type MyStates = {

};

interface TouchController  {
parent: any
}

class TouchController extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;
    
    this.getbottomControlPanel = this.getbottomControlPanel.bind(this);
  }//END constructor

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

    console.log('handleTap');
    console.log(Object.keys(e));
    console.log(e.changedTouches[0] );
  }//END handleTap

  tappableElement(tappableClass:any, wrapperStyle:any, children:any, key:string)
  {
    var self = this;
    return <Tappable 
      onTap={function(e:any)
      {
        self.handleTap(e);
      }} 
      className={tappableClass}
      style={wrapperStyle}
      key={key}
    >
      {children}
    </Tappable>
  }//END tappableElement


}//END class TouchController


export default TouchController;