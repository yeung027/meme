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

export enum STAGE {
    UPLOADIMG = 'uploadimg',
    EDITIMG = 'editimg',
    EDITTEXT = 'edittext',
    EXPORT = 'export'
}