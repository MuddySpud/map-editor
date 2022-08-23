

// const progressBarCode = {

//     update: (
//         optionID: string,
//         event: ProgressEvent): void => {

//         if (!event.lengthComputable) {

//             return;
//         }

//         const percentage = Math.round((event.loaded * 100) / event.total);
               
//         progressBarCode.updatePercentage(
//             optionID,
//             percentage
//         );
//     },

//     updatePercentage: (
//         optionID: string,
//         percentage: number): void => {

//         const progressBarID: string = progressBarCode.getID(optionID);
//         const progressBar: HTMLProgressElement = document.querySelector(`#${progressBarID}`) as HTMLProgressElement;

//         if (progressBar) {

//             progressBar.value = percentage;

//             console.log(`Progress updated ${percentage}`);
//         }
//     },

//     getID: (optionID: string): string => {

//         return `progress_${optionID}`;
//     },
// }

// export default progressBarCode;
