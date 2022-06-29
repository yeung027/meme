import {MemePage} from '../components/pages/meme'
import { withUserAgent } from 'next-useragent'


class WillSmithPunchingPage extends MemePage
{
  constructor(props:any)
  {
    super(props);

    this.state = {
      isMobile: this.state.isMobile,
      debug: this.state.debug,
      rawImgSrc: "/generator/will_smith_punching/raw.png",
      pageTitle: "Will Smith Punching generator"
    }

  }//END constructor  

  

  }//END class WillSmithPunchingPage

export default withUserAgent(WillSmithPunchingPage);