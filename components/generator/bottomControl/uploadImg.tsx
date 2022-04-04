import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/uploadImg/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/uploadImg/mobile.module.css'


type MyProps = {
    parent:any
};

type MyStates = {
    
};

interface ButtonControlUploadGUI {
parent: any
}

class ButtonControlUploadGUI extends Component<MyProps, MyStates>
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
    let containerClass    = this.parent.parent.state.isMobile? mobileStyles.container : styles.container;

    return  <div className={containerClass}>
              dsdsad
            </div>

  }

}//END class ButtonControlUploadGUI


export default ButtonControlUploadGUI;