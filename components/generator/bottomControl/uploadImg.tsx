import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/uploadImg/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/uploadImg/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
import ImageUploading from 'react-images-uploading';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton/IconButton';

type MyProps = {
    parent:any
};

type MyStates = {
  uploadImg: any
  fileSelected: boolean
  snackOpen: boolean
  snackType: any
  snackMsg: string
};

interface ButtonControlUploadGUI {
parent: any
}

class ButtonControlUploadGUI extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      uploadImg: null,
      fileSelected: false,
      snackOpen: false,
      snackType: 'error',
      snackMsg: '',
    }//END state
    
    this.componentsGetter        = this.componentsGetter.bind(this);
    this.voidImgUpload            = this.voidImgUpload.bind(this);
    this.snackOnClick             = this.snackOnClick.bind(this);
    this.getSnackTransition       = this.getSnackTransition.bind(this);
    this.snackOnClose             = this.snackOnClose.bind(this);
    this.uploadOnChange           = this.uploadOnChange.bind(this);
    this.uploadOnChangeCallback   = this.uploadOnChangeCallback.bind(this);
  }//END constructor

  componentsGetter()
  {
    return this.parent.parent.componentsGetterRef.current;
  }//END componentsGetter

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

  voidImgUpload()
  {

  }

  componentDidMount() 
  {
    let img_file: HTMLElement = document.querySelector("#img_file") as HTMLElement;

    if(img_file)
    {
      try
      {
        img_file.click();
      }
      catch (error)
      {

      }
      //console.log('yoyoyoyoyo~');

    }
    
  }//END componentDidMount

  async uploadOnChange(imageList:Array<any>, addUpdateIndex:any)
  {
    //console.log(this.getCanvasDrawer());
    //console.log(imageList.length);
    if(this.componentsGetter().imageEditor() && imageList && imageList.length>0 && imageList[0].data_url && imageList[0].data_url != null)
    {
      try
      {
        let imageEditor = this.componentsGetter().imageEditor();
        if(!imageEditor) throw ('5');
        await imageEditor.addUploadedImage(imageList[0], this.uploadOnChangeCallback);
        //console.log(imageEditor.addB64Image);
      }
      catch(error)
      {
        console.log(error);
        this.setState({ 
          snackOpen: true,
          snackType: 'error',
          snackMsg: 'Something went wrong, please try again later, sorry for the inconvenience.'
        });
      }
      this.setState({ 
        fileSelected: true
       });
    }
  }//END uploadOnChange

  uploadOnChangeCallback(success:boolean)
  {
    //console.log(this.componentsGetter().steps().stepChange);
    this.parent.stageChange(this.parent.stage.EDITIMG);
    this.componentsGetter().steps().stepChange(this.componentsGetter().steps().step.EDITIMG);
  }//END uploadOnChangeCallback

  render() 
  {
    let containerClass    = this.parent.parent.state.isMobile? mobileStyles.container : styles.container;
    let uploadBtnIconEle  = <i className={'bx bx-plus'} />;
    let uploadBtnLabel  = 'Upload';
    let uploadBtnClass  = utilStyles.iconPurpleBtn_L;
    if(this.state.fileSelected)
    {
      uploadBtnIconEle  = <CircularProgress size={20} className={utilStyles.progressIcon} />
      uploadBtnLabel    = 'Processing...'
      uploadBtnClass  = [uploadBtnClass, utilStyles.blink].join(' ');
    }

    return  <div className={containerClass}>
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
                className={this.parent.parent.state.isMobile? mobileStyles.snack : styles.snack}
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
                className={this.parent.parent.state.isMobile? mobileStyles.snack : styles.snack}
              >
                <MuiAlert 
                  elevation={6} 
                  variant="filled"
                  severity={this.state.snackType}
                >
                  {this.state.snackMsg}
                </MuiAlert>
              </Snackbar> */}

              <div className={this.parent.parent.state.isMobile? mobileStyles.header : styles.header}>
                <div className={this.parent.parent.state.isMobile? mobileStyles.title : styles.title}>
                  <i className={'bx bxs-bell'} />
                  <span>Add image & merge</span>
                </div>
                <div className={this.parent.parent.state.isMobile? mobileStyles.header_r : styles.header_r}>
                  <span className={this.parent.parent.state.isMobile? mobileStyles.textBtn : styles.textBtn}>skip</span>
                </div>
              </div>
              <div className={this.parent.parent.state.isMobile? mobileStyles.main : styles.main}>

                <ImageUploading
                  /*multiple*/
                  value={this.state.uploadImg}
                  onChange={this.uploadOnChange}
                  maxNumber={1}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
          
                  <div className={uploadBtnClass} 
                    onClick={this.parent.state.isAnimation || this.state.fileSelected ? this.voidImgUpload : onImageUpload}
                  >
                    {uploadBtnIconEle}
                    <span className={utilStyles.span}>{uploadBtnLabel}</span>
                  </div>
                  )}
                </ImageUploading>
              </div>
            </div>

  }

}//END class ButtonControlUploadGUI


export default ButtonControlUploadGUI;