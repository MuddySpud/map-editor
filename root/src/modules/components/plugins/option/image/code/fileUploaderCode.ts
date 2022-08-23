

const fileUploaderCode = {

    clickUploader: (optionID: string): void => {

        const fileUploaderID: string = fileUploaderCode.getID(optionID);
        const fileUploader: HTMLInputElement = document.querySelector(`#${fileUploaderID}`) as HTMLInputElement;

        if (!fileUploader) {
            return;
        }

        fileUploader.value = '';
        fileUploader.click();
    },

    getID: (optionID: string): string => {

        return `fileUpload_${optionID}`;
    },
}

export default fileUploaderCode;
