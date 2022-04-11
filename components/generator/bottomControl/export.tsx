import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/export/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/export/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
import Snackbar from '@material-ui/core/Snackbar';
import Grow from '@material-ui/core/Grow';
import MuiAlert from '@material-ui/lab/Alert';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

import GetAppIcon from '@material-ui/icons/GetApp';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import ImageCompiler from '../ImageCompiler';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

type MyProps = {
    parent:any
};

type MyStates = {
  snackOpen: boolean
  snackType: any
  snackMsg: string
  pageWidth: number 
  pageHeight: number
  dialogOpen: boolean
  dialogCloseBtnWidth: number 
  dialogCloseBtnHeight: number
  dialogAppbarWidth: number 
  dialogAppbaHeight: number
  exportSrc: string
};

interface ExportUI {
  parent: any
  compilerRef: any
  dialogRef: any
  dialogCloseBtnRef: any
  dialogAppbarRef: any
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
      dialogOpen: false,
      pageWidth: 0 ,
      pageHeight: 0,
      dialogCloseBtnWidth: 0,
      dialogCloseBtnHeight: 0,
      dialogAppbarWidth: 0,  
      dialogAppbaHeight: 0,
      exportSrc: ''
    }//END state
    
    this.compilerRef = React.createRef();
    this.dialogRef = React.createRef();
    this.dialogCloseBtnRef = React.createRef();
    this.dialogAppbarRef = React.createRef();

    this.snackOnClick             = this.snackOnClick.bind(this);
    this.getSnackTransition       = this.getSnackTransition.bind(this);
    this.snackOnClose             = this.snackOnClose.bind(this);
    this.nextBtnOnclick           = this.nextBtnOnclick.bind(this);
    this.exportBtnOnclick         = this.exportBtnOnclick.bind(this);
    this.exportCallback           = this.exportCallback.bind(this);
    this.getDialogTransition           = this.getDialogTransition.bind(this);
    this.dialogClose              = this.dialogClose.bind(this);
    this.updatePageComputedStyle            = this.updatePageComputedStyle.bind(this);
    this.updateDialogCloseBtnComputedStyle  = this.updateDialogCloseBtnComputedStyle.bind(this);
    this.updateDialogAppBarComputedStyle  = this.updateDialogAppBarComputedStyle.bind(this);
    this.bottomDownloadBtnClick  = this.bottomDownloadBtnClick.bind(this);
  }//END constructor

  async bottomDownloadBtnClick()
  {
    if (navigator.share) {
      await navigator.share({
        title: 'Meme',
        text: 'Will Smith Punching',
        url: this.state.exportSrc,
      })
        .then(() => console.log('成功'))
        .catch((error) => console.log('發生錯誤', error));
    }

  }//END bottomDownloadBtnClick

  getDialogTransition(props:any) 
  {
    return <Slide direction="up" ref={this.dialogRef} {...props} />;
  }//END getDialogTransition

  dialogClose()
  {
    this.setState({ 
      dialogOpen: false,
    });
  }//END dialogClose

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
    this.setState({ 
      dialogOpen: true,
    });
    this.compilerRef.current.getOutPut(this.exportCallback);
  }//END exportBtnOnclick

  async exportCallback(output: any)
  {
    //console.log('i am callback');
    //console.log(output);
    this.setState({ 
      exportSrc: output
    });  
    //const link = document.createElement("a");
    //this.aRef.current.href = output;
    //this.aRef.current.download = 'okok.png';
  //console.log(this.aRef.current.download)


  }//END exportCallback

  updatePageComputedStyle()
  {
    if(!window) return;
     let page:any = document.querySelector('#page-root');
     
    if(!page) return;
    let pagecompStyles = window.getComputedStyle(page);
    let w:number, h:number;
    w = parseInt(pagecompStyles.width);
    h = parseInt(pagecompStyles.height);
    if (isNaN(w)) w = 0;
    if (isNaN(h)) h = 0;
    this.setState({ 
      pageWidth: w ,
      pageHeight: h,
    });  

  }//END updatePageComputedStyle

  updateDialogCloseBtnComputedStyle()
  {
    if(!this.dialogCloseBtnRef || !this.dialogCloseBtnRef.current)
    {
      var self = this;
      setTimeout(
        function() {
          self.updateDialogCloseBtnComputedStyle();
        }
        .bind(this),
        200
      );
      return;
    }

    

    let style = window.getComputedStyle(this.dialogCloseBtnRef.current);
    let w:number, h:number;
    w = parseInt(style.width);
    h = parseInt(style.height);
    if (isNaN(w)) w = 0;
    if (isNaN(h)) h = 0;
    this.setState({ 
      dialogCloseBtnWidth: w,
      dialogCloseBtnHeight: h
    });  

    //console.log('close w h : '+ w + ', ' + h); 

  }//END updateDialogCloseBtnComputedStyle

  updateDialogAppBarComputedStyle()
  {
    if(!this.dialogAppbarRef || !this.dialogAppbarRef.current)
    {
      var self = this;
      setTimeout(
        function() {
          self.updateDialogAppBarComputedStyle();
        }
        .bind(this),
        200
      );
      return;
    }

    let style = window.getComputedStyle(this.dialogAppbarRef.current);
    let w:number, h:number;
    w = parseInt(style.width);
    h = parseInt(style.height);
    if (isNaN(w)) w = 0;
    if (isNaN(h)) h = 0;
    this.setState({ 
      dialogAppbarWidth: w,
      dialogAppbaHeight: h
    });  

    //console.log('w h : '+ w + ', ' + h);

  }//END updateDialogAppBarComputedStyle

  componentDidMount() 
  {
    this.updatePageComputedStyle();
    this.updateDialogAppBarComputedStyle();
    this.updateDialogCloseBtnComputedStyle();
  }

  render() 
  {
    let containerClass    = this.parent.parent.state.isMobile? mobileStyles.container : styles.container;
    
    let buttonClass       = this.parent.parent.state.isMobile? mobileStyles.btn : styles.btn;
    let buttonActiveClass = [buttonClass, this.parent.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

    let nextBtnClass       = utilStyles.purple_iconRight_btn_l;
    let dialogAppbarClass   = this.parent.parent.state.isMobile? mobileStyles.appBar : styles.appBar;
    let dialogTitleClass   = this.parent.parent.state.isMobile? mobileStyles.dialogTitle : styles.dialogTitle;
    let dialogCloseBtnClass   = this.parent.parent.state.isMobile? mobileStyles.dialogCloseBtn : styles.dialogCloseBtn;

    let closeBtnStyle = {
      left: (this.state.pageWidth - this.state.dialogCloseBtnWidth - 10)+'px',
      lineHeight: this.state.dialogAppbaHeight+'px'
    }

    let dialogMainEle =   <>
                            <CircularProgress color="secondary" />
                            <span className={this.parent.parent.state.isMobile? mobileStyles.prograssSpan : styles.prograssSpan}>Gerenating Image...</span>
                          </>

    if(this.state.exportSrc != '')
    {
      dialogMainEle =   <div className={this.parent.parent.state.isMobile? mobileStyles.dialogImageWrapper : styles.dialogImageWrapper}>
                          {<img src={this.state.exportSrc} 
                            className={this.parent.parent.state.isMobile? mobileStyles.dialogImage : styles.dialogImage} 
                          />}
                        </div>
    }

    let dialogEle = <Dialog fullScreen open={this.state.dialogOpen} onClose={this.dialogClose} TransitionComponent={this.getDialogTransition}>
                      <AppBar ref={this.dialogAppbarRef} className={dialogAppbarClass} style={{backgroundColor: '#5f00d2'}}>
                        <Toolbar>
                          <IconButton edge="start" color="inherit" onClick={this.dialogClose} aria-label="close">
                            <CloseIcon />
                          </IconButton>
                          <Typography variant="h6" className={dialogTitleClass}>
                            Export
                          </Typography>
                          <div className={dialogCloseBtnClass} style={closeBtnStyle} ref={this.dialogCloseBtnRef}>
                          <Button color="inherit" onClick={this.dialogClose} >
                            save
                          </Button>
                          </div>
                        </Toolbar>
                      </AppBar>
                      <div className={this.parent.parent.state.isMobile? mobileStyles.dialogContent : styles.dialogContent}>
                      <div className={this.parent.parent.state.isMobile? mobileStyles.dialogMain : styles.dialogMain}>
                          {dialogMainEle}
                      </div>
                      <div className={this.parent.parent.state.isMobile? mobileStyles.dialogBottom : styles.dialogBottom}>
                        <IconButton color="primary" component="span" onClick={this.bottomDownloadBtnClick}>
                          <GetAppIcon className={this.parent.parent.state.isMobile? mobileStyles.dialogBottomIcon : styles.dialogBottomIcon} fontSize="large" />
                        </IconButton>
                      </div>
                      </div>
                    </Dialog>


    return  <div className={containerClass}>
              {dialogEle}
              <ImageCompiler parent={this} ref={this.compilerRef} rawImgSrc={''} />
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