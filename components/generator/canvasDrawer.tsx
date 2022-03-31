import React,{Component} from 'react';
import mergeImages from 'merge-images';

type MyProps = {
    parent:any
};

type MyStates = {

};

interface CanvasDrawer {
  parent: any
}

class CanvasDrawer extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      
    }//END state
    
  }//END constructor

  componentDidMount()
  {
    console.log(document.querySelector('#canvasIMG'));
    let imgEle: any  = document.querySelector('img');
    if(imgEle)
      mergeImages(['/generator/will_smith_punching/raw.png', '/generator/will_smith_punching/happy.png'])
        .then(b64 => imgEle.src = b64);
  }//END componentDidMount

  render() 
  {
      return null;
  }

}//END class CanvasDrawer


export default CanvasDrawer;