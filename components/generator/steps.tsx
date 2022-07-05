import React,{Component} from 'react';
import styles from '../../styles/generator/steps/desktop.module.css'
import mobileStyles from '../../styles/generator/steps/mobile.module.css'
import {STEP} from '../../models/step';
type MyProps = {
    parent:any
    step:any
};

type MyStates = {
  currentStep:STEP
};

interface Steps {
  parent: any
  step:any
  itemClass:any
  itemActiveClass:any
  lineActiveClass:any
}

class Steps extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;
    
    this.itemClass = this.parent.state.isMobile? mobileStyles.item : styles.item;
    this.itemActiveClass = [this.itemClass, this.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

    this.lineActiveClass = this.parent.state.isMobile? mobileStyles.line : styles.line;
    this.lineActiveClass = [this.lineActiveClass, this.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

    this.step  = STEP;

    this.state = {
      currentStep: this.parent.state.steps[0],
    }//END state
    
    this.stepChange = this.stepChange.bind(this);
    this.getUploadImgElement  = this.getUploadImgElement.bind(this);
    this.getEditImgElement    = this.getEditImgElement.bind(this);
    this.getCompleteElement   = this.getCompleteElement.bind(this);

  }//END constructor

  componentDidMount() 
  {
    this.parent.stepsDidMountCallback();
  }//END componentDidMount

  stepChange(step:string)
  {
    if(step === this.step.UPLOADIMG)
    {
      this.setState({ 
        currentStep: this.step.UPLOADIMG,
       });
    }
    else if(step === this.step.EDITIMG)
    {
      this.setState({ 
        currentStep: this.step.EDITIMG,
       });
    }
    else if(step === this.step.EXPORT)
    {
      this.setState({ 
        currentStep: this.step.EXPORT,
       });
    }

  }//END stepChange

  getUploadImgElement(isLastItem:boolean)
  {
    return  <div className={this.state.currentStep == this.step.UPLOADIMG ? this.itemActiveClass : this.itemClass}>
              <div className={this.parent.state.isMobile? mobileStyles.dot : styles.dot}>
                <div className={this.parent.state.isMobile? mobileStyles.circle : styles.circle} />
                {!isLastItem && <div className={this.lineActiveClass} />}
              </div>
              <span>Upload</span>
            </div>
  }//END getUploadImgElement

  getEditImgElement(isLastItem:boolean)
  {
    return  <div className={this.state.currentStep == this.step.EDITIMG ? this.itemActiveClass : this.itemClass}>
              <div className={this.parent.state.isMobile? mobileStyles.dot : styles.dot}>
              <div className={this.parent.state.isMobile? mobileStyles.circle : styles.circle} />
              {!isLastItem && <div className={this.lineActiveClass} />}
              </div>
              <span>Edit</span>
            </div>
  }//END getEditImgElement

  getCompleteElement(isLastItem:boolean)
  {
    return    <div className={this.state.currentStep == this.step.EXPORT ? this.itemActiveClass : this.itemClass}>
                <div className={this.parent.state.isMobile? mobileStyles.dot : styles.dot}>
                <div className={this.parent.state.isMobile? mobileStyles.circle : styles.circle} />
                {!isLastItem && <div className={this.lineActiveClass} />}
                </div>
                <span>Complete</span>
              </div>
  }//END getCompleteElement

  render() 
  {

      let itemClass = this.parent.state.isMobile? mobileStyles.item : styles.item;
      let itemActiveClass = [itemClass, this.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

      let lineActiveClass = this.parent.state.isMobile? mobileStyles.line : styles.line;
      lineActiveClass = [lineActiveClass, this.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

      return  <div className={this.parent.state.isMobile? mobileStyles.container : styles.container}>
                
                {
                  this.parent.state.steps.map((step:STEP, i:number) => {
                    //console.log(step==STEP.EDITIMG);
                    if(step==STEP.UPLOADIMG) return this.getUploadImgElement(this.parent.state.steps.length<=(i+1));
                    else if(step==STEP.EDITIMG) return this.getEditImgElement(this.parent.state.steps.length<=(i+1));
                    else if(step==STEP.EXPORT) return this.getCompleteElement(this.parent.state.steps.length<=(i+1));
                  }
                )}

                
              </div>
  }

}//END class Steps


export default Steps;