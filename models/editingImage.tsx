import UploadedImage from './uploadedImage';
import EditingText from './editingText';

type EditingImage = {
    upload:UploadedImage
    x:number
    y:number
    width:number
    height:number
    index:number
    isText:boolean
    text:EditingText
};





export default EditingImage;