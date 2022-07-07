import {MemePage} from '../components/pages/meme'
import { withUserAgent } from 'next-useragent'


class Another extends MemePage
{
  constructor(props:any)
  {
    super(props);
    let state:any   = this.getState();
    state.rawImgSrc = "/generator/will_smith_punching/pp1.png";
    state.pageTitle = "Another generator";
    this.state      = state;
  }//END constructor  

  
  onReady()
  {
    this.initStageSetup();
  }//END onReady

  async initStageSetup()
  {
    let canvasDom:HTMLCanvasElement = this.canvasRef.current.canvasRef.current!;
    let rect = canvasDom.getBoundingClientRect();
    await this.componentsGetterRef.current.imageText().doEditText( -1, 'aaaaaaaa', 30, '#000', 40, this.state.isMobile? rect.left : 0, this.state.isMobile? rect.top : 0);
    await this.componentsGetterRef.current.imageText().doEditText( -2, 'aaaaaaaa', 30, '#eb4034', 40, 
      this.state.isMobile? rect.left+70 : 70, this.state.isMobile? rect.top+100 : 100);
  }

}//END class WillSmithPunchingPage

export default withUserAgent(Another);