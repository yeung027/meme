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
    this.touchController          = this.touchController.bind(this);
    this.imageText                = this.imageText.bind(this);
    this.canvas                   = this.canvas.bind(this);
    this.exportDialog             = this.exportDialog.bind(this);
    this.bottomControlPanel       = this.bottomControlPanel.bind(this);
  }//END constructor

  editText()
  {
    return this.bottomControlPanel().editTextRef.current;
  }

  bottomControlPanel()
  {
    return this.parent.bottomControlPanelRef.current;
  }

  exportDialog()
  {
    return this.parent.exportDialogRef.current;
  }

  canvas()
  {
    return this.parent.canvasRef.current;
  }

  imageText()
  {
    return this.imageEditor().imageTextRef.current;
  }

  touchController()
  {
    return this.parent.canvasRef.current.touchControllerRef.current;
  }

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