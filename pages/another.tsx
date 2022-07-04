import {MemePage} from '../components/pages/meme'
import { withUserAgent } from 'next-useragent'


class Another extends MemePage
{
  constructor(props:any)
  {
    super(props);
    let state:any   = this.getState();
    state.rawImgSrc = "/generator/will_smith_punching/raw222.png";
    state.pageTitle = "Another generator";
    this.state      = state;
  }//END constructor  

  

  }//END class WillSmithPunchingPage

export default withUserAgent(Another);