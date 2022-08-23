import fileUploaderCode from "../code/fileUploaderCode";


function clickUploader(
    _dispatch: any,
    props: any) {

    fileUploaderCode.clickUploader(props.optionID);
}

export function ClickFileUploader(props: any) {

    return [
        clickUploader,
        props
    ]
}
