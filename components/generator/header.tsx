import React,{Component} from 'react';
import styles from '../../styles/generator/header/desktop.module.css'
import mobileStyles from '../../styles/generator/header/mobile.module.css'
import IconButton from '@material-ui/core/IconButton';

type MyProps = {
    parent:any
};

type MyStates = {

};

interface Header {
parent: any
}

class Header extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      
    }//END state
    this.componentsGetter        = this.componentsGetter.bind(this);
    this.exportBtnClick           = this.exportBtnClick.bind(this);
  }//END constructor

  componentsGetter()
  {
    return this.parent.componentsGetterRef.current;
  }//END componentsGetter

  exportBtnClick()
  {
    this.componentsGetter().exportDialog().export();
  }//END exportBtnClick

  render() 
  {
      return    <>
                    <div className={this.parent.state.isMobile? mobileStyles.container : styles.container} id="rootHeader">
                        <div className={this.parent.state.isMobile? mobileStyles.title : styles.title}>
                            {this.parent.state.pageTitle}
                        </div>
                        <div className={this.parent.state.isMobile? mobileStyles.right : styles.right}>
                            <IconButton color="primary" component="span">
                            <i className={'bx bx-dots-vertical-rounded'} />
                            </IconButton>
                            <IconButton color="primary" component="span">
                                <i 
                                    className={'bx bxs-download'}
                                    onClick={this.exportBtnClick}
                                 />
                            </IconButton>
                        </div>
                    </div>
                </>
  }

}//END class Header


export default Header;