import IState from "../../interfaces/state/IState";


const gTextareaCode = {

    setTextAreaHeight: (textArea: HTMLTextAreaElement): void => {

        if (textArea.value === "") {

            textArea.style.height = textArea.style.minHeight;

            return;
        }

        // let heightString: string = textArea.style.height as string;
        // let height: number = parseInt(heightString.replace('px', ''));
        textArea.style.height = ""; // Get scroll height after setting height to nothing
        let scrollHeight = textArea.scrollHeight;

        // if (scrollHeight === 0
        //     && height > 0) {

        //     textArea.classList.add('textarea-refresh');

        //     return; // scrollheight has not been set yet...
        // }

        let newHeight = scrollHeight + 3;
        textArea.style.height = newHeight + 'px';
    },

    onTextAreaInput: (
        state: IState,
        event: any): IState => {

        gTextareaCode.setTextAreaHeight(event.target);

        return state;
    },

    setAllTextAreaHeights: (): void => {

        const textareas: NodeListOf<HTMLTextAreaElement> = document.querySelectorAll(`#lens textarea`) as NodeListOf<HTMLTextAreaElement>;

        textareas.forEach((textarea) => {
            gTextareaCode.setTextAreaHeight(textarea)
        });
    }
};

export default gTextareaCode;

