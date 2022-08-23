import Filters from "../../../../state/constants/Filters";


const branchViewOnRenderFinished = () => {

    setPageWidth();
    scrollNodeIntoView();
    scrollOptionIntoView();
};

const scrollNodeIntoView = () => {

    const divElement: HTMLDivElement = document.querySelector(Filters.nodeShowFilter) as HTMLDivElement;

    if (divElement) {

        divElement.classList.remove(Filters.nodeShowClassFilter);
        divElement.scrollIntoView(true); // align with top, use false to align with bottom
    }
};

const scrollOptionIntoView = () => {

    const divElement: HTMLDivElement = document.querySelector(Filters.optionShowFilter) as HTMLDivElement;

    if (divElement) {

        divElement.classList.remove(Filters.nodeShowClassFilter);
        divElement.scrollIntoView(true); // align with top, use false to align with bottom
    }
};

const setPageWidth = () => {

    const branchesViewElement: HTMLDivElement = document.querySelector('#branchesView') as HTMLDivElement;

    if (!branchesViewElement) {
        return
    }

    const nodeElements: NodeListOf<HTMLDivElement> = document.querySelectorAll('#branchesView .node > a') as NodeListOf<HTMLDivElement>;

    if (nodeElements.length < 1) {
        return;
    }

    const firstOptionElement: HTMLDivElement = document.querySelector('#branchesView .option>a') as HTMLDivElement;

    if (!firstOptionElement) {
        return
    }

    const parentNodeElement: HTMLDivElement = firstOptionElement.closest('#branchesView .node') as HTMLDivElement;
    const lensElement: HTMLDivElement = document.querySelector('#lens') as HTMLDivElement;

    const optionLeft = firstOptionElement.getBoundingClientRect().left;
    const parentLeft = parentNodeElement.getBoundingClientRect().left;
    const leftIndent = Math.abs(optionLeft - parentLeft);
    let maxDepth = window.TreeSolve.screen.maxBranchDepth;
    const maxLeft = leftIndent * maxDepth;

    let nodeWidth: number = 0;
    let maxNodeWidth: number = 0;

    for (let i = 0; i < nodeElements.length; i++) {

        nodeWidth = nodeElements[i].clientWidth;

        if (nodeWidth > maxNodeWidth) {

            maxNodeWidth = nodeWidth;
        }
    }

    let lensWidth = 0;

    if (lensElement) {

        lensWidth = lensElement.clientWidth;
    }

    const width =
        maxNodeWidth +
        lensWidth +
        maxLeft;

    branchesViewElement.style.width = `${width}px`;
};

export default branchViewOnRenderFinished;