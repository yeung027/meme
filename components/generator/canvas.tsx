import React,{Component} from 'react';
import styles from '../../styles/generator/canvas/desktop.module.css'
import mobileStyles from '../../styles/generator/canvas/mobile.module.css'
import TouchController from './editor/touchController';


type MyProps = {
    parent:any
};

type MyStates = {
  images: any[]
  canvasWidth: number
  canvasHeight: number
};

interface Canvas  {
  parent: any
  touchController:TouchController
}

class Canvas extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.touchController = new TouchController({parent:this});

    this.state = {
      images: [],
      canvasWidth: 0,
      canvasHeight: 0
    }//END state
    
    this.updateCanvasComputedStyle                  = this.updateCanvasComputedStyle.bind(this);
  }//END constructor

  componentDidMount() 
  {
    this.updateCanvasComputedStyle();
  }//END componentDidMount



  updateCanvasComputedStyle()
  {
    if(!window) return;
    let canvas:any = document.querySelector('#canvas');
    if(!canvas) return;
    let canvascompStyles = window.getComputedStyle(canvas);
    let w:number, h:number;
    w = parseInt(canvascompStyles.width);
    h = parseInt(canvascompStyles.height);
    if (isNaN(w)) w = 0;
    if (isNaN(h)) h = 0;
    this.setState({ 
      canvasWidth: w ,
      canvasHeight: h,
    }); 

  }//END updateCanvasComputedStyle



  render() 
  {
      let rawBGStyle = {
        width: this.state.canvasWidth,
        height:this.state.canvasHeight,
      }

      let rawImgStyle = {
        width: this.state.canvasWidth,
        height:this.state.canvasHeight,
      }

      return  <div className={this.parent.state.isMobile? mobileStyles.container : styles.container}>
                <div className={this.parent.state.isMobile? mobileStyles.canvasOutter : styles.canvasOutter}>
                <div id='canvas' className={this.parent.state.isMobile? mobileStyles.canvas : styles.canvas}>
                  {

                    this.state.images.map((image, i) => {     

                    let wrapperStyle = {
                      width: image.w,
                      height:image.h,
                      marginTop: image.y,
                      marginLeft: image.x
                    }  

                    let imgStyle = {
                      
                    }    
                    let tapperClass = this.parent.state.isMobile? mobileStyles.tappable : styles.tappable;
                    
                    let imgEle= <img key={'img-key-'+i} src={image.upload.data_url} 
                                  className={this.parent.state.isMobile? mobileStyles.img : styles.img} 
                                  style={imgStyle}  
                                />
                    let ele = this.touchController.tappableElement(tapperClass, wrapperStyle, imgEle, 'tappable-key-'+i)
                    

                    return ele;
                    }
                  )}
                    <div className={this.parent.state.isMobile? mobileStyles.rawImgWrapper : styles.rawImgWrapper}>
 
                      <img 
                        id='canvasIMG' 
                        className={this.parent.state.isMobile? mobileStyles.rawImg : styles.rawImg} 
                        src="/generator/will_smith_punching/raw.png" 
                        alt="meme" 
                      />
                      
                    </div>
                  </div>
                </div>
              </div>
  }

}//END class Canvas


export default Canvas;