import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/editImg/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/editImg/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
import Snackbar from '@material-ui/core/Snackbar';
import Grow from '@material-ui/core/Grow';
import MuiAlert from '@material-ui/lab/Alert';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

import GetAppIcon from '@material-ui/icons/GetApp';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

type MyProps = {
    parent:any
};

type MyStates = {
  snackOpen: boolean
  snackType: any
  snackMsg: string
};

interface ExportUI {
parent: any
}

class ExportUI extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      snackOpen: false,
      snackType: 'error',
      snackMsg: '',
    }//END state
    
    this.snackOnClick             = this.snackOnClick.bind(this);
    this.getSnackTransition       = this.getSnackTransition.bind(this);
    this.snackOnClose             = this.snackOnClose.bind(this);
    this.nextBtnOnclick           = this.nextBtnOnclick.bind(this);
    this.exportBtnOnclick          = this.exportBtnOnclick.bind(this);
    
  }//END constructor

  snackOnClose()
  {
    this.setState({ 
      snackOpen: false,
    });
  }//END snackOnClose

  getSnackTransition(props:any) 
  {
    return <Grow {...props} />
  }//END getSnackTransition

  snackOnClick(e:any)
  {
    this.setState({ 
      snackOpen: false,
    });
  }//END snackOnClick

  nextBtnOnclick()
  {
   // console.log(this.parent);

    this.parent.stageChange(this.parent.stage.EXPORT);

  }//END nextBtnOnclick

  exportBtnOnclick()
  {
console.log('export')
  }//END exportBtnOnclick

  render() 
  {
    let containerClass    = this.parent.parent.state.isMobile? mobileStyles.container : styles.container;
    
    let buttonClass       = this.parent.parent.state.isMobile? mobileStyles.btn : styles.btn;
    let buttonActiveClass = [buttonClass, this.parent.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

    let nextBtnClass       = utilStyles.purple_iconRight_btn_l;

    return  <div className={containerClass}>
              <Snackbar 
                open={this.state.snackOpen} 
                autoHideDuration={6000} 
                onClose={this.snackOnClose}
                onClick={this.snackOnClick}
                TransitionComponent={this.getSnackTransition}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
               }}
                className={this.parent.parent.state.isMobile? mobileStyles.snack : styles.snack}
              >
                <MuiAlert 
                  elevation={6} 
                  variant="filled"
                  severity={this.state.snackType}
                >
                  {this.state.snackMsg}
                </MuiAlert>
              </Snackbar>

              <div className={this.parent.parent.state.isMobile? mobileStyles.header : styles.header}>
                <div className={this.parent.parent.state.isMobile? mobileStyles.title : styles.title}>
                  <NotificationImportantIcon className={this.parent.parent.state.isMobile? mobileStyles.titleIcon : styles.titleIcon} />
                  <span>Export Image</span>
                </div>
                <div className={this.parent.parent.state.isMobile? mobileStyles.header_r : styles.header_r}>
                  
                </div>
              </div>
              <div className={this.parent.parent.state.isMobile? mobileStyles.main : styles.main}>
                <div className={this.parent.parent.state.isMobile? mobileStyles.mainInner : styles.mainInner}>
                  <div className={buttonActiveClass} onClick={this.exportBtnOnclick}>
                    <GetAppIcon className={this.parent.parent.state.isMobile? mobileStyles.icon : styles.icon} />
                    <span>Export</span>
                  </div>
                  <div className={buttonActiveClass}>
                    <TextFieldsIcon className={this.parent.parent.state.isMobile? mobileStyles.icon : styles.icon} />
                    <span>Text</span>
                  </div>

                  <div className={nextBtnClass} onClick={this.nextBtnOnclick}>
                    <span>Next</span>
                    <ChevronRightIcon className={utilStyles.icon} />  
                  </div>
                </div>
              </div>
            </div>

  }

}//END class ExportUI


export default ExportUI;