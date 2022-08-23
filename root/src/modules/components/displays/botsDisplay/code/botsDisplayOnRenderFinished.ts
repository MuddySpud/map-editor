import Filters from "../../../../state/constants/Filters";


const botsDisplayOnRenderFinished = () => {

    scrollBotIntoView();
};

const scrollBotIntoView = () => {

    const divElement: HTMLDivElement = document.querySelector(Filters.botShowFilter) as HTMLDivElement;

    if (divElement) {
        
        divElement.classList.remove(Filters.botShowClassFilter);
        divElement.scrollIntoView(true); // align with top, use false to align with bottom
    }
};

export default botsDisplayOnRenderFinished;