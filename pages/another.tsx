import {MemePage} from '../components/pages/meme'
import { withUserAgent } from 'next-useragent'


class Another extends MemePage
{
  constructor(props:any)
  {
    super(props);
    let state:any   = this.getState();
    state.rawImgSrc = "/generator/will_smith_punching/flower.jpg";
    state.pageTitle = "Another generator";
    this.state      = state;
  }//END constructor  

  
  onReady()
  {
    this.initStageSetup();
  }//END onReady

  async initStageSetup()
  {
    await this.componentsGetterRef.current.imageText().doEditText( -1, 'aaaaaaaa', 30, '#000', 40, 0, 0);
    await this.componentsGetterRef.current.imageText().doEditText( -2, 'aaaaaaaa', 30, '#eb4034', 40, 70, 100);
  }

}//END class WillSmithPunchingPage

export default withUserAgent(Another);