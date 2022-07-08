import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/export/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/export/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
import Snackbar from '@material-ui/core/Snackbar';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton/IconButton';





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

    this.componentsGetter        = this.componentsGetter.bind(this);
    this.snackOnClick             = this.snackOnClick.bind(this);
    this.getSnackTransition       = this.getSnackTransition.bind(this);
    this.snackOnClose             = this.snackOnClose.bind(this);
    this.exportBtnOnclick         = this.exportBtnOnclick.bind(this);
    this.bottomDownloadBtnClick   = this.bottomDownloadBtnClick.bind(this);
    this.backBtnOnclick           = this.backBtnOnclick.bind(this);

    
  }//END constructor

  componentsGetter()
  {
    return this.parent.parent.componentsGetterRef.current;
  }//END componentsGetter

  async bottomDownloadBtnClick()
  {
    if (navigator.share) {
      await navigator.share({
        title: 'Meme',
        files: [this.componentsGetter().exportDialog().state.exportFile]
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
    this.componentsGetter().exportDialog().export();
  }//END exportBtnOnclick

  


  render() 
  {
    let containerClass    = this.parent.parent.isMobile ? mobileStyles.container : styles.container;
    
    let buttonClass       = this.parent.parent.isMobile ? mobileStyles.btn : styles.btn;
    let buttonActiveClass = [buttonClass, this.parent.parent.isMobile ? mobileStyles.active : styles.active].join(' ');

    let nextBtnClass       = utilStyles.purple_iconRight_btn_l;
    

    


    return  <div className={containerClass} style={{display: this.parent.state.currentUI === this.parent.stage.EXPORT ? 'flex' : 'none'}}>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                open={this.state.snackOpen}
                autoHideDuration={6000}
                onClose={this.snackOnClose}
                message={this.state.snackMsg}
                TransitionComponent={this.getSnackTransition}
                className={this.parent.parent.isMobile ? mobileStyles.snack : styles.snack}
                action={
                  <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.snackOnClose}>
                      <i style={{color:'#fff'}} className={'bx bx-x'} />
                    </IconButton>
                  </React.Fragment>
                }
              />
              {/* <Snackbar 
                open={this.state.snackOpen} 
                autoHideDuration={6000} 
                onClose={this.snackOnClose}
                onClick={this.snackOnClick}
                TransitionComponent={this.getSnackTransition}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
               }}
                className={this.parent.parent.isMobile ? mobileStyles.snack : styles.snack}
              >
                <MuiAlert 
                  elevation={6} 
                  variant="filled"
                  severity={this.state.snackType}
                >
                  {this.state.snackMsg}
                </MuiAlert>
              </Snackbar> */}

              <div className={this.parent.parent.isMobile ? mobileStyles.header : styles.header}>
                <div className={this.parent.parent.isMobile ? mobileStyles.title : styles.title}>
                <i className={'bx bxs-bell'} />
                <span>Export Image</span>
                </div>
                <div className={this.parent.parent.isMobile ? mobileStyles.header_r : styles.header_r}>
                  
                </div>
              </div>
              <div className={this.parent.parent.isMobile ? mobileStyles.main : styles.main}>
                <div className={this.parent.parent.isMobile ? mobileStyles.mainInner : styles.mainInner}>
                  
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