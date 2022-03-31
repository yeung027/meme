import React,{Component} from 'react';
import styles from '../../styles/generator/steps/desktop.module.css'
import mobileStyles from '../../styles/generator/steps/mobile.module.css'

type MyProps = {
    parent:any
};

type MyStates = {

};

interface Steps {
parent: any
}

class Steps extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      
    }//END state
    
  }//END constructor

  render() 
  {

      let itemClass = this.parent.state.isMobile? mobileStyles.item : styles.item;
      let itemActiveClass = [itemClass, this.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

      let lineActiveClass = this.parent.state.isMobile? mobileStyles.line : styles.line;
      lineActiveClass = [lineActiveClass, this.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

      return  <div className={this.parent.state.isMobile? mobileStyles.container : styles.container}>
                
                <div className={itemActiveClass}>
                  <div className={this.parent.state.isMobile? mobileStyles.dot : styles.dot}>
                    <div className={this.parent.state.isMobile? mobileStyles.circle : styles.circle} />
                    <div className={lineActiveClass} />
                  </div>
                  <span>Add Image</span>
                </div>

                <div className={itemClass}>
                  <div className={this.parent.state.isMobile? mobileStyles.dot : styles.dot}>
                  <div className={this.parent.state.isMobile? mobileStyles.circle : styles.circle} />
                    <div className={lineActiveClass} />
                  </div>
                  <span>Add Text</span>
                </div>

                <div className={itemClass}>
                  <div className={this.parent.state.isMobile? mobileStyles.dot : styles.dot}>
                  <div className={this.parent.state.isMobile? mobileStyles.circle : styles.circle} />
                    <div className={lineActiveClass} />
                  </div>
                  <span>Stickers</span>
                </div>

                <div className={itemClass}>
                  <div className={this.parent.state.isMobile? mobileStyles.dot : styles.dot}>
                  <div className={this.parent.state.isMobile? mobileStyles.circle : styles.circle} />
                  </div>
                  <span>Complete</span>
                </div>
                
              </div>
  }

}//END class Steps


export default Steps;