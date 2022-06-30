import React,{Component} from 'react';
import { WithUserAgentProps, withUserAgent } from 'next-useragent'
import Header from '../components/generator/header'
import styles from '../styles/index/desktop.module.css'
import mobileStyles from '../styles/index/mobile.module.css'

type MyProps = {
  ua: any,
  useragent: any
  debug: any
};

type MyStates = {
  isMobile: boolean
  debug: boolean
  pageTitle: string
};

interface IndexPage{
  headerRef: any
}

class IndexPage extends Component<MyProps & WithUserAgentProps, MyStates> 
{

  constructor(props:any)
  {
    super(props);
    const ua  = this.props.ua;
    let useragent: string;
    useragent = this.props.useragent;

    this.state = {
      isMobile: ua.isMobile,
      debug: this.props.debug =='true',
      pageTitle: "Meme Generator"
    }//END state

    this.headerRef = React.createRef();

  }//END constructor  
  

  static async getInitialProps(ctx:any) 
  {
    return { 
      useragent: ctx.ua.source,
      debug: process.env.debug
    }
  }//END getInitialProps

  componentDidMount() 
  {
    let body  = document.querySelector("body");
    if(body)
      body.classList.add(this.state.isMobile ? 'mobile_body_noscroll' : 'desktop_body_noscroll');
  }//END componentDidMount

  render() 
  {
    let ele = null;
    if(this.state.isMobile)
    {
      ele = <>

              <Header parent={this} ref={this.headerRef} /> 
              <div className={mobileStyles.whiteContainer}>
                
              </div>
              <div className={mobileStyles.bottomControlPanelContainer}>
                
              </div>
            </>
    }
    else
    {
      ele = <div id='rootDiv'>

              <Header parent={this} ref={this.headerRef} /> 
              <div className={styles.main}>
                <div className={styles.whiteContainer}>
                  <div className={styles.whiteContainerInner}>
                    
                  </div>
                </div>
                <div className={styles.right}>
                  
                </div>
              </div>
            </div>
    }


    return  <div id="rootDiv">
              <div className={this.state.isMobile? mobileStyles.container : styles.container} id ='page-root'>
                 {ele}
              </div>
            </div>
  }


}//END class IndexPage

export default withUserAgent(IndexPage);