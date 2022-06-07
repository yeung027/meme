import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/editText/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/editText/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
import { SketchPicker } from 'react-color'

import IconButton from '@material-ui/core/IconButton';

type MyProps = {
    parent:any
};

type MyStates = {
  pickerColor:string
  colorBtnActive:boolean
  pickerOpen:boolean
  selectingTextIndex:number
};

interface EditTextUI {
  parent: any
  colorPickerRef:any
}

class EditTextUI extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      pickerColor: '#000',
      colorBtnActive: false,
      pickerOpen: false,
      selectingTextIndex:-1
    }//END state
    
    this.colorPickerRef = React.createRef();

    this.colorBtnOnclick           = this.colorBtnOnclick.bind(this);
    this.okBtnOnclick           = this.okBtnOnclick.bind(this);
    this.handleSketchPickerChangeComplete           = this.handleSketchPickerChangeComplete.bind(this);
    this.updateSelectingTextColor           = this.updateSelectingTextColor.bind(this);
  }//END constructor


  okBtnOnclick()
  {
    //console.log(this.parent);

    this.parent.stageChange(this.parent.stage.EDITIMG);
    this.parent.parent.stepsRef.current.stepChange(this.parent.parent.stepsRef.current.step.EDITIMG);

  }//END okBtnOnclick

  // adjustColorPickerPosition()
  // {

  // }//END adjustColorPickerPosition

  colorBtnOnclick(e:any)
  {
    if(this.state.colorBtnActive)
    {
      this.setState({ 
        pickerOpen: !this.state.pickerOpen
      }); 
    }
    
  }//END colorBtnOnclick

  updateSelectingTextColor()
  {
    this.parent.parent.cpuRef.current.imageEditorRef.current.imageTextRef.current.updateColor(
      this.state.selectingTextIndex,
      this.state.pickerColor
    );

  }//END updateSelectingTextColor


  handleSketchPickerChangeComplete(color:any)
  {
    var self = this;
    this.setState({ pickerColor: color.hex }, function(){
      self.updateSelectingTextColor();
    });
  };

  render() 
  {
    let containerClass    = this.parent.parent.state.isMobile? mobileStyles.container : styles.container;
    
    let buttonClass       = this.parent.parent.state.isMobile? mobileStyles.btn : styles.btn;
    let buttonActiveClass = [buttonClass, this.parent.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

    let okBtnClass       = [utilStyles.purple_iconRight_btn_l, this.parent.parent.state.isMobile? mobileStyles.okBtn : styles.okBtn].join(' ');

    //console.log(this.parent.parent.state.isMobile);pickerOpen
    let pickerWrapperClass = this.parent.parent.state.isMobile? mobileStyles.sketchPickerWrapper : styles.sketchPickerWrapper;
    if(this.state.pickerOpen) 
      pickerWrapperClass = [pickerWrapperClass, this.parent.parent.state.isMobile? mobileStyles.sketchPickerWrapperShow : styles.sketchPickerWrapperShow].join(' ');
    return  <div className={containerClass}>
   
              <div className={this.parent.parent.state.isMobile? mobileStyles.header : styles.header}>
                <div className={this.parent.parent.state.isMobile? mobileStyles.title : styles.title}>
                  <i className={'bx bxs-bell'} />
                  <span>Edit Text</span>
                </div>
                <div className={this.parent.parent.state.isMobile? mobileStyles.header_r : styles.header_r}>
                  
                </div>
              </div>
              <div className={this.parent.parent.state.isMobile? mobileStyles.main : styles.main}>
                <div className={this.parent.parent.state.isMobile? mobileStyles.mainInner : styles.mainInner}>

                  <div className={this.state.colorBtnActive? buttonActiveClass : buttonClass}>
                  <i className={'bx bx-palette'} onClick={this.colorBtnOnclick} />
                    <span onClick={this.colorBtnOnclick}>Color</span>
                    <div className={pickerWrapperClass}>
                      <SketchPicker
                        ref={this.colorPickerRef}
                        onChangeComplete={ this.handleSketchPickerChangeComplete }
                        color={this.state.pickerColor}
                        className={this.parent.parent.state.isMobile? mobileStyles.sketchPicker : styles.sketchPicker}
                      />
                    </div>
                  </div>
                  <div className={buttonClass} >
                  <i className={'bx bx-text'} />
                    <span>Text</span>
                  </div>

                  <div className={okBtnClass} onClick={this.okBtnOnclick}>
                    <span>ok</span>
                    <i className={'bx bx-chevron-right'} />
                  </div>
                </div>
              </div>
            </div>

  }

}//END class EditTextUI


export default EditTextUI;