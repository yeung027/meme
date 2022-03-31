import React,{Component} from 'react';
import mergeImages from 'merge-images';

type MyProps = {
    parent:any
};

type MyStates = {
  imgSrc:string
};

interface CanvasDrawer  {
  parent: any
}

class CanvasDrawer extends Component<MyProps, MyStates>
{
  constructor(props:any)
  {
    super(props);
    this.parent = props.parent;

    this.state = {
      imgSrc: '/generator/will_smith_punching/raw.png'
    }//END state
    
    this.mergeComplete = this.mergeComplete.bind(this);

  }//END constructor

  mergeComplete(b64:any, imgEle: any)
  {
    
    if(imgEle)
    {
      imgEle.src = b64;
      //console.log(b64);
      let sharedata:ShareData = b64;
      var binaryData = [];
      binaryData.push(b64);
      let blob = new Blob(binaryData, {type: "image/png"});

      const link = document.createElement("a");
  link.href = b64;
  link.download = 'okok.png';
  alert(navigator.share);
      console.log(navigator.share);
      let ok2:any= navigator.share;
      let url = document.location.href;
      url = b64;
      if(ok2)
      {
        alert('dsadsadsd');
        navigator.share({url});
      }

  //link.click();



//fileDownload(b64, 'filename.png');
    }
  }//END mergeComplete

  componentDidMount()
  {
    var self = this;
    let imgEle: any  = document.querySelector('#canvasIMG');
    if(imgEle)
    {
      console.log('try');
      mergeImages(['/generator/will_smith_punching/raw.png', '/generator/will_smith_punching/happy.png'])
        .then(function (b64) 
        {
          self.mergeComplete(b64, imgEle);
        });
    }
  }//END componentDidMount

  render() 
  {
      return  <>
                <a href={this.state.imgSrc}>okok</a>
              </>;
  }

}//END class CanvasDrawer


export default CanvasDrawer;