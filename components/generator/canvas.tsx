import React,{Component} from 'react';
import styles from '../../styles/generator/canvas/desktop.module.css'
import mobileStyles from '../../styles/generator/canvas/mobile.module.css'

type MyProps = {
    parent:any
};

type MyStates = {

};

interface Canvas {
parent: any
}

class Canvas extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      
    }//END state
    
  }//END constructor

  render() 
  {

      
      return  <div className={this.parent.state.isMobile? mobileStyles.container : styles.container}>
                <canvas className={this.parent.state.isMobile? mobileStyles.canvas : styles.canvas}>
                  
                </canvas>
              </div>
  }

}//END class Canvas


export default Canvas;