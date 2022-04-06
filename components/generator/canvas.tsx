import React,{Component, useState} from 'react';
import styles from '../../styles/generator/canvas/desktop.module.css'
import mobileStyles from '../../styles/generator/canvas/mobile.module.css'
import Image from 'next/image'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

type MyProps = {
    parent:any
};

type MyStates = {

};

interface Canvas {
parent: any
}
// onMouseDown={(e) => setMousedown(true)} onPointerDown={(e) => setMousedown(true)} onPointerUp={(e) => setMousedown(false)}
const IMG = ()=> {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }));
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    api.start(i => {

      return {x: mx * 10}


    })
  })
  return <animated.div {...bind()} style={{ marginLeft:x }} className={mobileStyles.drag}>1111</animated.div>
}



class Canvas extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      
    }//END state
    
  }//END constructor

  render() 
  {
      
      return  <div className={this.parent.state.isMobile? mobileStyles.container : styles.container}>
        
                <div className={this.parent.state.isMobile? mobileStyles.canvas : styles.canvas}>
                <IMG />
                 {/*  <img id='canvasIMG' className={this.parent.state.isMobile? mobileStyles.img : styles.img} src="/generator/will_smith_punching/raw.png" alt="meme" />
                   */}
                </div>
              </div>
  }

}//END class Canvas


export default Canvas;