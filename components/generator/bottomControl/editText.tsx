import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/editText/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/editText/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
/* @ts-ignore */
import { SketchPicker } from 'react-color'

type MyProps = {
    parent:any
};

type MyStates = {
  colorPickerOpen:boolean
  colorPickerColor:string
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
      colorPickerOpen:false,
      colorPickerColor:'#000',
      selectingTextIndex:-1
    }//END state
    
    this.colorPickerRef = React.createRef();

    this.componentsGetter        = this.componentsGetter.bind(this);
    this.colorBtnOnclick           = this.colorBtnOnclick.bind(this);
    this.okBtnOnclick           = this.okBtnOnclick.bind(this);
    this.getColorPickerEle           = this.getColorPickerEle.bind(this);
    this.updateColorPickerPosition           = this.updateColorPickerPosition.bind(this);
    this.colorPickerOnChangeComplete  = this.colorPickerOnChangeComplete.bind(this);
    this.colorBackDropOnclick = this.colorBackDropOnclick.bind(this);
    this.updateImageObjColor= this.updateImageObjColor.bind(this);
  }//END constructor

  componentsGetter()
  {
    return this.parent.parent.componentsGetterRef.current;
  }//END componentsGetter

  updateImageObjColor()
  {
    if(this.state.selectingTextIndex<0) return;

    let imgObj = this.componentsGetter().canvas().state.images[this.state.selectingTextIndex];


    this.componentsGetter().imageText().doEditText(
      this.state.selectingTextIndex,
      imgObj.text, 
      imgObj.fontSize,
      this.state.colorPickerColor,
      imgObj.height,
      -1,
      -1
    );

  }//END updateImageObjColor

  okBtnOnclick()
  {
    //console.log(this.parent);

    this.parent.stageChange(this.parent.stage.EDITIMG);
    this.componentsGetter().steps().stepChange(this.componentsGetter().steps().EDITIMG);

  }//END okBtnOnclick

  colorBackDropOnclick(e:any)
  {
    //if(this.parent.parent.state.isMobile)
      this.setState({ colorPickerOpen: false });
  }

  colorBtnOnclick(e:any)
  {
    this.setState({ colorPickerOpen: !this.state.colorPickerOpen });
  }//END colorBtnOnclick

  updateColorPickerPosition()
  {
    //if(!this.parent.parent.state.isMobile) return;

    let bottomControlPanelDom:any = document.querySelector('#BottomControlPanel');
    let colorPickerWrapperDom:any = this.parent.parent.state.isMobile ? 
      document.querySelector('#colorPickerWrapper') : document.querySelector('#colorPickerWrapper_1');
    let bottomControlPanelInnerDom:any = document.querySelector('#BottomControlPanelInner');
    let rect = bottomControlPanelDom.getBoundingClientRect();
    let rectInner = bottomControlPanelInnerDom.getBoundingClientRect();
    
    colorPickerWrapperDom.style.marginTop = -rect.top+'px';
    colorPickerWrapperDom.style.marginLeft = -rectInner.left+'px';
    if(!this.parent.parent.state.isMobile)
    {
      let colorBtnDom:any = document.querySelector('#editTextUIColorBtn');
      let colorRect = colorBtnDom.getBoundingClientRect();
      //console.log("colorRect: "+colorRect.left);
      colorPickerWrapperDom.style.marginLeft = -(rectInner.left+colorRect.left+40)+'px';
      colorPickerWrapperDom.style.marginTop = -(colorRect.top+25)+'px';
    }
  }

  colorPickerOnChangeComplete(color:any, e:any)
  {
    let that = this;
    this.setState({ colorPickerColor: color.hex },
      function()
      {
        that.updateImageObjColor();
      });
  }

  componentDidMount() 
  {
    this.updateColorPickerPosition();
  }//END componentDidMount

  getColorPickerEle(positionNum:number)
  {
    let colorPickerWrapperClass = this.parent.parent.state.isMobile? mobileStyles.colorPickerWrapper : styles.colorPickerWrapper;
    if(this.state.colorPickerOpen)
      colorPickerWrapperClass = [colorPickerWrapperClass, this.parent.parent.state.isMobile? mobileStyles.colorPickerOpen : styles.colorPickerOpen].join(' ');

    if(!this.parent.parent.state.isMobile && positionNum==1)
    {
      return  <div 
                id="colorPickerWrapper_1" 
                className={colorPickerWrapperClass}
              >
                <div 
                  onClick={this.colorBackDropOnclick}
                  className={this.parent.parent.state.isMobile? mobileStyles.colorPickerBackDrop : styles.colorPickerBackDrop2} 
                />
              </div>
    }


    
    
    return  <div 
              id="colorPickerWrapper" 
              className={colorPickerWrapperClass}
            >
              <div 
                onClick={this.colorBackDropOnclick}
                className={this.parent.parent.state.isMobile? mobileStyles.colorPickerBackDrop : styles.colorPickerBackDrop} 
              />
              <div className={this.parent.parent.state.isMobile? mobileStyles.colorPickerInner : styles.colorPickerInner}>
              <SketchPicker
                color={this.state.colorPickerColor}
                onChangeComplete={this.colorPickerOnChangeComplete}
              />
              </div>
            </div>
  }//END getColorPickerEle

  render() 
  {
    let containerClass    = this.parent.parent.state.isMobile? mobileStyles.container : styles.container;
    
    let buttonClass       = this.parent.parent.state.isMobile? mobileStyles.btn : styles.btn;
    let buttonActiveClass = [buttonClass, this.parent.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

    let okBtnClass       = [utilStyles.purple_iconRight_btn_l, this.parent.parent.state.isMobile? mobileStyles.okBtn : styles.okBtn].join(' ');

    //console.log(this.parent.parent.state.isMobile);
    
    return  <div className={containerClass}>
              {this.getColorPickerEle(1)}

              <div className={this.parent.parent.state.isMobile? mobileStyles.header : styles.header}>
                <div className={this.parent.parent.state.isMobile? mobileStyles.title : styles.title}>
                  <i className={'bx bxs-bell'} />
                  <span>Edit Text</span>
                </div>
                <div className={this.parent.parent.state.isMobile? mobileStyles.header_r : styles.header_r}>
                  
                </div>
              </div>
              <div className={this.parent.parent.state.isMobile? mobileStyles.main : styles.main}>
                <div 
                  className={this.parent.parent.state.isMobile? mobileStyles.mainInner : styles.mainInner}
                >

                  <div className={buttonActiveClass} id="editTextUIColorBtn">
                  <i className={'bx bx-palette'} onClick={this.colorBtnOnclick} />
                    <span onClick={this.colorBtnOnclick}>Color</span>
                    {!this.parent.parent.state.isMobile && this.getColorPickerEle(2)}
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