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

    this.textBtnOnclick       = this.textBtnOnclick.bind(this);
    this.addText       = this.addText.bind(this);
  }//END constructor

  textBtnOnclick(text:string)
  {
    //console.log('okok..add text');
  }//END textBtnOnclick

  addText()
  {
    
  }//END addText

  render() 
  {
    return null;
  }

}//END class ImageText


export default ImageText;