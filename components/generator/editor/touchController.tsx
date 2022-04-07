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
    
    
  }//END constructor


  handleTap(e:any) 
  {
    console.log('handleTap');
    console.log(Object.keys(e));
    console.log(e.changedTouches[0] );
  }//END handleTap

  tappableElement(tappableClass:any, wrapperStyle:any, children:any, key:string)
  {
    return <Tappable 
      onTap={this.handleTap} 
      className={tappableClass}
      style={wrapperStyle}
      key={key}
    >
      {children}
    </Tappable>
  }//END tappableElement


}//END class TouchController


export default TouchController;