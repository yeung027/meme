import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/editImg/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/editImg/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
import Snackbar from '@material-ui/core/Snackbar';
import Grow from '@material-ui/core/Grow';
import MuiAlert from '@material-ui/lab/Alert';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

import ImageIcon from '@material-ui/icons/Image';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

type MyProps = {
    parent:any
};

type MyStates = {
  snackOpen: boolean
  snackType: any
  snackMsg: string
  desktopZoomSliderValue: any
};

interface EditImgUI {
parent: any
}

class EditImgUI extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      snackOpen: false,
      snackType: 'error',
      snackMsg: '',
      desktopZoomSliderValue: 0
    }//END state
    
    this.snackOnClick             = this.snackOnClick.bind(this);
    this.getSnackTransition       = this.getSnackTransition.bind(this);
    this.snackOnClose             = this.snackOnClose.bind(this);
    this.nextBtnOnclick           = this.nextBtnOnclick.bind(this);
    this.skipBtnOnclick           = this.skipBtnOnclick.bind(this);
    this.desktopZoomSlider        = this.desktopZoomSlider.bind(this);
    this.desktopZoomSliderOnChange        = this.desktopZoomSliderOnChange.bind(this);
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

  skipBtnOnclick()
  {
    //console.log(this.parent);

    this.parent.stageChange(this.parent.stage.EXPORT);
    this.parent.parent.stepsRef.current.stepChange(this.parent.parent.stepsRef.current.step.EXPORT);

  }//END skipBtnOnclick

  nextBtnOnclick()
  {
    //console.log(this.parent);

    this.parent.stageChange(this.parent.stage.EXPORT);
    this.parent.parent.stepsRef.current.stepChange(this.parent.parent.stepsRef.current.step.EXPORT);

  }//END nextBtnOnclick

  desktopZoomSliderOnChange(e:any , v:any)
  {
    this.setState({ 
      desktopZoomSliderValue: v
    });
  }//END desktopZoomSliderOnChange

  desktopZoomSlider()
  {
    return  <div className={styles.zoomSliderWrapper}>
              <div className={styles.zoomSliderLabel}>
                Zoom
              </div>
              <Grid container spacing={2} className={styles.zoomSliderContainer}>
                <Grid item>
                  <ZoomOutIcon />
                </Grid>
                <Grid item xs>
                  <Slider 
                    value={this.state.desktopZoomSliderValue} 
                    onChange={this.desktopZoomSliderOnChange} 
                    aria-labelledby="continuous-slider" 
                  />
                </Grid>
                <Grid item>
                  <ZoomInIcon />
                </Grid>
              </Grid>
            </div>
  }//END desktopZoomSlider


  render() 
  {
    let containerClass    = this.parent.parent.state.isMobile? mobileStyles.container : styles.container;
    
    let buttonClass       = this.parent.parent.state.isMobile? mobileStyles.btn : styles.btn;
    let buttonActiveClass = [buttonClass, this.parent.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

    let nextBtnClass       = utilStyles.purple_iconRight_btn_l;

    //console.log(this.parent.parent.state.isMobile);

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
                  <span>Edit Image</span>
                </div>
                <div className={this.parent.parent.state.isMobile? mobileStyles.header_r : styles.header_r}>
                  <span className={this.parent.parent.state.isMobile? mobileStyles.textBtn : styles.textBtn} onClick={this.skipBtnOnclick}>skip</span>
                </div>
              </div>
              <div className={this.parent.parent.state.isMobile? mobileStyles.main : styles.main}>
                <div className={this.parent.parent.state.isMobile? mobileStyles.mainInner : styles.mainInner}>
                  {!this.parent.parent.state.isMobile &&
                    this.desktopZoomSlider()
                  }
                  <div className={buttonClass}>
                    <ImageIcon className={this.parent.parent.state.isMobile? mobileStyles.icon : styles.icon} />
                    <span>Image</span>
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

}//END class EditImgUI


export default EditImgUI;