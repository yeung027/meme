import {MemePage} from '../components/pages/meme'
import { withUserAgent } from 'next-useragent'


class WillSmithPunchingPage extends MemePage
{
  constructor(props:any)
  {
    super(props);

    let state:any   = this.getState();
    state.rawImgSrc = "/generator/will_smith_punching/raw.png";
    state.pageTitle = "Will Smith Punching generator";
    this.state      = state;


  }//END constructor  


  }//END class WillSmithPunchingPage

export default withUserAgent(WillSmithPunchingPage);