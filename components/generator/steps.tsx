import React,{Component} from 'react';
import styles from '../../styles/generator/steps/desktop.module.css'
import mobileStyles from '../../styles/generator/steps/mobile.module.css'

type MyProps = {
    parent:any
    step:any
};

type MyStates = {
  currentStep:string
};

interface Steps {
  parent: any
  step:any
}

class Steps extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    enum STEP {
      UPLOADIMG = 'uploadimg',
      EDITIMG = 'editimg',
      EXPORT = 'export'
    }

    this.step  = STEP;

    this.state = {
      currentStep: this.step.UPLOADIMG,
    }//END state
    
    this.stepChange = this.stepChange.bind(this);

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

  render() 
  {

      let itemClass = this.parent.state.isMobile? mobileStyles.item : styles.item;
      let itemActiveClass = [itemClass, this.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

      let lineActiveClass = this.parent.state.isMobile? mobileStyles.line : styles.line;
      lineActiveClass = [lineActiveClass, this.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

      return  <div className={this.parent.state.isMobile? mobileStyles.container : styles.container}>
                
                <div className={this.state.currentStep == this.step.UPLOADIMG ? itemActiveClass : itemClass}>
                  <div className={this.parent.state.isMobile? mobileStyles.dot : styles.dot}>
                    <div className={this.parent.state.isMobile? mobileStyles.circle : styles.circle} />
                    <div className={lineActiveClass} />
                  </div>
                  <span>Upload</span>
                </div>

                <div className={this.state.currentStep == this.step.EDITIMG ? itemActiveClass : itemClass}>
                  <div className={this.parent.state.isMobile? mobileStyles.dot : styles.dot}>
                  <div className={this.parent.state.isMobile? mobileStyles.circle : styles.circle} />
                    <div className={lineActiveClass} />
                  </div>
                  <span>Edit</span>
                </div>


                <div className={this.state.currentStep == this.step.EXPORT ? itemActiveClass : itemClass}>
                  <div className={this.parent.state.isMobile? mobileStyles.dot : styles.dot}>
                  <div className={this.parent.state.isMobile? mobileStyles.circle : styles.circle} />
                  </div>
                  <span>Complete</span>
                </div>
                
              </div>
  }

}//END class Steps


export default Steps;