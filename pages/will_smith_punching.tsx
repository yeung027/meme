import React,{Component} from 'react';
import { WithUserAgentProps, withUserAgent } from 'next-useragent'
import styles from '../styles/will_smith_punching/desktop.module.css'
import mobileStyles from '../styles/will_smith_punching/mobile.module.css'
import Header from '../components/generator/header'
import Steps from '../components/generator/steps'


type MyProps = {
  ua: any,
  useragent: any,
};

type MyStates = {
  isMobile: boolean,
};

interface IndexPage {
  headerRef: any
  stepsRef: any
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
    }//END state

    this.headerRef = React.createRef();
    this.stepsRef = React.createRef();

  }//END constructor  

  static async getInitialProps(ctx:any) 
  {
    return { 
      useragent: ctx.ua.source,
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
    return  <>
              <div className={this.state.isMobile? mobileStyles.container : styles.container}>
                <Header parent={this} ref={this.headerRef} />
                <div className={this.state.isMobile? mobileStyles.whiteContainer : styles.whiteContainer}>
                  <Steps parent={this} ref={this.stepsRef} />
                </div>
              </div>
            </>
  }

  }//END class IndexPage


export default withUserAgent(IndexPage);