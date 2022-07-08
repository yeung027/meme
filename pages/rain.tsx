import {MemePage} from '../components/pages/meme'
import { withUserAgent } from 'next-useragent'
import EditingImage from '../models/editingImage';


class Another extends MemePage
{
  constructor(props:any)
  {
    super(props);
    let state:any   = this.getState();
    state.rawImgSrc = "/generator/rain/rain.png";
    state.pageTitle = "Another generator";
    this.state      = state;

    this.text_1_callback           = this.text_1_callback.bind(this);
    this.text_2_callback           = this.text_2_callback.bind(this);
  }//END constructor  

  
  onReady()
  {
    this.initStageSetup();
  }//END onReady

  async initStageSetup()
  {
    let that = this;
    let canvasDom:HTMLCanvasElement = this.canvasRef.current.canvasRef.current!;
    let rect = canvasDom.getBoundingClientRect();
    let canvascompStyles  = window.getComputedStyle(canvasDom);
    
    //console.log(parseInt(text_1_x)<=0);

    if(parseInt(canvascompStyles.width)<=0)
    {
      return setTimeout(
        function() {
          that.initStageSetup();
        }
        .bind(this),
        70
      );
    }
    
    //console.log(parseInt(text_1_x));
    let canvas_w:number = parseInt(canvascompStyles.width);
    let canvas_h:number = parseInt(canvascompStyles.height);

    let fontSize:number = this.state.isMobile ? 23 : 28;
    let text_1_x = 0;
    let text_1_y = 0;
    let text_2_x = 0;
    let text_2_y = 0;

    //console.log(this.componentsGetterRef.current.imageText().editTextWithCallBack);

    await this.componentsGetterRef.current.imageText().editTextWithCallBack( -3, 'afffffff', fontSize, '#fff', 40, 
      this.state.isMobile? rect.left+text_1_x : text_1_x, this.state.isMobile? rect.top+text_1_y : text_1_y, await that.text_1_callback);
    await this.componentsGetterRef.current.imageText().editTextWithCallBack( -2, '我呢邊無喎', fontSize, '#fff', 40, 
      this.state.isMobile? rect.left+text_2_x : text_2_x, this.state.isMobile? rect.top+text_2_y : text_2_y, await that.text_2_callback);
  }//END initStageSetup

  text_1_callback(index:number)
  {
    let canvasDom:HTMLCanvasElement = this.canvasRef.current.canvasRef.current!;
    let rect = canvasDom.getBoundingClientRect();
    //let canvascompStyles  = window.getComputedStyle(canvasDom);
    

    let images:EditingImage[]  = this.canvasRef.current.state.images;
    let imagesCopy:EditingImage[]  = images;
    let image:EditingImage = images[index];

    let x = (rect.width/2) - (image.width/2);
    let y = (rect.height/2) - (image.height/2) - 30;

    image.x = x;
    image.y = y;
    imagesCopy[index] = image;
    this.canvasRef.current.setState({ 
      images: imagesCopy
    }, function(){
      
    }); 

    //console.log('text_1_callback: '+x);
  }//END text_1_callback

  text_2_callback(index:number)
  {
    let canvasDom:HTMLCanvasElement = this.canvasRef.current.canvasRef.current!;
    let rect = canvasDom.getBoundingClientRect();
    //let canvascompStyles  = window.getComputedStyle(canvasDom);
    

    let images:EditingImage[]  = this.canvasRef.current.state.images;
    let imagesCopy:EditingImage[]  = images;
    let image:EditingImage = images[index];

    let x = (rect.width/2) - (image.width/2);
    let y = (rect.height) - (image.height/2) - 30;

    image.x = x;
    image.y = y;
    imagesCopy[index] = image;
    this.canvasRef.current.setState({ 
      images: imagesCopy
    }, function(){
      
    }); 

    //console.log('text_2_callback: '+x);
  }//END text_2_callback

}//END class WillSmithPunchingPage



export default withUserAgent(Another);