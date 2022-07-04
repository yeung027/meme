import React,{Component} from 'react';
import styles from '../styles/menu/desktop.module.css'
import mobileStyles from '../styles/menu/mobile.module.css'
import Link from 'next/link'

type MyProps = {
    parent:any
};

type MyStates = {
  open: boolean
};

interface Menu {
  parent: any

}

class Menu extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      open:false
    }//END state

    this.setOpen              = this.setOpen.bind(this);
    this.emptyClick           = this.emptyClick.bind(this);
    this.xBtnClick            = this.xBtnClick.bind(this);
    this.homeAClick           = this.homeAClick.bind(this);
  }//END constructor

  setOpen(v: boolean)
  {
    this.setState({ 
      open: v,
    });
  }

  emptyClick()
  {
    this.setOpen(false);
  }

  xBtnClick()
  {
    this.setOpen(false);
  }

  homeAClick()
  {
    this.setOpen(false);
  }

  componentDidMount() 
  {
    this.parent.menuDidMountCallback();
    //console.log(this)
  }//END componentDidMount

  render() 
  {
      let containerClass = this.parent.state.isMobile ? mobileStyles.container : styles.container;
      if(!this.state.open) containerClass = [containerClass, this.parent.state.isMobile ? mobileStyles.close : styles.close].join(' ');

      let xBtnClass = this.parent.state.isMobile ? mobileStyles.xBtn : styles.xBtn;
      xBtnClass = [xBtnClass, 'bx bx-x'].join(' ');


      let poweredByClass = this.parent.state.isMobile ? mobileStyles.item : styles.item;
      poweredByClass = [poweredByClass, this.parent.state.isMobile ? mobileStyles.poweredBy : styles.poweredBy].join(' ');

      return  <div className={containerClass}>
                <div className={this.parent.state.isMobile ? mobileStyles.inner : styles.inner}>
                  <div className={this.parent.state.isMobile ? mobileStyles.XbtnContainer : styles.XbtnContainer}>
                    <i className={xBtnClass} onClick={this.xBtnClick} />
                  </div>
                  <div className={this.parent.state.isMobile ? mobileStyles.listWrapper : styles.listWrapper}>
                    <Link href="/">
                      <a onClick={this.homeAClick}>
                        <div className={this.parent.state.isMobile ? mobileStyles.item : styles.item}>
                        <i className={'bx bxs-home-alt-2'} onClick={this.xBtnClick} />
                          Home
                        </div>
                      </a>
                    </Link>

                    <div className={poweredByClass}>
                      <span className={this.parent.state.isMobile ? mobileStyles.poweredByInner : styles.poweredByInner}>
                        <span className={this.parent.state.isMobile ? mobileStyles.by : styles.by}>by</span>
                        <span className={this.parent.state.isMobile ? mobileStyles.name : styles.name}>HeyHei</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className={this.parent.state.isMobile ? mobileStyles.empty : styles.empty} onClick={this.emptyClick} />
              </div>;
  }

}//END class Menu


export default Menu;