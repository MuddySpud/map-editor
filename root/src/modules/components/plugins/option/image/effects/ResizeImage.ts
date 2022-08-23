import U from "../../../../../global/gUtilities";
import imageActions from "../actions/imageActions";
import IImageUrlJson from "../interfaces/IImageUrlJson";

const dataURLToBlob = (dataURL: string) => {

    const BASE64_MARKER = ';base64,';

    if (dataURL.indexOf(BASE64_MARKER) === -1) {

        const parts: Array<string> = dataURL.split(',');
        const contentType: string = parts[0].split(':')[1];
        const raw: string = parts[1];

        return new Blob(
            [raw],
            {
                type: contentType
            }
        );
    }

    const parts: Array<string> = dataURL.split(BASE64_MARKER);
    const contentType: string = parts[0].split(':')[1];
    const raw: string = window.atob(parts[1]);
    const rawLength: number = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {

        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob(
        [uInt8Array],
        {
            type: contentType
        }
    );
}

const resizeAndUploadImage = (
    dispatch: any,
    props: any): void => {

    const file: File = props.file;
    const maxSize: number = props.maxSize;
    const optionKey: string = props.optionKey;
    const imageUrlJson: IImageUrlJson = props.imageUrlJson;

    if (!file
        || !file.type.match(/image.*/)) {

        return;
    }

    // Load the image
    const reader = new FileReader();

    reader.onload = (readerEvent: ProgressEvent<EventTarget>) => {

        const image = new Image();

        image.onload = (_imageEvent: Event) => {

            // Resize the image
            const canvas = document.createElement('canvas');
            let width = image.width;
            let height = image.height;

            if (width > height
                && width > maxSize) {

                height *= maxSize / width;
                width = maxSize;
            }
            else if (height > maxSize) {

                width *= maxSize / height;
                height = maxSize;
            }

            canvas.width = width;
            canvas.height = height;

            const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

            if (!context) {
                return;
            }

            context.drawImage(
                image,
                0,
                0,
                width,
                height);

            const dataUrl: string = canvas.toDataURL('image/jpeg');
            const resizedImage: Blob = dataURLToBlob(dataUrl);
            const fileName: string = U.getFileName(file.name);

            const newFileName = `${fileName}.jpg`;
            imageUrlJson.fileName = newFileName;
            
            const imageFile: File = new File(
                [resizedImage],
                newFileName,
                {
                    lastModified: new Date().getTime(),
                    type: resizedImage.type
                }
            )

            requestAnimationFrame(() =>
                dispatch(
                    imageActions.UploadResizedImage,
                    {
                        file: imageFile,
                        optionKey: optionKey
                    }
                ));
        }

        const target: any = readerEvent?.target;
        image.src = target.result;
    }

    reader.readAsDataURL(file);
};


export function ResizeAndUploadImage(props: any) {

    return [
        resizeAndUploadImage,
        props
    ]
}
