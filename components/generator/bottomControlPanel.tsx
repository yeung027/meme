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
      isAnimation: true,
      animationInout: true
    }//END state
    
    this.animationEnd = this.animationEnd.bind(this);
  }//END constructor

  animationEnd()
  {
    console.log('animationEnd');
    this.setState({ 
      isAnimation: false
     });
  }//END animationEnd

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

    return  <div className={containerClass} onAnimationEnd={this.animationEnd}>
              <div className={innerClass}>
                  <UploadImgUI parent={this} />
              </div>
            </div>

  }

}//END class BottomControlPanel


export default BottomControlPanel;