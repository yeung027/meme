import React,{Component} from 'react';
import styles from '../../styles/generator/exportDialog/desktop.module.css'
import mobileStyles from '../../styles/generator/exportDialog/mobile.module.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
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
  rawImageSize:number[]
  imageWrapperWidth: number 
  imageWrapperHeight: number
  imageWrapperStrWidth: string 
  imageWrapperStrHeight: string
};

interface ExportDialog {
  parent: any
  dialogRef: any
  closeBtnRef: any
  appbarRef: any
  imageWrapperRef:any
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
      exportSrc: '',
      rawImageSize:[],
      imageWrapperWidth: 0 ,
      imageWrapperHeight: 0,
      imageWrapperStrWidth: '0',
      imageWrapperStrHeight: '0'
    }//END state


    this.imageWrapperRef = React.createRef();
    this.closeBtnRef = React.createRef();
    this.appbarRef = React.createRef();
    this.dialogRef = React.createRef();

    this.componentsGetter                     = this.componentsGetter.bind(this);
    this.getTransition                        = this.getTransition.bind(this);
    this.dialogClose                          = this.dialogClose.bind(this);
    this.updatePageComputedStyle              = this.updatePageComputedStyle.bind(this);
    this.updateCloseBtnComputedStyle          = this.updateCloseBtnComputedStyle.bind(this);
    this.updateAppBarComputedStyle            = this.updateAppBarComputedStyle.bind(this);
    this.exportCallback                       = this.exportCallback.bind(this);
    this.export                               = this.export.bind(this);
    this.bottomDownloadBtnClick               = this.bottomDownloadBtnClick.bind(this);
    this.getRawImageSize                      = this.getRawImageSize.bind(this);
    this.updateImageWrapperComputedStyle      = this.updateImageWrapperComputedStyle.bind(this);
    this.updateDomSize                        = this.updateDomSize.bind(this);
    
  }//END constructor

  async getRawImageSize()
  {
    let that = this;
    if(!this.componentsGetter() || !this.componentsGetter().compiler()) return setTimeout(
      function() {
        
       that.getRawImageSize();

      }
      .bind(this),
      70
    );

    let rawImgSize:[] = await that.componentsGetter().compiler().getRawImgSize();
    this.setState({ 
      rawImageSize : rawImgSize
    }); 
    //console.log(await that.componentsGetter().compiler().getRawImgSize())
  }

  componentsGetter()
  {
    return this.parent.componentsGetterRef.current;
  }//END componentsGetter

  async bottomDownloadBtnClick()
  {
    //console.log(this.parent.exportDialogRef.current.state.exportSrc);
    //console.log(this.parent.state.isMobile)
    
    if (navigator.share) {
      await navigator.share({
        files: [this.state.exportFile]
      })
        .then(() => console.log('成功'))
        .catch((error) => console.log('發生錯誤', error));
    }
    else if(!this.parent.state.isMobile)
    {
      var element = document.createElement("a");
      //console.log(this.state.exportSrc);
       element.href = this.state.exportSrc;
       element.download = "image.png";
       element.click();
    }

  }//END bottomDownloadBtnClick

  export()
  {
    let self = this;
    this.setState({ 
      open: true,
    },function(){
      self.updateDomSize();
    });
    
    //console.log(this.componentsGetter().compiler());
    this.componentsGetter().compiler().getOutPut(this.exportCallback);
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
      exportFile: null,
      exportSrc: ''
    });
  }//END dialogClose

  updatePageComputedStyle()
  {
    if(!window) return;
     let page:any = this.parent.rootRef.current;
     
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
    if((!this.closeBtnRef || !this.closeBtnRef.current) && this.state.open)
    {
      //console.log('ooooooo');
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

    if(!this.closeBtnRef.current) return;

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
    this.updateDomSize();
  }

  updateDomSize() 
  {
    this.updatePageComputedStyle();
    this.updateAppBarComputedStyle();
    this.updateCloseBtnComputedStyle();
    this.parent.exportDialogDidMountCallback();
    this.updateImageWrapperComputedStyle();
    this.getRawImageSize();
  }

  updateImageWrapperComputedStyle()
  {
    if(!window) return;
    let self = this;
    let imageWrapper:any = this.imageWrapperRef.current;
    if(!imageWrapper) return setTimeout(
      function() {
        self.updateImageWrapperComputedStyle();
      }
      .bind(this),
      70
    );

    let page:any = this.parent.rootRef.current;
     
    if(!page) return;
    let pagecompStyles = window.getComputedStyle(page);
    let pageRect        = page.getBoundingClientRect();

    let compStyles  = window.getComputedStyle(imageWrapper);
    let w:number, h:number;
    let wStr:string ='0px', hStr:string = '0px';
    w = parseInt(compStyles.width);
    h = parseInt(compStyles.height);

    if(this.state.rawImageSize[0] > this.state.rawImageSize[1])
    {
      let scale:number = this.state.rawImageSize[1] / this.state.rawImageSize[0];
      wStr= this.parent.isMobile ? (pageRect.height*0.8)+'px' : (pageRect.width*0.8)+'px';
      hStr = scale*pageRect.width+'px';
      //console.log('wStr: '+wStr);
      //console.log('hStr: '+hStr); 
    }
    else
    {
      let scale:number = this.state.rawImageSize[0] / this.state.rawImageSize[1];
      hStr= this.parent.isMobile ? (pageRect.height*0.8)+'px' : (pageRect.height*0.8)+'px';
      wStr = scale*pageRect.height+'px';
      //console.log('wStr: '+wStr);
      //console.log('hStr: '+hStr); 
    }

    this.setState({ 
      imageWrapperWidth: w,
      imageWrapperHeight: h,
      imageWrapperStrWidth: wStr,
      imageWrapperStrHeight: hStr
    });  
  }//END updateImageWrapperComputedStyle

  render() 
  {
    let appbarClass   = this.parent.state.isMobile? mobileStyles.appBar : styles.appBar;
    let titleClass   = this.parent.state.isMobile? mobileStyles.title : styles.title;
    let closeBtnClass   = this.parent.state.isMobile? mobileStyles.closeBtn : styles.closeBtn;

    let closeBtnStyle:any = {
      left: (this.state.pageWidth - this.state.closeBtnWidth - 10)+'px',
      lineHeight: this.state.appbarHeight+'px'
    }
    if(this.parent.canvasRef.current && this.parent.canvasRef.current.touchControllerRef.current)
    {
      this.parent.canvasRef.current.touchControllerRef.current.debugLog('this.state.pageWidth'+this.state.pageWidth);
      this.parent.canvasRef.current.touchControllerRef.current.debugLog('this.state.closeBtnWidth'+this.state.closeBtnWidth);
    }
    if(!this.parent.state.isMobile)
    {
      closeBtnStyle.left = (this.state.pageWidth - this.state.closeBtnWidth - 70)+'px';
    }

    let dialogMainEle =   <div className={this.parent.state.isMobile? '' : styles.imageProgressWrapper}>
                            <CircularProgress color="secondary" />
                            <span className={this.parent.state.isMobile? mobileStyles.prograssSpan : styles.prograssSpan}>Gerenating Image...</span>
                          </div>

    if(this.state.exportSrc != '')
    {
      let wScale:number = 1;
      let wStyle:string = '';
      let imageWrapperstyle:any = {
        width: this.state.imageWrapperStrWidth,
        height: this.state.imageWrapperStrHeight,
      };
     

      
      
      //console.log('wStyle: '+wStyle);
      dialogMainEle =   <div 
                          className={this.parent.state.isMobile? mobileStyles.imageWrapper : styles.imageWrapper}
                          id="exportDialogImageWrapper"
                          ref={this.imageWrapperRef}
                          style={imageWrapperstyle}
                        >
                          {<img src={this.state.exportSrc!} 
                            className={this.parent.state.isMobile? mobileStyles.image : styles.image} 
                          />}
                        </div>
    }

    return <Dialog fullScreen open={this.state.open} onClose={this.dialogClose} TransitionComponent={this.getTransition}>
            <AppBar ref={this.appbarRef} className={appbarClass} style={{backgroundColor: '#5f00d2'}}>
              <Toolbar>
                <IconButton edge="start" color="inherit" onClick={this.dialogClose} aria-label="close">
                  <i className={'bx bx-x'} />
                </IconButton>
                <Typography variant="h6" className={titleClass}>
                  Export
                </Typography>
                <div className={closeBtnClass} style={closeBtnStyle} ref={this.closeBtnRef}>
                <Button color="inherit" onClick={this.dialogClose} >
                  Close
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
              <i className={'bx bxs-download'} />
              </IconButton>
            </div>
            </div>
          </Dialog>;
  }

}//END class ExportDialog


export default ExportDialog;