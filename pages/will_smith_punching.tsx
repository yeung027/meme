import React,{Component} from 'react';
import { WithUserAgentProps, withUserAgent } from 'next-useragent'
import styles from '../styles/will_smith_punching/desktop.module.css'
import mobileStyles from '../styles/will_smith_punching/mobile.module.css'
import Header from '../components/generator/header'
import CPU from '../components/generator/cpu'
import Steps from '../components/generator/steps'
import Canvas from '../components/generator/canvas'
import BottomControlPanel from '../components/generator/bottomControlPanel'
import ExportDialog from '../components/generator/exportDialog'

type MyProps = {
  ua: any,
  useragent: any,
  debug: any
};

type MyStates = {
  isMobile: boolean,
  debug: boolean
};

interface WillSmithPunchingPage {
  headerRef: any
  stepsRef: any
  canvasRef: any
  bottomControlPanelRef: any
  cpuRef: any
  exportDialogRef: any
}

class WillSmithPunchingPage extends Component<MyProps & WithUserAgentProps, MyStates> 
{
  constructor(props:any)
  {
    super(props);
    const ua  = this.props.ua;
    let useragent: string;
    useragent = this.props.useragent;

    this.state = {
      isMobile: ua.isMobile,
      debug: this.props.debug =='true'
    }//END state

    this.headerRef = React.createRef();
    this.stepsRef = React.createRef();
    this.canvasRef = React.createRef();
    this.bottomControlPanelRef = React.createRef();
    this.cpuRef = React.createRef();
    this.exportDialogRef = React.createRef();

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
                <Steps parent={this} ref={this.stepsRef} step={''} />
                <Canvas parent={this} ref={this.canvasRef} />
              </div>
              <div className={mobileStyles.bottomControlPanelContainer}>
                <BottomControlPanel parent={this} ref={this.bottomControlPanelRef} stage={null} />
              </div>
            </>
    }
    else
    {
      ele = <>
              <Header parent={this} ref={this.headerRef} /> 
              <div className={styles.main}>
                <div className={styles.whiteContainer}>
                  <div className={styles.whiteContainerInner}>
                    <BottomControlPanel parent={this} ref={this.bottomControlPanelRef} stage={null} />
                  </div>
                </div>
                <div className={styles.right}>
                  <Steps parent={this} ref={this.stepsRef} step={''} />
                  <Canvas parent={this} ref={this.canvasRef} />
                </div>
              </div>
            </>
    }





    return  <>
              <ExportDialog parent={this} ref={this.exportDialogRef} />
              <CPU parent={this} ref={this.cpuRef} />
              <div className={this.state.isMobile? mobileStyles.container : styles.container} id ='page-root'>
                 {ele}
              </div>
            </>
  }

  }//END class WillSmithPunchingPage


export default withUserAgent(WillSmithPunchingPage);