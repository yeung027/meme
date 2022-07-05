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
  headerDidMount: boolean
  stepsDidMount: boolean
  canvasDidMount: boolean
  bottomControlPanelDidMount: boolean
  uploadImgDidMount: boolean
  cpuDidMount: boolean
  imageEditorDidMount: boolean
  imageTextDidMount: boolean
  imageCompilerDidMount: boolean
  componentsGetterDidMount: boolean
  exportDialogDidMount: boolean
  menuDidMount: boolean
  touchControllerDidMount: boolean
  rawImgZindex: number
  imgZindex: number
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
      headerDidMount: false,
      stepsDidMount: false,
      canvasDidMount: false,
      bottomControlPanelDidMount: false,
      uploadImgDidMount: false,
      cpuDidMount: false,
      imageEditorDidMount: false,
      imageTextDidMount: false,
      imageCompilerDidMount: false,
      componentsGetterDidMount: false,
      exportDialogDidMount: false,
      menuDidMount: false,
      touchControllerDidMount: false,
      rawImgZindex: 5,
      imgZindex: 6
    }//END state

    this.menuRef                = React.createRef();
    this.componentsGetterRef    = React.createRef();
    this.headerRef              = React.createRef();
    this.stepsRef               = React.createRef();
    this.canvasRef              = React.createRef();
    this.bottomControlPanelRef  = React.createRef();
    this.cpuRef                 = React.createRef();
    this.exportDialogRef        = React.createRef();

    this.checkIsAllCallbackDoneAndDo      = this.checkIsAllCallbackDoneAndDo.bind(this);
    this.headerDidMountCallback           = this.headerDidMountCallback.bind(this);
    this.stepsDidMountCallback            = this.stepsDidMountCallback.bind(this);
    this.canvasDidMountCallback           = this.canvasDidMountCallback.bind(this);
    this.bottomControlPanelDidMountCallback           = this.bottomControlPanelDidMountCallback.bind(this);
    this.uploadImgDidMountCallback                    = this.uploadImgDidMountCallback.bind(this);
    this.cpuDidMountCallback                          = this.cpuDidMountCallback.bind(this);
    this.imageEditorDidMountCallback                  = this.imageEditorDidMountCallback.bind(this);
    this.imageTextDidMountCallback                    = this.imageTextDidMountCallback.bind(this);
    this.imageCompilerDidMountCallback                = this.imageCompilerDidMountCallback.bind(this);
    this.componentsGetterDidMountCallback             = this.componentsGetterDidMountCallback.bind(this);
    this.exportDialogDidMountCallback                 = this.exportDialogDidMountCallback.bind(this);
    this.menuDidMountCallback                         = this.menuDidMountCallback.bind(this);
    this.touchControllerDidMountCallback              = this.touchControllerDidMountCallback.bind(this);
    this.getState                                     = this.getState.bind(this);
  }//END constructor  
  
  getState()
  {
    return this.state;
  }

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

  headerDidMountCallback()
  {
    this.setState({
      headerDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END headerDidMountCallback

  stepsDidMountCallback()
  {
    this.setState({
      stepsDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END stepsDidMountCallback

  canvasDidMountCallback()
  {
    this.setState({
      canvasDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END canvasDidMountCallback

  bottomControlPanelDidMountCallback()
  {
    this.setState({
      bottomControlPanelDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END bottomControlPanelDidMountCallback

  uploadImgDidMountCallback()
  {
    this.setState({
      uploadImgDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END uploadImgDidMountCallback

  cpuDidMountCallback()
  {
    this.setState({
      cpuDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END cpuDidMountCallback

  imageEditorDidMountCallback()
  {
    this.setState({
      imageEditorDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END imageEditorDidMountCallback

  imageTextDidMountCallback()
  {
    this.setState({
      imageTextDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END imageTextDidMountCallback

  imageCompilerDidMountCallback()
  {
    this.setState({
      imageCompilerDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END imageCompilerDidMountCallback

  componentsGetterDidMountCallback()
  {
    this.setState({
      componentsGetterDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END componentsGetterDidMountCallback

  exportDialogDidMountCallback()
  {
    this.setState({
      exportDialogDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END exportDialogDidMountCallback

  menuDidMountCallback()
  {
    this.setState({
      menuDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END menuDidMountCallback

  touchControllerDidMountCallback()
  {
    this.setState({
      touchControllerDidMount:true
    },this.checkIsAllCallbackDoneAndDo);
  }//END touchControllerDidMountCallback

  checkIsAllCallbackDoneAndDo()
  {
    console.log(this.state.headerDidMount && this.state.stepsDidMount && this.state.canvasDidMount && this.state.bottomControlPanelDidMount
      && this.state.uploadImgDidMount && this.state.cpuDidMount && this.state.imageEditorDidMount && this.state.imageTextDidMount
      && this.state.imageCompilerDidMount && this.state.componentsGetterDidMount && this.state.exportDialogDidMount && this.state.menuDidMount && this.state.touchControllerDidMount);
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
