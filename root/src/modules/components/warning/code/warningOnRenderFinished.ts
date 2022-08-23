

const setWarningHeight = () => {

    const lens: HTMLDivElement = document.querySelector('#lens') as HTMLDivElement;

    if (!lens) {
        return;
    }

    const menu: HTMLDivElement = document.querySelector('#menu') as HTMLDivElement;
    const lensError: HTMLDivElement = document.querySelector(`#lensErrorView .lens-error-overlay`) as HTMLDivElement;

    const lensRect = lens.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();

    if (lensError) {

        lensError.style.height = `${lensRect.height + menuRect.height}px`;
        lensError.style.width = `${lensRect.width}px`;
        lensError.style.top = `${menuRect.top}px`;
        lensError.style.left = `${menuRect.left}px`;
    }
};

const warningOnRenderFinished = () => {

    setWarningHeight();
};

export default warningOnRenderFinished;
