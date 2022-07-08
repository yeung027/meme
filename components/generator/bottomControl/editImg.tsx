import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/editImg/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/editImg/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';

type MyProps = {
  parent:any
};

type MyStates = {
  desktopZoomSliderValue: number
  desktopRotateSliderValue:number
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
      desktopZoomSliderValue: 50,
      desktopRotateSliderValue: 0
    }//END state

    this.componentsGetter         = this.componentsGetter.bind(this);
    this.nextBtnOnclick           = this.nextBtnOnclick.bind(this);
    this.skipBtnOnclick           = this.skipBtnOnclick.bind(this);
    this.addTextBtnOnclick        = this.addTextBtnOnclick.bind(this);
    this.textBtnOnclick           = this.textBtnOnclick.bind(this);
    this.desktopZoomSlider        = this.desktopZoomSlider.bind(this);
    this.desktopZoomSliderOnChange        = this.desktopZoomSliderOnChange.bind(this);
    this.desktopRotateSlider              = this.desktopRotateSlider.bind(this);
    this.desktopRotateSliderOnChange      = this.desktopRotateSliderOnChange.bind(this);
    
  }//END constructor

  componentsGetter()
  {
    return this.parent.parent.componentsGetterRef.current;
  }//END componentsGetter


  addTextBtnOnclick()
  {
    //console.log(this.componentsGetter().imageText());
    this.componentsGetter().imageText().textBtnOnclick();
  }//END addTextBtnOnclick

  textBtnOnclick()
  {
    this.parent.stageChange(this.parent.stage.EDITIMG);
    this.componentsGetter().steps().stepChange(this.componentsGetter().steps().step.EDITIMG);
    this.componentsGetter().bottomControlPanel().stageChange(this.componentsGetter().bottomControlPanel().stage.EDITTEXT);
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

  desktopRotateSlider()
  {
    return  <div className={styles.zoomSliderWrapper}>
              <div className={styles.zoomSliderLabel}>
                Rotate
              </div>
              <Grid container spacing={2} className={styles.zoomSliderContainer}>
                <Grid item>
                <i className={'bx bx-zoom-out'} />
                </Grid>
                <Grid item xs>
                  <Slider 
                    value={this.state.desktopRotateSliderValue} 
                    onChange={this.desktopRotateSliderOnChange} 
                    aria-labelledby="continuous-slider" 
                  />
                </Grid>
                <Grid item>
                <i className={'bx bx-zoom-in'} />
                </Grid>
              </Grid>
            </div>
  }//END desktopRotateSlider

  desktopRotateSliderOnChange(e:any , v:any)
  {
    let degree:number = (v/100) * 360;
    //console.log('degree: '+degree);
    this.setState({ 
      desktopRotateSliderValue: v
    });

    if(!this.componentsGetter().canvas()) return;
    let images  = this.componentsGetter().canvas().state.images;
    if(!images || !Array.isArray(images) || images.length<=0 ) return;

    //console.log(document.querySelector('#img-tappable-'+0));
    e.rotation = degree;
    e.imgObj = images[0];
    this.componentsGetter().touchController().rotateByPinchMove(e, 'img-tappable-'+0, false);


  }//END desktopRotateSlider

  render() 
  {
    let containerClass    = this.parent.parent.state.isMobile? mobileStyles.container : styles.container;
    
    let buttonClass       = this.parent.parent.state.isMobile? mobileStyles.btn : styles.btn;
    let buttonActiveClass = [buttonClass, this.parent.parent.state.isMobile? mobileStyles.active : styles.active].join(' ');

    let nextBtnClass       = [utilStyles.purple_iconRight_btn_l, this.parent.parent.state.isMobile? mobileStyles.nextBtn : styles.nextBtn].join(' ');


    return  <div className={containerClass} style={{display: this.parent.state.currentUI === this.parent.stage.EDITIMG ? 'flex' : 'none'}}>
              <div className={this.parent.parent.state.isMobile? mobileStyles.header : styles.header}>
                <div className={this.parent.parent.state.isMobile? mobileStyles.title : styles.title}>
                  <i className={'bx bxs-bell'} />
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
                  {!this.parent.parent.state.isMobile &&
                    this.desktopRotateSlider()
                  }
                  <div className={buttonClass}>
                  <i className={'bx bx-image'} />
                    <span>Image</span>
                  </div>
                  <div className={buttonActiveClass} onClick={this.addTextBtnOnclick}>
                  <i className={'bx bx-list-plus'} />
                    <span>Add Text</span>
                  </div>

                  <div className={buttonActiveClass} onClick={this.textBtnOnclick}>
                  <i className={'bx bx-italic'} />
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