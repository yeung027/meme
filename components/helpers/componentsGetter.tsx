import React,{Component} from 'react';


type MyProps = {
    parent:any
};

type MyStates = {

};

interface ComponentsGetter {
  parent: any

}

class ComponentsGetter extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;
    this.state = {}//END state

    this.steps                    = this.steps.bind(this);
    this.imageEditor              = this.imageEditor.bind(this);
  }//END constructor

  steps()
  {
    return this.parent.stepsRef.current!;
  }

  imageEditor()
  {
    return this.parent.cpuRef.current.imageEditorRef.current;
  }

  render(){return null;}

}//END class ComponentsGetter


export default ComponentsGetter;