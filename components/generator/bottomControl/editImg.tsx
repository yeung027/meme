import React,{Component} from 'react';
import styles from '../../../styles/generator/bottomControl/uploadImg/desktop.module.css'
import mobileStyles from '../../../styles/generator/bottomControl/uploadImg/mobile.module.css'
import utilStyles from '../../../styles/generator/bottomControl/util.module.css'

type MyProps = {
    parent:any
};

type MyStates = {

};

interface EditImgUI {
parent: any
}

class EditImgUI extends Component<MyProps, MyStates>
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
    return <>haha</>

  }

}//END class EditImgUI


export default EditImgUI;