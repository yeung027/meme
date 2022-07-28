export type Base64<imageType extends string> = `data:image/${imageType};base64${string}`

export type Editable = {
    index:number,
    b64: any,
    x:number, //should be percentage of raw image
    y:number, //should be percentage of raw image
    width:number, //should be percentage of raw image
    height:number, //should be percentage of raw image
    zindex:number,
    text?:EditableText
}

export type EditableText = {
    fontSize:number, //should be percentage of raw image
    value:string,
    color:string
}

export enum ControlPanelSTAGE {
    UPLOADIMG = 'uploadimg',
    EDITIMG = 'editimg',
    EDITTEXT = 'edittext',
    EXPORT = 'export'
}

export enum STEP {
    UPLOADIMG = 'uploadimg',
    EDITING = 'editing',
    EXPORT = 'export'
}

export type ImageBasicInfo = {
    width:number,
    height:number
}