import IState from "../../../../interfaces/state/IState";


// This only manipulates the views - not state
const optionViewActions = {

    removeClassFromTreeBox: (className: string): void => {

        const branchesView: HTMLDivElement = document.getElementById("branchesView") as HTMLDivElement;
        const old: NodeListOf<HTMLDivElement> = branchesView.querySelectorAll(`.${className}`) as NodeListOf<HTMLDivElement>;

        for (let i = 0; i < old.length; i++) {
            old[i].classList.remove(className);
        };
    },

    onOptionMouseEnter: (
        state: IState,
        element: HTMLElement): IState => {

        if (element
            && element.parentElement) {
            const expander: HTMLDivElement = element.parentElement.querySelector(`.option-expand`) as HTMLDivElement;

            if (expander) {
                optionViewActions.removeClassFromTreeBox("option-hovered");
                expander.classList.add("option-hovered");
            }
        }

        return state;
    },

    onOptionMouseLeave: (
        state: IState,
        _element: HTMLElement): IState => {

        optionViewActions.removeClassFromTreeBox("option-hovered");

        return state;
    }
};

export default optionViewActions;
