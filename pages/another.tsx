import {MemePage} from '../components/pages/meme'
import { withUserAgent } from 'next-useragent'


class Another extends MemePage
{
  constructor(props:any)
  {
    super(props);

    this.state = {
      isMobile: this.state.isMobile,
      debug: this.state.debug,
      rawImgSrc: "/generator/will_smith_punching/raw222.png",
      pageTitle: "Another generator"
    }

  }//END constructor  

  

  }//END class WillSmithPunchingPage

export default withUserAgent(Another);