import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/editImg/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/editImg/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
import Snackbar from '@material-ui/core/Snackbar';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import IconButton from '@material-ui/core/IconButton';

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
      snackMsg: 'dsdsa',
      desktopZoomSliderValue: 50
    }//END state

    this.componentsGetter        = this.componentsGetter.bind(this);
    this.snackOnClick             = this.snackOnClick.bind(this);
    this.getSnackTransition       = this.getSnackTransition.bind(this);
    this.snackOnClose             = this.snackOnClose.bind(this);
    this.nextBtnOnclick           = this.nextBtnOnclick.bind(this);
    this.skipBtnOnclick           = this.skipBtnOnclick.bind(this);
    this.textBtnOnclick           = this.textBtnOnclick.bind(this);
    this.desktopZoomSlider        = this.desktopZoomSlider.bind(this);
    this.desktopZoomSliderOnChange        = this.desktopZoomSliderOnChange.bind(this);
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

  textBtnOnclick()
  {
    //console.log(this.componentsGetter().imageText());
    this.componentsGetter().imageText().textBtnOnclick();


  }//END textBtnOnclick

  skipBtnOnclick()
  {
    //console.log(this.parent);

    this.parent.stageChange(this.parent.stage.EXPORT);
    this.componentsGetter().steps().stepChange(this.componentsGetter().steps().step.EXPORT);

  }//END skipBtnOnclick

  nextBtnOnclick()
  {
    //console.log(this.parent);
    this.parent.stageChange(this.parent.stage.EXPORT);
    this.componentsGetter().steps().stepChange(this.componentsGetter().steps().step.EXPORT);

  }//END nextBtnOnclick

  desktopZoomSliderOnChange(e:any , v:any)
  {
    this.setState({ 
      desktopZoomSliderValue: v
    });

    if(!this.componentsGetter().canvas()) return;
    let images  = this.componentsGetter().canvas().state.images;
    if(!images || !Array.isArray(images) || images.length<=0 ) return;

    //console.log(document.querySelector('#img-tappable-'+0));
    e.zoom = v;
    e.imgObj = images[0];
    this.componentsGetter().touchController().zoomByPinchMove(e, 'img-tappable-'+0, false);


  }//END desktopZoomSliderOnChange

  desktopZoomSlider()
  {
    return  <div className={styles.zoomSliderWrapper}>
              <div className={styles.zoomSliderLabel}>
                Zoom
              </div>
              <Grid container spacing={2} className={styles.zoomSliderContainer}>
                <Grid item>
                <i className={'bx bx-zoom-out'} />
                </Grid>
                <Grid item xs>
                  <Slider 
                    value={this.state.desktopZoomSliderValue} 
                    onChange={this.desktopZoomSliderOnChange} 
                    aria-labelledby="continuous-slider" 
                  />
                </Grid>
                <Grid item>
                <i className={'bx bx-zoom-in'} />
                </Grid>
              </Grid>
            </div>
  }//END desktopZoomSlider


  render() 
  {
    let containerClass    = this.componentsGetter().isMobile()? mobileStyles.container : styles.container;
    
    let buttonClass       = this.componentsGetter().isMobile()? mobileStyles.btn : styles.btn;
    let buttonActiveClass = [buttonClass, this.componentsGetter().isMobile()? mobileStyles.active : styles.active].join(' ');

    let nextBtnClass       = [utilStyles.purple_iconRight_btn_l, this.componentsGetter().isMobile()? mobileStyles.nextBtn : styles.nextBtn].join(' ');

    //console.log(this.componentsGetter().isMobile());

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
                className={this.componentsGetter().isMobile()? mobileStyles.snack : styles.snack}
                action={
                  <React.Fragment>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={this.snackOnClose}>
                      <i style={{color:'#fff'}} className={'bx bx-x'} />
                    </IconButton>
                  </React.Fragment>
                }
              />
              {/* <Snackbar 
                open={true || this.state.snackOpen} 
                autoHideDuration={6000} 
                onClose={this.snackOnClose}
                onClick={this.snackOnClick}
                TransitionComponent={this.getSnackTransition}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
               }}
                className={this.componentsGetter().isMobile()? mobileStyles.snack : styles.snack}
              >
                
              </Snackbar> */}

              <div className={this.componentsGetter().isMobile()? mobileStyles.header : styles.header}>
                <div className={this.componentsGetter().isMobile()? mobileStyles.title : styles.title}>
                  <i className={'bx bxs-bell'} />
                  <span>Edit Image</span>
                </div>
                <div className={this.componentsGetter().isMobile()? mobileStyles.header_r : styles.header_r}>
                  <span className={this.componentsGetter().isMobile()? mobileStyles.textBtn : styles.textBtn} onClick={this.skipBtnOnclick}>skip</span>
                </div>
              </div>
              <div className={this.componentsGetter().isMobile()? mobileStyles.main : styles.main}>
                <div className={this.componentsGetter().isMobile()? mobileStyles.mainInner : styles.mainInner}>
                  {!this.componentsGetter().isMobile() &&
                    this.desktopZoomSlider()
                  }
                  <div className={buttonClass}>
                  <i className={'bx bx-image'} />
                    <span>Image</span>
                  </div>
                  <div className={buttonActiveClass} onClick={this.textBtnOnclick}>
                  <i className={'bx bx-text'} />
                    <span>Text</span>
                  </div>

                  <div className={nextBtnClass} onClick={this.nextBtnOnclick}>
                    <span>Next</span>
                    {/* <ChevronRightIcon className={utilStyles.icon} />   */}
                    <i className={'bx bx-chevron-right'} />
                  </div>
                </div>
              </div>
            </div>

  }

}//END class EditImgUI


export default EditImgUI;