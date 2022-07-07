import {MemePage} from '../components/pages/meme'
import { withUserAgent } from 'next-useragent'


class Another extends MemePage
{
  constructor(props:any)
  {
    super(props);
    let state:any   = this.getState();
    state.rawImgSrc = "/generator/rain/rain.png";
    state.pageTitle = "Another generator";
    this.state      = state;
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
        100
      );
    }
    
    //console.log(parseInt(text_1_x));
    let canvas_w:number = parseInt(canvascompStyles.width);
    let canvas_h:number = parseInt(canvascompStyles.height);


    let text_1_x = 300;
    let text_1_y = 0;
    let text_2_x = 250;
    let text_2_y = 730;

    console.log(this.componentsGetterRef.current.imageText().editTextWithCallBack);

    await this.componentsGetterRef.current.imageText().editTextWithCallBack( -3, '我呢邊無喎22', 30, '#fff', 40, 
      this.state.isMobile? rect.left+text_1_x : text_1_x, this.state.isMobile? rect.top+text_1_y : text_1_y, await function(){});
    await this.componentsGetterRef.current.imageText().editTextWithCallBack( -2, '我呢邊無喎fff333', 30, '#fff', 40, 
      this.state.isMobile? rect.left+text_2_x : text_2_x, this.state.isMobile? rect.top+text_2_y : text_2_y, await function(){});
  }

}//END class WillSmithPunchingPage

export default withUserAgent(Another);