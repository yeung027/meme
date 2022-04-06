import React,{Component} from 'react';


type MyProps = {
    parent:any
};

type MyStates = {

};

interface ImageText {
parent: any
}

class ImageText extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      
    }//END state

    this.addText       = this.addText.bind(this);
  }//END constructor

  addText(text:string)
  {
    //console.log('okok..add text');
  }//END addText

  render() 
  {
    return null;
  }

}//END class ImageText


export default ImageText;