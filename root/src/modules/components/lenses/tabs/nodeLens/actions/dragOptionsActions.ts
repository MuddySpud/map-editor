import IState from "../../../../../interfaces/state/IState";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import gStateCode from "../../../../../global/code/gStateCode";
import { ActionType } from "../../../../../interfaces/enums/ActionType";


const dragOptionsActions = {

    dragOptionStarted: (
        state: IState,
        event: DragEvent): IState => {

        if (!event.target) {

            return state;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const ui: ILensUI = lensNode.ui;

        let focusedDiv = ui.draggedDivFocus as HTMLDivElement;

        if (focusedDiv !== event.target
            || !focusedDiv.classList.contains("drag")) {

            event.preventDefault();

            return state;
        }

        let target: HTMLDivElement = event.target as HTMLDivElement;

        if (event.dataTransfer) {

            ui.dragOptionSource = target;
            event.dataTransfer.setData("text/plain", target.innerHTML);
            event.dataTransfer.effectAllowed = "move";
        }

        return state;
    },

    dragOptionOver: (
        state: IState,
        event: DragEvent): IState => {

        if (!event.target
            || !event.dataTransfer) {

            return state;
        }

        event.preventDefault();
        event.stopPropagation();

        const target: HTMLElement = event.target as HTMLElement;
        const orderSpan: HTMLSpanElement = target.querySelector(`span.order`) as HTMLSpanElement;

        if (orderSpan
            && orderSpan.textContent) {

            const order: number = +orderSpan.textContent;
            const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
            lensNode.ui.draggedOverOrder = order;
        }

        event.dataTransfer.dropEffect = "move";

        return gStateCode.cloneState(state);
    },

    droppedOption: (
        state: IState,
        event: Event): IState => {

        event.preventDefault();
        event.stopPropagation();

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const ui: ILensUI = lensNode.ui;
        let target: HTMLLIElement = event.target as HTMLLIElement;

        ui.draggedOverOrder = null;

        if (!target
            || !target.classList.contains("drop")) {

            //check to see if the element is the order number div located inside the target
            if (!target.classList.contains("order")
                || !target.parentElement
                || !target.parentElement.classList.contains("drop")) {

                return state;
            }
        }

        let source: HTMLDivElement = ui.dragOptionSource as HTMLDivElement;

        if (!source) {

            return state;
        }

        let optionsList: HTMLUListElement = source.closest("#optionsList") as HTMLUListElement;
        let optionLIs = optionsList.getElementsByTagName("li");
        let fromIndex = -1;
        let toIndex = -1;
        let dragHandle = null;

        for (let i = 0; i < optionLIs.length; i++) {
            dragHandle = optionLIs[i].querySelector(".drag");

            if (dragHandle === source) {
                fromIndex = i;
            }

            if (dragHandle === target) {
                toIndex = i;
            }
        }

        if (fromIndex === toIndex) {

            return state;
        }

        let option: INode<ILensUI>;
        const options: Array<INode<ILensUI>> = lensNode.nodes;
        const visibleOptions: Array<INode<ILensUI>> = new Array<INode<ILensUI>>();
        const hiddenOptions: Array<INode<ILensUI>> = new Array<INode<ILensUI>>();

        options.forEach(o => {

            if (o.action === ActionType.DeleteNode) {

                hiddenOptions.push(o);
            }
            else {
                visibleOptions.push(o);
            }
        });

        let movedOption: INode<ILensUI> = visibleOptions[fromIndex];
        let newOptions: Array<INode<ILensUI>> = new Array<INode<ILensUI>>();
        let order = 0;

        let addOption = (option: INode<ILensUI>) => {

            newOptions.push(option);
            option.order = ++order;
        };

        let addOptions = (
            option: INode<ILensUI>,
            index: number) => {

            if (fromIndex < toIndex) {
                // Then add before moved node
                addOption(option);
            }

            if (index === toIndex) {

                addOption(movedOption);
            }

            if (fromIndex > toIndex) {
                // Then add after moved node
                addOption(option);
            }
        };

        for (let i = 0; i < visibleOptions.length; i++) {

            option = visibleOptions[i];

            if (i === fromIndex) {
                continue;
            }

            addOptions(option, i);
        }

        newOptions.push(...hiddenOptions);
        lensNode.nodes = newOptions;
        lensNode.ui.raw = false;

        return gStateCode.cloneState(state);
    },

    setDraggedDivFocus: (
        state: IState,
        event: Event): IState => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const ui: ILensUI = lensNode.ui;

        if (event
            && event.target) {
                
            ui.draggedDivFocus = event.target as HTMLDivElement;
        }

        return state;
    },

    dragOptionLeave: (
        state: IState,
        event: Event): IState => {

        event.preventDefault();
        event.stopPropagation();

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const ui: ILensUI = lensNode.ui;
        ui.draggedOverOrder = null;

        return gStateCode.cloneState(state);
    },

    dragOptionEnd: (
        state: IState,
        event: Event): IState => {

        event.preventDefault();
        event.stopPropagation();

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const ui: ILensUI = lensNode.ui;
        ui.draggedOverOrder = null;

        return gStateCode.cloneState(state);
    },
};

export default dragOptionsActions;
