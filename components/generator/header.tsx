import React,{Component} from 'react';
import styles from '../../styles/generator/header/desktop.module.css'
import mobileStyles from '../../styles/generator/header/mobile.module.css'
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppIcon from '@material-ui/icons/GetApp';

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
    
  }//END constructor

  render() 
  {
      return    <>
                    <div className={this.parent.state.isMobile? mobileStyles.header : styles.header}>
                  <div className={this.parent.state.isMobile? mobileStyles.title : styles.title}>
                    Will Smith Punching generator
                  </div>
                  <div className={this.parent.state.isMobile? mobileStyles.header_r : styles.header_r}>
                    <IconButton color="primary" component="span">
                      <MoreVertIcon className={this.parent.state.isMobile? mobileStyles.header_btn : styles.header_btn} />
                    </IconButton>
                    <IconButton color="primary" component="span">
                      <GetAppIcon className={this.parent.state.isMobile? mobileStyles.header_btn : styles.header_btn} />
                    </IconButton>
                  </div>
                </div>
                <div className={this.parent.state.isMobile? mobileStyles.whiteContainer : styles.whiteContainer}>
                  fdsfdsfds
  </div>
                </>
  }

}//END class IndexPage


export default Header;