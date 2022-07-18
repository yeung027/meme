export type Base64<imageType extends string> = `data:image/${imageType};base64${string}`

export type Editable = {
    index:number,
    b64: Base64<any>,
    x:number,
    y:number,
    width:number,
    height:number,
    zindex:number,
    text?:EditableText
}

export type EditableText = {
    fontSize:number,
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