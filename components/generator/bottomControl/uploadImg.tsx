import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/uploadImg/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/uploadImg/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import AddIcon from '@material-ui/icons/Add';
import ImageUploading from 'react-images-uploading';
import CircularProgress from '@material-ui/core/CircularProgress';

type MyProps = {
    parent:any
};

type MyStates = {
  uploadImg: any,
  fileSelected: boolean
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
      fileSelected: false
    }//END state
    
    this.getCanvasDrawer  = this.getCanvasDrawer.bind(this);
    this.voidImgUpload    = this.voidImgUpload.bind(this);
  }//END constructor

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
    this.uploadOnChange = this.uploadOnChange.bind(this);
  }//END componentDidMount

  getCanvasDrawer()
  {
    if(!this.parent) return null;
    if(!this.parent.parent) return null;
    if(!this.parent.parent.cpuRef || !this.parent.parent.cpuRef.current) 
      return null;
    if(!this.parent.parent.cpuRef.current.canvasDrawerRef 
      || !this.parent.parent.cpuRef.current.canvasDrawerRef.current)
      return null;
    return this.parent.parent.cpuRef.current.canvasDrawerRef.current
  }//END getCanvasDrawer

  uploadOnChange(imageList:Array<any>, addUpdateIndex:any)
  {
    //console.log(this.getCanvasDrawer());
    //console.log(imageList.length);
    if(this.getCanvasDrawer() && imageList && imageList.length>0)
      this.getCanvasDrawer().mergeImg(imageList[0]);
    this.setState({ 
      fileSelected: true
     });
  }//END uploadOnChange

  render() 
  {
    let containerClass    = this.parent.parent.state.isMobile? mobileStyles.container : styles.container;
    let uploadBtnIconEle  = <AddIcon className={utilStyles.icon} />
    let uploadBtnLabel  = 'Upload';
    let uploadBtnClass  = utilStyles.iconPurpleBtn_L;
    if(this.state.fileSelected)
    {
      uploadBtnIconEle  = <CircularProgress size={20} className={utilStyles.progressIcon} />
      uploadBtnLabel    = 'Processing...'
      uploadBtnClass  = [uploadBtnClass, utilStyles.blink].join(' ');
    }

    return  <div className={containerClass}>
              <div className={this.parent.parent.state.isMobile? mobileStyles.header : styles.header}>
                <div className={this.parent.parent.state.isMobile? mobileStyles.title : styles.title}>
                  <NotificationImportantIcon className={this.parent.parent.state.isMobile? mobileStyles.titleIcon : styles.titleIcon} />
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