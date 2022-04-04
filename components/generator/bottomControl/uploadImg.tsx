import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/uploadImg/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/uploadImg/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import AddIcon from '@material-ui/icons/Add';

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
              <div className={this.parent.parent.state.isMobile? mobileStyles.header : styles.header}>
                <div className={this.parent.parent.state.isMobile? mobileStyles.title : styles.title}>
                  <NotificationImportantIcon className={this.parent.parent.state.isMobile? mobileStyles.titleIcon : styles.titleIcon} />
                  <span>Add image & merge</span>
                </div>
                <div className={this.parent.parent.state.isMobile? mobileStyles.header_r : styles.header_r}>
                  <span className={this.parent.parent.state.isMobile? mobileStyles.textBtn : styles.textBtn}>skip</span>
                </div>
              </div>
              <div className={this.parent.parent.state.isMobile? mobileStyles.main : styles.main}>
                <div className={utilStyles.iconPurpleBtn_L}>
                  <AddIcon className={utilStyles.icon} />
                  <span className={utilStyles.span}>Upload</span>
                </div>
              </div>
            </div>

  }

}//END class ButtonControlUploadGUI


export default ButtonControlUploadGUI;