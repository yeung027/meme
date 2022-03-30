import React,{Component} from 'react';
import Head from 'next/head'
import { WithUserAgentProps, withUserAgent } from 'next-useragent'
import styles from '../styles/index/desktop.module.css'
import mobileStyles from '../styles/index/mobile.module.css'

type MyProps = {
  ua: any,
  useragent: any,
};

type MyStates = {
  isMobile: boolean,
};

interface IndexPage {

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
                <div className={this.state.isMobile? mobileStyles.header : styles.header}>
                  <div className={this.state.isMobile? mobileStyles.title : styles.title}>
                    Will Smith Punching generator
                  </div>
                  <div className={this.state.isMobile? 'm_s_btn' : 's_btn'}>
                    2
                  </div>
                </div>
              </div>
            </>
  }

  }//END class IndexPage


export default withUserAgent(IndexPage);