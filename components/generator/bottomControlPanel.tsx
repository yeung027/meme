import React,{Component} from 'react';
import styles from '../../styles/generator/bottomControlPanel/desktop.module.css'
import mobileStyles from '../../styles/generator/bottomControlPanel/mobile.module.css'
import ImageIcon from '@material-ui/icons/Image';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import VisibilityIcon from '@material-ui/icons/Visibility';
import UploadImgUI from './bottomControl/uploadImg';

type MyProps = {
    parent:any
};

type MyStates = {
    isAnimation: boolean,
    animationInout: boolean //IN = true, OUT = false
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
      isAnimation: false,
      animationInout: false
    }//END state
    
  }//END constructor

  render_backup()
  {
    let containerClass    = this.parent.state.isMobile? mobileStyles.container : styles.container;
    let innerClass        = this.parent.state.isMobile? mobileStyles.inner : styles.inner;
    if(this.state.isAnimation)
    {
      let in_or_out   = this.state.animationInout;
      let temp_class = this.state.animationInout? (this.parent.state.isMobile? mobileStyles.fadeIn : styles.fadeIn) : (this.parent.state.isMobile? mobileStyles.fadeOut : styles.fadeOut);
      //console.log('temp_class: ' + temp_class);
      containerClass = [containerClass, temp_class].join(' ');
    }
    let buttonClass       = this.parent.state.isMobile? mobileStyles.btn : styles.btn;
    let buttonActiveClass = [buttonClass, this.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

    return  <div className={containerClass}>
              <div className={innerClass}>
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
            </div>
  }//END render_backup

  render() 
  {
    let containerClass    = this.parent.state.isMobile? mobileStyles.container : styles.container;
    let innerClass        = this.parent.state.isMobile? mobileStyles.inner : styles.inner;
    if(this.state.isAnimation)
    {
      let in_or_out   = this.state.animationInout;
      let temp_class = this.state.animationInout? (this.parent.state.isMobile? mobileStyles.fadeIn : styles.fadeIn) : (this.parent.state.isMobile? mobileStyles.fadeOut : styles.fadeOut);
      //console.log('temp_class: ' + temp_class);
      containerClass = [containerClass, temp_class].join(' ');
    }

    return  <div className={containerClass}>
              <div className={innerClass}>
                  <UploadImgUI parent={this} />
              </div>
            </div>

  }

}//END class BottomControlPanel


export default BottomControlPanel;