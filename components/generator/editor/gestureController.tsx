import React,{Component} from 'react';
import Tappable from 'react-tappable';

type MyProps = {
    parent:any
};

type MyStates = {

};

interface GestureController {
  parent: any
}


class GestureController extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      
    }//END state
    
    this.getEle                       = this.getEle.bind(this);
    this.handleTap                    = this.handleTap.bind(this);
    this.handleSwipe                  = this.handleSwipe.bind(this);
  }//END constructor

  componentDidMount() 
  {
    
  }//END componentDidMount

  handleTap(e, b ,c ,d) 
  {
    console.log('handleTap');
    console.log(Object.keys(e));
    console.log(e.changedTouches[0] );
  }//END handleTap

  handleSwipe() 
  {
    console.log('handleSwipe');
  }//END handleSwipe

  getEle()
  {
    
    
    return <Tappable onTap={this.handleTap} style={{border:'red 1px solid'}}>Tap me</Tappable>
  }

  render() 
  {
      return null
  }

}//END class GestureController


export default GestureController;