import Filters from "../../../../state/constants/Filters";


const treesDisplayOnRenderFinished = () => {

    scrollTreeIntoView();
};

const scrollTreeIntoView = () => {

    const divElement: HTMLDivElement = document.querySelector(Filters.treeShowFilter) as HTMLDivElement;

    if (divElement) {
        
        divElement.classList.remove(Filters.treeShowClassFilter);
        divElement.scrollIntoView(true); // align with top, use false to align with bottom
    }
};

export default treesDisplayOnRenderFinished;