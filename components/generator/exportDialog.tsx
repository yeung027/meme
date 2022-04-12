import React,{Component} from 'react';
import styles from '../../styles/generator/exportDialog/desktop.module.css'
import mobileStyles from '../../styles/generator/exportDialog/mobile.module.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';

type MyProps = {
    parent:any
};

type MyStates = {
  pageWidth: number 
  pageHeight: number
  open: boolean
  closeBtnWidth: number 
  closeBtnHeight: number
  appbarWidth: number 
  appbarHeight: number
  exportFile: any
  exportSrc: string
};

interface ExportDialog {
  parent: any
  dialogRef: any
  closeBtnRef: any
  appbarRef: any
}

class ExportDialog extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      open: false,
      pageWidth: 0 ,
      pageHeight: 0,
      closeBtnWidth: 0,
      closeBtnHeight: 0,
      appbarWidth: 0,  
      appbarHeight: 0,
      exportFile: null,
      exportSrc: ''
    }//END state
    
    this.getTransition      = this.getTransition.bind(this);
    this.dialogClose              = this.dialogClose.bind(this);
    this.updatePageComputedStyle            = this.updatePageComputedStyle.bind(this);
    this.updateCloseBtnComputedStyle  = this.updateCloseBtnComputedStyle.bind(this);
    this.updateAppBarComputedStyle    = this.updateAppBarComputedStyle.bind(this);
    this.exportCallback           = this.exportCallback.bind(this);
    this.export           = this.export.bind(this);
    this.bottomDownloadBtnClick           = this.bottomDownloadBtnClick.bind(this);
  }//END constructor

  async bottomDownloadBtnClick()
  {
    //console.log(this.parent.exportDialogRef.current.state.exportSrc);
    if (navigator.share) {
      await navigator.share({
        title: 'Meme',
        files: [this.state.exportFile]
      })
        .then(() => console.log('成功'))
        .catch((error) => console.log('發生錯誤', error));
    }

  }//END bottomDownloadBtnClick

  export()
  {
    this.setState({ 
      open: true,
    });
    //console.log(this.parent.cpuRef.current.compilerRef.current);
    this.parent.cpuRef.current.compilerRef.current.getOutPut(this.exportCallback);
  }//END export

  async exportCallback(b64: any, file: any)
  {
    //console.log('i am callback');
    //console.log(output);
    this.setState({ 
      exportSrc: b64,
      exportFile: file
    });  
    //const link = document.createElement("a");
    //this.aRef.current.href = output;
    //this.aRef.current.download = 'okok.png';


  }//END exportCallback

  getTransition(props:any) 
  {
    return <Slide direction="up" ref={this.dialogRef} {...props} />;
  }//END getTransition

  dialogClose()
  {
    this.setState({ 
      open: false,
    });
  }//END dialogClose

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

  updateCloseBtnComputedStyle()
  {
    if(!this.closeBtnRef || !this.closeBtnRef.current)
    {
      var self = this;
      setTimeout(
        function() {
          self.updateCloseBtnComputedStyle();
        }
        .bind(this),
        200
      );
      return;
    }

    

    let style = window.getComputedStyle(this.closeBtnRef.current);
    let w:number, h:number;
    w = parseInt(style.width);
    h = parseInt(style.height);
    if (isNaN(w)) w = 0;
    if (isNaN(h)) h = 0;
    this.setState({ 
      closeBtnWidth: w,
      closeBtnHeight: h
    });  

    //console.log('close w h : '+ w + ', ' + h); 

  }//END updateCloseBtnComputedStyle

  updateAppBarComputedStyle()
  {
    if(!this.appbarRef || !this.appbarRef.current)
    {
      var self = this;
      setTimeout(
        function() {
          self.updateAppBarComputedStyle();
        }
        .bind(this),
        200
      );
      return;
    }

    let style = window.getComputedStyle(this.appbarRef.current);
    let w:number, h:number;
    w = parseInt(style.width);
    h = parseInt(style.height);
    if (isNaN(w)) w = 0;
    if (isNaN(h)) h = 0;
    this.setState({ 
      appbarWidth: w,
      appbarHeight: h
    });  

    //console.log('w h : '+ w + ', ' + h);

  }//END updateAppBarComputedStyle

  componentDidMount() 
  {
    this.updatePageComputedStyle();
    this.updateAppBarComputedStyle();
    this.updateCloseBtnComputedStyle();
  }

  render() 
  {
    let appbarClass   = this.parent.state.isMobile? mobileStyles.appBar : styles.appBar;
    let titleClass   = this.parent.state.isMobile? mobileStyles.title : styles.title;
    let closeBtnClass   = this.parent.state.isMobile? mobileStyles.closeBtn : styles.closeBtn;

    let closeBtnStyle = {
      left: (this.state.pageWidth - this.state.closeBtnWidth - 10)+'px',
      lineHeight: this.state.appbarHeight+'px'
    }

    let dialogMainEle =   <>
                            <CircularProgress color="secondary" />
                            <span className={this.parent.state.isMobile? mobileStyles.prograssSpan : styles.prograssSpan}>Gerenating Image...</span>
                          </>

    if(this.state.exportSrc != '')
    {
      dialogMainEle =   <div className={this.parent.state.isMobile? mobileStyles.imageWrapper : styles.imageWrapper}>
                          {<img src={this.state.exportSrc} 
                            className={this.parent.state.isMobile? mobileStyles.image : styles.image} 
                          />}
                        </div>
    }

    return <Dialog fullScreen open={this.state.open} onClose={this.dialogClose} TransitionComponent={this.getTransition}>
            <AppBar ref={this.appbarRef} className={appbarClass} style={{backgroundColor: '#5f00d2'}}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={this.dialogClose} aria-label="close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={titleClass}>
                  Export
                </Typography>
                <div className={closeBtnClass} style={closeBtnStyle} ref={this.closeBtnRef}>
                <Button color="inherit" onClick={this.dialogClose} >
                  save
                </Button>
                </div>
              </Toolbar>
            </AppBar>
            <div className={this.parent.state.isMobile? mobileStyles.content : styles.content}>
            <div className={this.parent.state.isMobile? mobileStyles.main : styles.main}>
                {dialogMainEle}
            </div>
            <div className={this.parent.state.isMobile? mobileStyles.bottom : styles.bottom}>
              <IconButton color="primary" component="span" onClick={this.bottomDownloadBtnClick}>
                <GetAppIcon className={this.parent.state.isMobile? mobileStyles.bottomIcon : styles.bottomIcon} fontSize="large" />
              </IconButton>
            </div>
            </div>
          </Dialog>;
  }

}//END class ExportDialog


export default ExportDialog;