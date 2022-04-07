import React,{Component} from 'react';
import ImageEditor from './imageEditor'

type MyProps = {
    parent:any
};

type MyStates = {

};

interface CPU {
  parent: any
  imageEditorRef: any
}

class CPU extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      
    }//END state
    
    this.imageEditorRef = React.createRef();
  }//END constructor

  render() 
  {
      return  <>
                <ImageEditor parent={this} ref={this.imageEditorRef} rawImgSrc={''} />
              </>;
  }

}//END class CPU


export default CPU;