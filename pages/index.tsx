import React,{Component} from 'react';
import { WithUserAgentProps, withUserAgent } from 'next-useragent'
import Header from '../components/generator/header'
import styles from '../styles/index/desktop.module.css'
import mobileStyles from '../styles/index/mobile.module.css'
import Link from 'next/link'

type MyProps = {
  ua: any,
  useragent: any
  debug: any
};

type MyStates = {
  isIndex: boolean
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
      isIndex: true,
      isMobile: ua.isMobile,
      debug: this.props.debug =='true',
      pageTitle: "Meme Generator"
    }//END state

    this.headerRef = React.createRef();

    this.getList           = this.getList.bind(this);
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

  getList()
  {
    return  <div className={this.state.isMobile ? mobileStyles.listWrapper : styles.listWrapper}>
              <Link href="will_smith_punching">
                <a 
                className={this.state.isMobile ? mobileStyles.listItem : styles.listItem}
                >
                  <div className={this.state.isMobile ? mobileStyles.avator : styles.avator}>
                    <img src='generator/will_smith_punching/happy.png' />
                  </div>
                  <div className={this.state.isMobile ? mobileStyles.listItemCenter : styles.listItemCenter}>
                    <span className={this.state.isMobile ? mobileStyles.listItemTitle : styles.listItemTitle}>title 1</span>
                    <span className={this.state.isMobile ? mobileStyles.listItemH2 : styles.listItemH2}>sub</span>
                  </div>
                </a>
              </Link>

              <Link href="another">
                <a className={this.state.isMobile ? mobileStyles.listItem : styles.listItem}>
                  <div className={this.state.isMobile ? mobileStyles.avator : styles.avator}>
                    <img src='generator/will_smith_punching/raw222.png' />
                  </div>
                  <div className={this.state.isMobile ? mobileStyles.listItemCenter : styles.listItemCenter}>
                    <span className={this.state.isMobile ? mobileStyles.listItemTitle : styles.listItemTitle}>title 2</span>
                    <span className={this.state.isMobile ? mobileStyles.listItemH2 : styles.listItemH2}>sub 2</span>
                  </div>
                </a>
              </Link>


            </div>
  }//END getlist


  render() 
  {
    let ele = null;
    if(this.state.isMobile)
    {
      ele = <>

              <Header parent={this} ref={this.headerRef} /> 
              <div className={mobileStyles.whiteContainer}>
                {this.getList()}
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
                  {this.getList()}
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