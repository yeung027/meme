import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/export/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/export/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
import Snackbar from '@material-ui/core/Snackbar';
import Grow from '@material-ui/core/Grow';
import MuiAlert from '@material-ui/lab/Alert';





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
    this.exportBtnOnclick         = this.exportBtnOnclick.bind(this);
    this.bottomDownloadBtnClick   = this.bottomDownloadBtnClick.bind(this);
    this.backBtnOnclick           = this.backBtnOnclick.bind(this);

    
  }//END constructor

  async bottomDownloadBtnClick()
  {
    if (navigator.share) {
      await navigator.share({
        title: 'Meme',
        files: [this.parent.parent.exportDialogRef.current.state.exportFile]
      })
        .then(() => console.log('成功'))
        .catch((error) => console.log('發生錯誤', error));
    }

  }//END bottomDownloadBtnClick

 

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

  backBtnOnclick()
  {
    this.parent.stageChange(this.parent.stage.EDITIMG);
    this.parent.parent.stepsRef.current.stepChange(this.parent.parent.stepsRef.current.step.EDITIMG);
  }//END backBtnOnclick

  exportBtnOnclick()
  {
    //console.log(this.parent.parent.exportDialogRef.current);
    this.parent.parent.exportDialogRef.current.export();
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
                <i className={'bx bxs-bell'} />
                <span>Export Image</span>
                </div>
                <div className={this.parent.parent.state.isMobile? mobileStyles.header_r : styles.header_r}>
                  
                </div>
              </div>
              <div className={this.parent.parent.state.isMobile? mobileStyles.main : styles.main}>
                <div className={this.parent.parent.state.isMobile? mobileStyles.mainInner : styles.mainInner}>
                  
                  <div className={buttonActiveClass} onClick={this.backBtnOnclick}>
                  <i className={'bx bx-left-arrow-alt'} />
                  <span>Back</span>
                  </div>

                  <div className={buttonActiveClass} onClick={this.exportBtnOnclick}>
                  <i className={'bx bxs-download'} />
                  <span>Export</span>
                  </div>
                  
                </div>
              </div>
            </div>

  }

}//END class ExportUI


export default ExportUI;