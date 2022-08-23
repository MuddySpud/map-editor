import IState from "../../../interfaces/state/IState";
import branchesCoreSubscriptions from "../../core/branchesCore/subscriptions/branchesCoreSubscriptions";
import treesCoreSubscriptions from "../../core/treesCore/subscriptions/treesCoreSubscriptions";
import repeatSubscriptions from "../../../subscriptions/repeatSubscription";
import lightBoxSubscriptions from "../../lightBox/subscriptions/lightBoxSubscriptions";


const initSubscriptions = (state: IState): any[] => {

    if (!state) {
        
        return [];
    }

    const subscriptions: any[] = [

        ...branchesCoreSubscriptions(state)
        ,
        ...treesCoreSubscriptions(state)
        ,
        ...lightBoxSubscriptions(state)
        ,
        ...repeatSubscriptions.buildRepeatSubscriptions(state)
        ,
    ];

    return subscriptions;
};

export default initSubscriptions;

