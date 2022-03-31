import React,{Component} from 'react';
import styles from '../../styles/generator/bottomControlPanel/desktop.module.css'
import mobileStyles from '../../styles/generator/bottomControlPanel/mobile.module.css'
import ImageIcon from '@material-ui/icons/Image';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import VisibilityIcon from '@material-ui/icons/Visibility';

type MyProps = {
    parent:any
};

type MyStates = {

};

interface BottomControlPanel {
parent: any
}

class BottomControlPanel extends Component<MyProps, MyStates>
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
      let buttonClass = this.parent.state.isMobile? mobileStyles.btn : styles.btn;
      let buttonActiveClass = [buttonClass, this.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

      return  <div className={this.parent.state.isMobile? mobileStyles.container : styles.container}>
                
                <div className={buttonClass}>
                    <ImageIcon className={this.parent.state.isMobile? mobileStyles.icon : styles.icon} />
                    <span>Image</span>
                </div>

                <div className={buttonActiveClass}>
                    <TextFieldsIcon className={this.parent.state.isMobile? mobileStyles.icon : styles.icon} />
                    <span>Text</span>
                </div>

                <div className={buttonClass}>
                    <InsertEmoticonIcon className={this.parent.state.isMobile? mobileStyles.icon : styles.icon} />
                    <span>Stickers</span>
                </div>

                <div className={buttonClass}>
                    <VisibilityIcon className={this.parent.state.isMobile? mobileStyles.icon : styles.icon} />
                    <span>Preview</span>
                </div>

              </div>
  }

}//END class BottomControlPanel


export default BottomControlPanel;