import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/editText/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/editText/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'


import IconButton from '@material-ui/core/IconButton';

type MyProps = {
    parent:any
};

type MyStates = {

};

interface EditTextUI {
parent: any
}

class EditTextUI extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {

    }//END state
    

    this.colorBtnOnclick           = this.colorBtnOnclick.bind(this);
    this.okBtnOnclick           = this.okBtnOnclick.bind(this);
  }//END constructor


  okBtnOnclick()
  {
    //console.log(this.parent);

    this.parent.stageChange(this.parent.stage.EXPORT);
    this.parent.parent.stepsRef.current.stepChange(this.parent.parent.stepsRef.current.step.EXPORT);

  }//END okBtnOnclick


  colorBtnOnclick(e:any)
  {
    console.log('color')
  }//END colorBtnOnclick


  render() 
  {
    let containerClass    = this.parent.parent.state.isMobile? mobileStyles.container : styles.container;
    
    let buttonClass       = this.parent.parent.state.isMobile? mobileStyles.btn : styles.btn;
    let buttonActiveClass = [buttonClass, this.parent.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

    let okBtnClass       = [utilStyles.purple_iconRight_btn_l, this.parent.parent.state.isMobile? mobileStyles.okBtn : styles.okBtn].join(' ');

    //console.log(this.parent.parent.state.isMobile);

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

                  <div className={buttonActiveClass} onClick={this.colorBtnOnclick}>
                  <i className={'bx bx-palette'} />
                    <span>Color</span>
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