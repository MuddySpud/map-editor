import IState from "../../../interfaces/state/IState";
import IStateAnyArray from "../../../interfaces/state/IStateAnyArray";
import State from "../../../state/State";
import TreeSolve from "../../../state/window/TreeSolve";
import pluginConfig from "../../../config/pluginConfig";
import initActions from "../actions/initActions";


// const debugFix = (): void => {

//     if (window.location.href.startsWith("https://localhost:")) {

//         // IdentityServer has the callback address as 127.0.0.1 not locahost
//         // This means the localstorage is written to the localhost url and requested on callback from the 127.0.0.1 url
//         // so is null
//         window.location.href = window.location.href.replace("https://localhost:", "https://127.0.0.1:")
//     }
// };

const initialiseState = (): IState => {

    // debugFix();

    window.TreeSolve = new TreeSolve();
    const state: IState = new State();
    pluginConfig.register();

    return state;
};


const initState = {

    initialise: (): IStateAnyArray => {

        const state: IState = initialiseState();

        if (state?.settings?.useVsCode === true) 
        {
            return initActions.initialiseWithoutAuthorisation(state);
        }

        return initActions.initialiseWithAuthorisation(state);
    }
};

export default initState;

