import React,{Component} from 'react';
import styles from '../../styles/generator/bottomControlPanel/desktop.module.css'
import mobileStyles from '../../styles/generator/bottomControlPanel/mobile.module.css'
import ImageIcon from '@material-ui/icons/Image';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import VisibilityIcon from '@material-ui/icons/Visibility';
import UploadImgUI from './bottomControl/uploadImg';
import EditImgUI from './bottomControl/editImg';


type MyProps = {
    parent:any
    stage:any
};

type MyStates = {
    isAnimation: boolean,
    animationInout: boolean, //IN = true, OUT = false
    currentUI: string,
    pendingUIChange: boolean,
    pendingUI: any,
};

interface BottomControlPanel {
  parent: any
  stage:any
}

class BottomControlPanel extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    enum STAGE {
      UPLOADIMG = 'uploadimg',
      EDITIMG = 'editimg'
    }

    this.stage  = STAGE;
    this.state = {
      isAnimation: true,
      animationInout: true,
      currentUI: this.stage.UPLOADIMG,
      pendingUIChange: false,
      pendingUI: null,
    }//END state
    
    this.animationEnd = this.animationEnd.bind(this);
    this.stageChange  = this.stageChange.bind(this);
  }//END constructor

  animationEnd()
  {
    //console.log('animationEnd');

    if(this.state.pendingUIChange && this.state.pendingUI != null && !this.state.animationInout)
    {
      this.setState({ 
        isAnimation: true,
        currentUI: this.state.pendingUI,
        animationInout: true
       });

      return;
    }
    else if(this.state.pendingUI != null && this.state.animationInout)
    {
      this.setState({ 
        isAnimation: false,
        pendingUIChange: false,
        pendingUI: null
       });
      return;
    }


    this.setState({ 
      isAnimation: false
     });
  }//END animationEnd

  stageChange(ui:any)
  {
    if(ui === this.stage.EDITIMG)
    {
      this.setState({ 
        isAnimation: true,
        pendingUIChange: true,
        pendingUI: this.stage.EDITIMG,
        animationInout: false
       });
    }

  }//END stageChange

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

    let ui  = null;
    if(this.state.currentUI === this.stage.UPLOADIMG)
      ui  = <UploadImgUI parent={this} />
    else if(this.state.currentUI === this.stage.EDITIMG)
      ui  = <EditImgUI parent={this} />

    return  <div className={containerClass} onAnimationEnd={this.animationEnd}>
              <div className={innerClass}>
                  {ui}
              </div>
            </div>

  }

}//END class BottomControlPanel


export default BottomControlPanel;