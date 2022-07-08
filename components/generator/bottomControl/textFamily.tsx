import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/textFamily/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/textFamily/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
/* @ts-ignore */
import { SketchPicker } from 'react-color'
import EditingImage from '../../../models/editingImage';
const timers = require('timers-promises');

type MyProps = {
    parent:any
};

type MyStates = {
  colorPickerOpen:boolean
  colorPickerColor:string
  selectingTextIndex:number
};

interface TextFamilyUI {
  parent: any
  colorPickerRef:any
  colorPicker1Ref:any
  colorBtnRef:any
}

class TextFamilyUI extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      colorPickerOpen:false,
      colorPickerColor:'#000',
      selectingTextIndex:-1
    }//END state
    
    this.colorPickerRef = React.createRef();
    this.colorPicker1Ref = React.createRef();
    this.colorBtnRef = React.createRef();

    this.componentsGetter        = this.componentsGetter.bind(this);
    this.okBtnOnclick           = this.okBtnOnclick.bind(this);

  }//END constructor



  componentsGetter()
  {
    return this.parent.parent.componentsGetterRef.current;
  }//END componentsGetter

  

  componentDidMount() 
  {
    
  }//END componentDidMount

  okBtnOnclick()
  {
    //console.log(this.parent);

    this.parent.stageChange(this.parent.stage.EDITTEXT);
    this.componentsGetter().steps().stepChange(this.componentsGetter().steps().EDITIMG);

  }//END okBtnOnclick

  render() 
  {
    let containerClass    = this.parent.parent.isMobile ?  mobileStyles.container : styles.container;
    
    let buttonClass       = this.parent.parent.isMobile ?  mobileStyles.btn : styles.btn;
    let buttonActiveClass = [buttonClass, this.parent.parent.isMobile ?  mobileStyles.active : styles.active].join(' ');

    let backBtnClass = this.parent.parent.state.isMobile? mobileStyles.textBtn : styles.textBtn;
    backBtnClass = [backBtnClass, this.parent.parent.state.isMobile? utilStyles.headerRIconBtn_r : utilStyles.headerRIconBtn].join(' ');

    return  <div className={containerClass} style={{display: this.parent.state.currentUI === this.parent.stage.TEXTFAMILY ? 'flex' : 'none'}}>

              <div className={this.parent.parent.isMobile ?  mobileStyles.header : styles.header}>
                <div className={this.parent.parent.isMobile ?  mobileStyles.title : styles.title}>
                  <i className={'bx bxs-bell'} />
                  <span>Font Family</span>
                </div>
                <div className={this.parent.parent.isMobile ?  mobileStyles.header_r : styles.header_r}>
                  <span className={backBtnClass} onClick={this.okBtnOnclick}>
                    <i className={this.parent.parent.state.isMobile?'bx bx-right-arrow-alt' : 'bx bx-left-arrow-alt'} />
                    back
                  </span>
                </div>
              </div>
              <div className={this.parent.parent.isMobile ?  mobileStyles.main : styles.main}>
                <div 
                  className={this.parent.parent.isMobile ?  mobileStyles.mainInner : styles.mainInner}
                >

                 f

                  


                </div>
              </div>
            </div>

  }

}//END class TextFamilyUI


export default TextFamilyUI;