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
    
    this.mergeComplete  = this.mergeComplete.bind(this);
    this.imgClick       = this.imgClick.bind(this);

  }//END constructor

  imgClick()
  {
    console.log('click');
    if (navigator.share) {
      navigator.share({
        title: '標題',
        text: '文字描述',
        url: this.state.imgSrc,
      })
        .then(() => console.log('成功'))
        .catch((error) => console.log('發生錯誤', error));
    }
  }//END imgClick


  mergeComplete(b64:any, imgEle: any)
  {
    console.log('mergeComplete');
  }//END mergeComplete

  async backup_function_lol(b64:any, imgEle: any)
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
  this.setState({ imgSrc: b64 });

  //alert(navigator.share);
      console.log(navigator.share);
      let ok2:any= navigator.share;
      let url = document.location.href;
      url = b64;
      if(ok2)
      {

        const toShare = {
          title: "Viruses in a trench coat",
          text: "Definitely not 5 viruses in a trench coat",
          files: b64
        }

        //alert('dsadsadsd');
        //navigator.share({url});
        await navigator.share(toShare);
      }

  //link.click();



//fileDownload(b64, 'filename.png');
    }
  }//END backup_function_lol

  componentDidMount()
  {
    
    var self = this;
    let imgEle: any  = document.querySelector('#canvasIMG');
    if(imgEle)
    {
      imgEle.addEventListener('click', this.imgClick);
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
      return  null;
  }

}//END class CanvasDrawer


export default CanvasDrawer;