import IState from "../../interfaces/state/IState";
import gStateCode from "../code/gStateCode";
import gShapeCode from "../code/gShapeCode";
import ShapeCase from "../../state/cases/ShapeCase";


const gShapeActions = {

    loadShapeCase: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        if (!state.lens.shapeTab.shapeCase) {

            state.lens.shapeTab.shapeCase = new ShapeCase();
        }

        gShapeCode.loadShapeCase(
            state,
            response.jsonData,
            state.lens.shapeTab.shapeCase
        );

        return gStateCode.cloneState(state);
    }
};

export default gShapeActions;
