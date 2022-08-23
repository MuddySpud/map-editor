import IState from "../../../../../../interfaces/state/IState";


// This only manipulates the views - not state
const spreadViewActions = {

    removeClassFromTreeBox: (className: string): void => {

        const branchesView: HTMLDivElement = document.getElementById("spreadLensUI") as HTMLDivElement;

        if (!branchesView) {
            return;
        }
        
        const old: NodeListOf<HTMLDivElement> = branchesView.querySelectorAll(`.${className}`) as NodeListOf<HTMLDivElement>;

        if (!old) {
            return;
        }

        for (let i = 0; i < old.length; i++) {

            old[i].classList.remove(className);
        };
    },

    onSpreadMouseEnter: (
        state: IState,
        element: HTMLElement): IState => {

        if (element
            && element.parentElement) {
            const expander: HTMLDivElement = element.parentElement.querySelector(`.spread-expand`) as HTMLDivElement;

            if (expander) {

                spreadViewActions.removeClassFromTreeBox("spread-hovered");
                expander.classList.add("spread-hovered");
            }
        }

        return state;
    },

    onSpreadMouseLeave: (
        state: IState,
        _element: HTMLElement): IState => {

        spreadViewActions.removeClassFromTreeBox("spread-hovered");

        return state;
    }
};

export default spreadViewActions;
