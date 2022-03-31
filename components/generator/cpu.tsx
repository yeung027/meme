import React,{Component} from 'react';
import CanvasDrawer from './canvasDrawer'

type MyProps = {
    parent:any
};

type MyStates = {

};

interface CPU {
  parent: any
  canvasDrawerRef: any
}

class CPU extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      
    }//END state
    
    this.canvasDrawerRef = React.createRef();
  }//END constructor

  render() 
  {
      return  <>
                <CanvasDrawer parent={this} ref={this.canvasDrawerRef} />
              </>;
  }

}//END class CPU


export default CPU;