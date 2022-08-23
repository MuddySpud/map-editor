import IState from "../../../../interfaces/state/IState";
import treeSubscriptions from "../../../displays/branchesDisplay/subscriptions/treeSubscriptions";


const branchesCoreSubscriptions = (state: IState) => {

    const view = [
        ...treeSubscriptions(state)
        ,
    ];

    return view;
}

export default branchesCoreSubscriptions;

