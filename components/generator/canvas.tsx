import React,{Component} from 'react';
import styles from '../../styles/generator/canvas/desktop.module.css'
import mobileStyles from '../../styles/generator/canvas/mobile.module.css'

type MyProps = {
    parent:any
};

type MyStates = {
  images: any[]
  canvasWidth: nubmer
  canvasHeight: nubmer
};

interface Canvas  {
  parent: any
}

class Canvas extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      images: [],
      canvasWidth: 0,
      canvasHeight: 0
    }//END state
    
    this.updateCanvasComputedStyle                  = this.updateCanvasComputedStyle.bind(this);
  }//END constructor

  componentDidMount() 
  {
    //this.updateCanvasComputedStyle();
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
      canvasWidth: w,
      canvasHeight: h
    }); 

  }//END updateCanvasComputedStyle

  render() 
  {
      let imagesEle = null;
      let imgWrapperStyle = {width:100, height:100};

      return  <div className={this.parent.state.isMobile? mobileStyles.container : styles.container}>
        
                <div id='canvas' className={this.parent.state.isMobile? mobileStyles.canvas : styles.canvas}>
                  <img id='canvasIMG' className={this.parent.state.isMobile? mobileStyles.rawImg : styles.rawImg} src="/generator/will_smith_punching/raw.png" alt="meme" />
                  {this.state.images.map((image, i) => {     
                    //console.log("Entered");                 
                    // Return the element. Also pass key     
                    return <div className={this.parent.state.isMobile? mobileStyles.imgWrapper : styles.imgWrapper} style={imgWrapperStyle}><img src={image.data_url} className={this.parent.state.isMobile? mobileStyles.img : styles.img}  /></div>
                  })}
                </div>
              </div>
  }

}//END class Canvas


export default Canvas;