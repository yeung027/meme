import React,{Component} from 'react';
import styles from '../../styles/generator/bottomControlPanel/desktop.module.css'
import mobileStyles from '../../styles/generator/bottomControlPanel/mobile.module.css'
import UploadImgUI from './bottomControl/uploadImg';
import EditImgUI from './bottomControl/editImg';
import EditTextUI from './bottomControl/editText';
import ExportUI from './bottomControl/export';

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
  editTextRef:any
  rootRef: any
  innerRef: any
}

class BottomControlPanel extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.rootRef = React.createRef();
    this.innerRef = React.createRef();

    enum STAGE {
      UPLOADIMG = 'uploadimg',
      EDITIMG = 'editimg',
      EDITTEXT = 'edittext',
      EXPORT = 'export'
    }

    this.stage  = STAGE;
    this.state = {
      isAnimation: false,
      animationInout: true,
      currentUI: this.parent.state.steps[0],
      pendingUIChange: false,
      pendingUI: null,
    }//END state
    
    this.editTextRef = React.createRef();

    this.animationEnd = this.animationEnd.bind(this);
    this.stageChange  = this.stageChange.bind(this);
  }//END constructor

  componentDidMount() 
  {
    // console.log(this.parent.state.steps[0]);
    // this.setState({ 
    //   currentUI: this.parent.state.steps[0]
    //  });
    this.parent.bottomControlPanelDidMountCallback();
  }//END componentDidMount

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
    else if(ui === this.stage.EDITTEXT)
    {
      this.setState({ 
        isAnimation: true,
        pendingUIChange: true,
        pendingUI: this.stage.EDITTEXT,
        animationInout: false
       });
    }
    else if(ui === this.stage.EXPORT)
    {
      this.setState({ 
        isAnimation: true,
        pendingUIChange: true,
        pendingUI: this.stage.EXPORT,
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

    let uploadStyle:any  = {display:'none', width:'100%'};
    let editImgStyle:any  = {display:'none', width:'100%'};
    let editTextStyle:any  = {display:'none', width:'100%'};
    let exportStyle:any  = {display:'none', width:'100%'};
    
    if(this.state.currentUI === this.stage.UPLOADIMG)
      uploadStyle.display = 'block';
    else if(this.state.currentUI === this.stage.EDITIMG)
      editImgStyle.display = 'block';
    else if(this.state.currentUI === this.stage.EDITTEXT)
      editTextStyle.display = 'block';
    else if(this.state.currentUI === this.stage.EXPORT)
      exportStyle.display = 'block';

    return  <div 
              className={containerClass} 
              onAnimationEnd={this.animationEnd}
              id="BottomControlPanel"
              ref={this.rootRef}
            >
              <div 
                className={innerClass}
                id="BottomControlPanelInner"
                ref={this.innerRef}
              >
                  <div style={uploadStyle}><UploadImgUI parent={this} /></div>
                  <div style={editImgStyle}><EditImgUI parent={this} /></div>
                  <div style={editTextStyle}><EditTextUI parent={this} ref={this.editTextRef} /></div>
                  <div style={exportStyle}><ExportUI parent={this} /></div>
              </div>
            </div>

  }

}//END class BottomControlPanel


export default BottomControlPanel;