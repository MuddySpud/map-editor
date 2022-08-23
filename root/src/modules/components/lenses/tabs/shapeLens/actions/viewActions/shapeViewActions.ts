import IState from "../../../../../../interfaces/state/IState";


// This only manipulates the views - not state
const shapeViewActions = {

    removeClassFromTreeBox: (className: string): void => {

        const branchesView: HTMLDivElement = document.getElementById("shapeLensUI") as HTMLDivElement;

        if (branchesView) {

            const old: NodeListOf<HTMLDivElement> = branchesView.querySelectorAll(`.${className}`) as NodeListOf<HTMLDivElement>;

            for (let i = 0; i < old.length; i++) {

                old[i].classList.remove(className);
            };
        }
    },

    onShapeMouseEnter: (
        state: IState,
        element: HTMLElement): IState => {

        if (element
            && element.parentElement) {

            const expander: HTMLDivElement = element.parentElement.querySelector(`.shape-expand`) as HTMLDivElement;

            if (expander) {
                
                shapeViewActions.removeClassFromTreeBox("shape-hovered");
                expander.classList.add("shape-hovered");
            }
        }

        return state;
    },

    onShapeMouseLeave: (
        state: IState,
        _element: HTMLElement): IState => {

        shapeViewActions.removeClassFromTreeBox("shape-hovered");

        return state;
    }
};

export default shapeViewActions;
