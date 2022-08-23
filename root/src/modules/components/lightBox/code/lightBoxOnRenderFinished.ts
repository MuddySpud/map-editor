import Filters from "../../../state/constants/Filters";


const lightBoxOnRenderFinished = () => {

    setHeights();
};

const setHeights = () => {

    const text: HTMLDivElement = document.querySelector(Filters.lightBoxErrorTextFilter) as HTMLDivElement;

    if (!text) {
        return;
    }

    // if error scroll-height is greater than view clinet-height calculate all heights
    // The view should only have the error div in it.
    const view: HTMLDivElement = document.querySelector(Filters.lightBoxViewFilter) as HTMLDivElement;
    const error: HTMLDivElement = document.querySelector(Filters.lightBoxErrorFilter) as HTMLDivElement;

    text.style.height = ""; // Get text scroll height after setting height to nothing
    let textHeight = text.scrollHeight;

    error.style.height = ""; // Get error scroll height after setting height to nothing
    let errorHeight = error.scrollHeight;

    view.style.height = ""; // Get view scroll height after setting height to nothing
    let viewHeight = view.clientHeight;
    view.style.overflow = 'unset';

    if (viewHeight > errorHeight) {
        // No need for scrollbars
        return;
    }

    let noTextErrorHeight = errorHeight - textHeight;

    if (viewHeight <= noTextErrorHeight + 40) { // Make sure it doesn't go below 40px in height.
        // Can't fix this so let view scrollbars scroll whole of dialogue
        view.style.overflow = 'auto';

        return;
    }

    let remainderHeight = viewHeight - noTextErrorHeight;
    text.style.height = `${remainderHeight}px`;
};

export default lightBoxOnRenderFinished;
