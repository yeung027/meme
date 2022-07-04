import React,{Component} from 'react';
import { WithUserAgentProps, withUserAgent } from 'next-useragent'
import styles from '../../styles/memepage/desktop.module.css'
import mobileStyles from '../../styles/memepage/mobile.module.css'
import Header from '../generator/header'
import CPU from '../generator/cpu'
import Steps from '../generator/steps'
import Canvas from '../generator/canvas'
import BottomControlPanel from '../generator/bottomControlPanel'
import ExportDialog from '../generator/exportDialog'
import ComponentsGetter from '../helpers/componentsGetter'
import Menu from '../menu';

type MyProps = {
  ua: any,
  useragent: any
  debug: any
  
};

type MyStates = {
  isMobile: boolean
  debug: boolean
  rawImgSrc: string
  pageTitle: string
  headertDidMount: boolean
};


export class MemePage extends Component<MyProps & WithUserAgentProps, MyStates> 
{
  menuRef: any
  headerRef: any;
  stepsRef: any;
  canvasRef: any;
  bottomControlPanelRef: any;
  cpuRef: any;
  exportDialogRef: any;
  componentsGetterRef: any;

  constructor(props:any)
  {
    super(props);
    const ua  = this.props.ua;
    let useragent: string;
    useragent = this.props.useragent;

    this.state = {
      isMobile: ua.isMobile,
      debug: this.props.debug =='true',
      rawImgSrc: "/generator/will_smith_punching/happy.png",
      pageTitle: "Meme Generator",
      headertDidMount:false
      
    }//END state

    this.menuRef = React.createRef();
    this.componentsGetterRef = React.createRef();
    this.headerRef = React.createRef();
    this.stepsRef = React.createRef();
    this.canvasRef = React.createRef();
    this.bottomControlPanelRef = React.createRef();
    this.cpuRef = React.createRef();
    this.exportDialogRef = React.createRef();

    this.checkIsAllCallbackDoneAndDo     = this.checkIsAllCallbackDoneAndDo.bind(this);
    this.headertDidMountCallback         = this.headertDidMountCallback.bind(this);

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

  headertDidMountCallback()
  {
    this.setState({
      headertDidMount:false
    },this.checkIsAllCallbackDoneAndDo);
  }//END headertDidMountCallback

  checkIsAllCallbackDoneAndDo()
  {
    console.log('yeah');
  }

  render() 
  {
    let ele = null;

    if(this.state.isMobile)
    {
      ele = <>
              <ComponentsGetter parent={this} ref={this.componentsGetterRef} />
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
      ele = <div id='rootDiv'>
              <ComponentsGetter parent={this} ref={this.componentsGetterRef} />
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
            </div>
    }





    return  <div id="rootDiv">
              <Menu parent={this} ref={this.menuRef} /> 
              <ExportDialog parent={this} ref={this.exportDialogRef} />
              <CPU parent={this} ref={this.cpuRef} />
              <div className={this.state.isMobile? mobileStyles.container : styles.container} id ='page-root'>
                 {ele}
              </div>
            </div>
  }


}//END class MemePage
