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
    if(!this.state.isMobile && body)
      body.classList.add("desktop_body");
  }

  render() 
  {
    return  <>
              dsfsfsfe
            </>
  }

  }//END class IndexPage


export default withUserAgent(IndexPage);