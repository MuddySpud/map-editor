import { VNode } from "hyperapp-local";

import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import editSubtreeViews from "./editSubtreeViews";
import IState from "../../../../../../../interfaces/state/IState";
import IStRootElement from "../../../../../../../interfaces/state/ui/payloads/IStRootElement";
import IStSocketElement from "../../../../../../../interfaces/state/ui/payloads/IStSocketElement";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";

import '../../../scss/subtree2.scss';


const createSubtreeViews = {

    buildInputView: (
        subtree: ISubtreeSys,
        setRootTextActionDelegate: (
            state: IState,
            payload: IStRootElement) => IState,
        setSocketTextActionDelegate: (
            state: IState,
            payload: IStSocketElement) => IState,
        addSocketActionDelegate: (
            state: IState,
            payload: IStSocketElement) => IState,
        deleteSocketActionDelegate: (
            state: IState,
            payload: IStSocketElement) => IState,
        behaviour: IStageBehaviour
    ): VNode[] => {

        if (!subtree) {

            return [];
        }

        const view: VNode[] = [

            editSubtreeViews.buildStRootTextTitleInputView(
                subtree.stRoot,
                setRootTextActionDelegate,
                behaviour
            ),

            editSubtreeViews.buildStSocketInputViews(
                subtree,
                setSocketTextActionDelegate,
                addSocketActionDelegate,
                deleteSocketActionDelegate,
                behaviour
            )
        ];

        return view;
    }
};

export default createSubtreeViews;


