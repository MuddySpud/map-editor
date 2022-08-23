import gTextareaCode from "../../../../global/html/gTextareaCode";
import gSession from "../../../../global/gSession";


const setLensTabBodyScrollTop = (lens: HTMLDivElement) => {

    const tabBody: HTMLDivElement = lens.querySelector(`#tabBody`) as HTMLDivElement;
    const scrollTop: number = gSession.getLensScrollTop();
    tabBody.scrollTop = scrollTop;
};

const setLensHeight = (lens: HTMLDivElement) => {

    const tabBody: HTMLDivElement = lens.querySelector(`#tabBody`) as HTMLDivElement;
    let tabContainer: HTMLDivElement = lens.querySelector(`#tabBox`) as HTMLDivElement;
    const tabHeader: HTMLDivElement = lens.querySelector(`#tabHeader`) as HTMLDivElement;

    // height-calc is a class marker that tells this calculation that it needs to use the tabBody instead of the tabBox for working out the lens height
    // The tabBox is preferable as it is stable.
    // height-calc should only be used for elements that display fleetingly like drop down lists or menus etc
    const heightCalcs: NodeListOf<HTMLDivElement> = lens.querySelectorAll(`.height-calc`) as NodeListOf<HTMLDivElement>;

    if (heightCalcs
        && heightCalcs.length > 0) {

        tabContainer = tabBody;
    }

    if (!tabContainer) {

        lens.style.height = ``;
        tabHeader.classList.remove('shadow');

        return;
    }

    tabContainer.style.height = ""; // Get scroll height after setting height to nothing
    let tabBodyHeight = tabContainer.scrollHeight;

    tabHeader.style.height = ""; // Get scroll height after setting height to nothing
    let tabHeaderHeight = tabHeader.scrollHeight;

    let newHeight = tabBodyHeight + tabHeaderHeight + 4; // 4px to because tabBody bottom is set at 1px so 3px bigger than will be calculated...
    let maxHeight: number = document.documentElement.clientHeight - lens.offsetTop;

    if (newHeight > maxHeight) {

        lens.style.height = '';
        lens.classList.add('full');
    }
    else {
        lens.classList.remove('full');
        lens.style.height = `${newHeight}px`;
    }
};

const setSelectWidths = (lens: HTMLDivElement) => {

    const selectHosts: NodeListOf<HTMLDivElement> = lens.querySelectorAll(`.select-host`) as NodeListOf<HTMLDivElement>;
    let changeButton: HTMLDivElement;
    let selectButton: HTMLButtonElement;
    let dropDown: HTMLDivElement;

    selectHosts.forEach((selectHost: HTMLDivElement) => {

        changeButton = selectHost.querySelector(`div:first-child`) as HTMLDivElement;
        selectButton = selectHost.querySelector(`.change-button .click-select`) as HTMLButtonElement;
        dropDown = selectHost.querySelector(`.drop-down`) as HTMLDivElement;

        if (selectButton
            && dropDown) {

            dropDown.style.width = `${selectButton.clientWidth - 1}px`; // border width is 1px
        }
        else if (changeButton) {

            changeButton.style.width = ''; // needs to be reset as when dropdown is not drawn it inherits the calculated width...
        }
    });
};

const setLensBackgroundSize = (lens: HTMLDivElement) => {

    const heightFraction: number = document.documentElement.clientHeight / lens.clientHeight;
    const widthFraction: number = document.documentElement.clientWidth / lens.clientWidth;
    const heightPercent: number = Math.ceil(heightFraction * 100);
    const widthPercent: number = Math.ceil(widthFraction * 100);

    const lensRect: DOMRect = lens.getBoundingClientRect();
    const x: number = lensRect.left;
    const y: number = lensRect.top;

    lens.style.backgroundSize = `${widthPercent}% ${heightPercent}%`;
    lens.style.backgroundPositionX = `-${x}px`;
    lens.style.backgroundPositionY = `-${y}px`;
    lens.dataset.id = lens.id;
};

const setFocus = () => {

    const filter: string = gSession.getFocusFilter();

    // console.log(`filter: ${filter}`);
    // console.log(document.activeElement);

    if (filter.length === 0) {
        return;
    }

    const element: HTMLElement = document.querySelector(filter) as HTMLElement;

    if (element) {

        element.focus();

        // console.log(`focused on: ${element}`);
    }
};

const lensOnRenderFinished = () => {

    setFocus();

    const lens: HTMLDivElement = document.querySelector('#lens') as HTMLDivElement;

    if (!lens) {
        return;
    }

    gTextareaCode.setAllTextAreaHeights();
    setLensHeight(lens);
    setSelectWidths(lens);
    setLensTabBodyScrollTop(lens);
    setLensBackgroundSize(lens);
};

export default lensOnRenderFinished;
