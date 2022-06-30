import React,{Component} from 'react';
import ImageEditor from './imageEditor'
import ImageCompiler from './ImageCompiler';

type MyProps = {
    parent:any
};

type MyStates = {

};

interface CPU {
  parent: any
  compilerRef: any
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

    this.compilerRef = React.createRef();
    this.imageEditorRef = React.createRef();
  }//END constructor

  render() 
  {
      return  <>
                <ImageEditor parent={this} ref={this.imageEditorRef} rawImgSrc={''} />
                <ImageCompiler parent={this} ref={this.compilerRef} />
              </>;
  }

}//END class CPU


export default CPU;