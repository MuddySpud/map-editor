import { h, VNode } from "hyperapp-local";

import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import treeDetailsViews from "../../tree/partial/treeDetailsViews";
import headerControlViews from "../../../../../lens/views/headerControlViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import subtreeDetailsViews from "./subtreeDetailsViews";
import gSubtreeActions from "../../../../../../../global/actions/gSubtreeActions";
import ITreeStats from "../../../../../../../interfaces/state/tree/ITreeStats";
import NodeBase from "../../../../../../../state/tree/NodeBase";
import flawsViews from "./flawsViews";
import treeMinMaxViews from "../../tree/partial/minMaxViews";
import subtreeRowViews from "./subtreeRowViews";
import IStSocket from "../../../../../../../interfaces/state/tree/IStSocket";
import U from "../../../../../../../global/gUtilities";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";


const buildStSocketMaximisedView = (
    stSocket: IStSocket,
    index: number): VNode => {

    let socketDetailsClass: string = "action-details socket-details";
    socketDetailsClass = stSocket.ui.minimiseHoles === false ? `${socketDetailsClass} expanded-holes` : socketDetailsClass;

    const view: VNode =

        h("div", { class: "stSocket-box" }, [
            h("h4", {}, `StSocket ${index}`),
            h("div", { class: `${socketDetailsClass}` }, [

                buildStSocketControlView(
                    stSocket,
                    false),

                h("div", { class: "tree" }, [

                    subtreeRowViews.buildSocketTextView(stSocket, CssClasses.odd),
                    subtreeRowViews.buildSocketKeyView(stSocket)
                ]),

                minMaxViews.buildCollapsibleHolesView(stSocket, "Mapped holes")
            ])
        ]);

    return view;
};

const buildStSocketMinimisedView = (
    stSocket: IStSocket,
    index: number): VNode => {

    const view: VNode =

        h("div", { class: "stSocket-box" }, [
            h("h4", {}, `StSocket ${index}`),
            h("div", { class: "action-details minimised" }, [

                buildStSocketControlView(
                    stSocket,
                    true),

                h("div", { class: "tree" }, [

                    subtreeRowViews.buildSocketTextView(stSocket, CssClasses.odd),
                ])
            ])
        ]);

    return view;
};

const buildStSocketControlView = (
    stSocket: IStSocket,
    isMinimised: boolean): VNode => {

    let tooltip: string = " the stSocket";

    if (isMinimised === false) {

        tooltip = `Minimise${tooltip}`;
    }
    else {
        tooltip = `Maximise${tooltip}`;
    }

    return headerControlViews.buildMinimiseDataView(
        tooltip,
        stSocket,
        gSubtreeActions.toggleMinimiseStSocket,
        isMinimised
    );
};

const buildStSocketsMaximisedView = (subtree: ISubtreeSys): VNode => {

    const stSocketViews: VNode[] = [];
    let stSocketView: VNode;
    let counter: number = 0;

    subtree.stSockets.forEach((stSocket: IStSocket) => {

        stSocketView = minMaxViews.buildCollapsibleStSocketView(
            stSocket,
            ++counter);

        stSocketViews.push(stSocketView);
    });

    const view: VNode =

        h("div", { class: "sockets-details" }, stSocketViews);

    return view;
};

// const buildStSocketsMinimisedView = (subtree: ISubtreeSys): VNode => {

//     let stSocketsMessage: string = `${subtree.stSockets.length} stSocket`;
//     stSocketsMessage = subtree.stSockets.length > 1 ? `${stSocketsMessage}s` : stSocketsMessage;
//     stSocketsMessage = `${stSocketsMessage} - maximise to view`;

//     const view: VNode =

//         h("div", { class: "action-details sockets-details no-title minimised" }, [

//             buildStSocketsControlView(
//                 subtree,
//                 true),

//             h("div", { class: "socket-message" }, `${stSocketsMessage}`)
//         ]);

//     return view;
// };

// const buildStSocketsControlView = (
//     subtree: ISubtreeSys,
//     isMinimised: boolean): VNode => {

//     let tooltip: string = " the stSockets";

//     if (isMinimised === false) {

//         tooltip = `Minimise${tooltip}`;
//     }
//     else {
//         tooltip = `Maximise${tooltip}`;
//     }

//     return headerControlViews.buildMinimiseDataView(
//         tooltip,
//         subtree,
//         gSubtreeActions.toggleMinimiseStSockets,
//         isMinimised
//     );
// };

const buildStRootMaximisedView = (subtree: ISubtreeSys): VNode => {

    const view: VNode =

        h("div", { class: "action-details" }, [

            buildStRootControlView(
                subtree,
                false),

            ...subtreeDetailsViews.buildStRootDetailsView(subtree.stRoot),
        ]);

    return view;
};

const buildStRootMinimisedView = (subtree: ISubtreeSys): VNode => {

    const view: VNode =

        h("div", { class: "action-details minimised" }, [

            buildStRootControlView(
                subtree,
                true),

            h("div", { class: "tree" }, [

                subtreeRowViews.buildStRootTextView(subtree.stRoot, CssClasses.odd),
            ])
        ]);

    return view;
};

const buildStRootControlView = (
    subtree: ISubtreeSys,
    isMinimised: boolean): VNode => {

    let tooltip: string = " the stRoot";

    if (isMinimised === false) {

        tooltip = `Minimise${tooltip}`;
    }
    else {
        tooltip = `Maximise${tooltip}`;
    }

    return headerControlViews.buildMinimiseDataView(
        tooltip,
        subtree,
        gSubtreeActions.toggleMinimiseStRoot,
        isMinimised
    );
};

const buildCountsMaximisedView = (
    subtree: ISubtreeSys,
    treeStats: ITreeStats): VNode => {

    const view: VNode =

        h("div", { class: "action-details" }, [

            buildCountsControlView(
                subtree,
                false),

            h("div", { class: "stats" }, [

                treeDetailsViews.buildReferenceCountView(treeStats, CssClasses.odd),
                treeDetailsViews.buildMappedHolesCountView(treeStats),
                treeDetailsViews.buildUnMappedHolesCountView(treeStats, CssClasses.odd)
            ])
        ]);

    return view;
};

const buildCountsMinimisedView = (
    subtree: ISubtreeSys,
    treeStats: ITreeStats): VNode => {

    const view: VNode =

        h("div", { class: "action-details minimised" }, [

            buildCountsControlView(
                subtree,
                true),

            h("div", { class: "stats" }, [

                treeDetailsViews.buildReferenceCountView(treeStats, CssClasses.odd)
            ])
        ]);

    return view;
};

const buildFlawsMaximisedView = (
    subtree: ISubtreeSys,
    flaws: INodeBase[]): VNode => {

    let title: string = `Un-mapped hole`;
    title = flaws.length > 1 ? `${title}s` : title;

    const buildNotes = (): VNode => {

        const view: VNode =

            h("ul", {}, [
                h("li", { class: "notes" }, "Warnings can be ignored at this stage."),
                h("li", { class: "notes" }, "They will need to be addressed before any tree that references this subtree can be published."),
                h("li", { class: "notes" }, "Local to this subtree only."),
                h("li", { class: "notes" }, "Errors in referenced subtrees are shown in a full validation or publish.")
            ]);

        return view;
    };

    const flawViews: VNode[] = [];
    let flawView: VNode | null;
    let index: number = 0;

    flaws.forEach((flaw) => {

        flawView = flawsViews.buildFlawView(
            flaw,
            ++index);

        if (flawView) {

            flawViews.push(flawView);
        }
    });

    const view: VNode =

        h("div", { class: "warnings" }, [
            h("h4", {}, `${title}`),
            h("div", { class: "warnings-box action-details" }, [

                buildFlawsControlView(
                    subtree,
                    false),

                h("div", { class: "flaws" }, [

                    buildNotes(),
                    ...flawViews
                ])
            ])
        ]);

    return view;
};

const buildFlawsMinimisedView = (
    subtree: ISubtreeSys,
    flaws: INodeBase[]): VNode => {

    let flawMessage: string = `${flaws.length} hole`;
    flawMessage = flaws.length > 1 ? `${flawMessage}s` : flawMessage;

    const view: VNode =

        h("div", { class: "warnings" }, [
            h("div", { class: "action-details minimised no-title" }, [

                buildFlawsControlView(
                    subtree,
                    true),

                h("div", { class: "flaws" }, [
                    h("div", { class: "flaw-message" }, `${flawMessage}`)
                ])
            ])
        ]);

    return view;
};

const buildFlawsControlView = (
    subtree: ISubtreeSys,
    isMinimised: boolean): VNode => {

    let tooltip: string = " the subtree flaws";

    if (isMinimised === false) {

        tooltip = `Minimise${tooltip}`;
    }
    else {
        tooltip = `Maximise${tooltip}`;
    }

    return headerControlViews.buildMinimiseDataView(
        tooltip,
        subtree,
        gSubtreeActions.toggleMinimiseSubtreeFlaws,
        isMinimised
    );
};

const buildHolesMaximisedView = (
    stSocket: IStSocket,
    _title: string): VNode => {

    const holeViews: VNode[] = [];
    let holeView: VNode | null;
    let index: number = 0;

    stSocket.holes.forEach((hole) => {

        holeView = flawsViews.buildFlawView(
            hole,
            ++index);

        if (holeView) {

            holeViews.push(holeView);
        }
    });

    let holeMessage: string = `${stSocket.holes.length} mapped hole`;
    holeMessage = stSocket.holes.length > 1 ? `${holeMessage}s` : holeMessage;

    const view: VNode =

        h("div", { class: "holes-box" }, [
            h("h4", {}, `${holeMessage}`),
            h("div", { class: "holes-details" }, [

                buildHolesControlView(
                    stSocket,
                    false),

                h("div", { class: "holes" }, [

                    ...holeViews
                ])
            ])
        ]);

    return view;
};

const buildHolesMinimisedView = (stSocket: IStSocket): VNode => {

    let holeMessage: string = `${stSocket.holes.length} mapped hole`;
    holeMessage = stSocket.holes.length > 1 ? `${holeMessage}s` : holeMessage;
    holeMessage = `${holeMessage} - maximise to view`;

    const view: VNode =

        h("div", { class: "holes-box" }, [
            h("div", { class: "action-details holes-details minimised" }, [

                buildHolesControlView(
                    stSocket,
                    true),

                h("div", { class: "holes" }, [
                    h("div", { class: "hole-message" }, `${holeMessage}`)
                ])
            ])
        ]);

    return view;
};

const buildHolesControlView = (
    stSocket: IStSocket,
    isMinimised: boolean): VNode => {

    let tooltip: string = " the socket mapped holes";

    if (isMinimised === false) {

        tooltip = `Minimise${tooltip}`;
    }
    else {
        tooltip = `Maximise${tooltip}`;
    }

    return headerControlViews.buildMinimiseDataView(
        tooltip,
        stSocket,
        gSubtreeActions.toggleMinimiseSocketHoles,
        isMinimised
    );
};

const buildCountsControlView = (
    subtree: ISubtreeSys,
    isMinimised: boolean): VNode => {

    let tooltip: string = " the subtree counts";

    if (isMinimised === false) {

        tooltip = `Minimise${tooltip}`;
    }
    else {
        tooltip = `Maximise${tooltip}`;
    }

    return headerControlViews.buildMinimiseDataView(
        tooltip,
        subtree,
        gSubtreeActions.toggleMinimiseSubtreeCounts,
        isMinimised
    );
};

const minMaxViews = {

    buildCollapsibleDetailsView: (
        subtree: ISubtreeSys,
        treeStats: ITreeStats | null,
        flaws: NodeBase[]
    ): VNode[] => {

        const view: VNode[] = [

            ...treeMinMaxViews.buildCollapsibleDetailsView(
                subtree.tree,
                "Tree"
            ),

            ...minMaxViews.buildCollapsibleStRootView(
                subtree,
                "StRoot"
            ),

            minMaxViews.buildCollapsibleStSocketsView(subtree),

            ...minMaxViews.buildCollapsibleCountsView(
                subtree,
                treeStats,
                "Counts"
            ),

            minMaxViews.buildCollapsibleFlawsView(
                subtree,
                flaws
            )
        ];

        return view;
    },

    buildCollapsibleSubtreeDetailsView: (
        subtree: ISubtreeSys,
        treeStats: ITreeStats | null,
        flaws: INodeBase[]
    ): VNode[] => {

        const view: VNode[] = [

            ...minMaxViews.buildCollapsibleStRootView(
                subtree,
                "StRoot"
            ),

            minMaxViews.buildCollapsibleStSocketsView(subtree),

            ...minMaxViews.buildCollapsibleCountsView(
                subtree,
                treeStats,
                "Counts"
            ),

            minMaxViews.buildCollapsibleFlawsView(
                subtree,
                flaws
            )
        ];

        return view;
    },

    buildCollapsibleStRootView: (
        subtree: ISubtreeSys,
        title: string): VNode[] => {

        let innardsView: VNode;

        if (subtree.ui.minimiseStRoot === true) {

            innardsView = buildStRootMinimisedView(subtree);
        }
        else {
            innardsView = buildStRootMaximisedView(subtree);
        }

        const view: VNode[] = [

            h("h4", {}, `${title}`),

            innardsView
        ];

        return view;
    },

    buildCollapsibleStSocketsView: (subtree: ISubtreeSys): VNode => {

        if (subtree.stSockets.length === 0) {

            return h("h4", { class: "no-sockets" }, "No stSockets");
        }
        // else if (subtree.ui.minimiseStSockets === true) {

        //     return buildStSocketsMinimisedView(subtree);
        // }

        return buildStSocketsMaximisedView(subtree);
    },

    buildCollapsibleStSocketView: (
        stSocket: IStSocket,
        index: number): VNode => {

        if (stSocket.ui.minimise === true) {

            return buildStSocketMinimisedView(
                stSocket,
                index);
        }

        return buildStSocketMaximisedView(
            stSocket,
            index);
    },

    buildCollapsibleCountsView: (
        subtree: ISubtreeSys,
        treeStats: ITreeStats | null,
        title: string): VNode[] => {

        if (!treeStats) {
            return [];
        }

        let innardsView: VNode;

        if (subtree.ui.minimiseCounts === true) {

            innardsView = buildCountsMinimisedView(
                subtree,
                treeStats
            );
        }
        else {
            innardsView = buildCountsMaximisedView(
                subtree,
                treeStats
            );
        }

        const view: VNode[] = [

            h("h4", {}, `${title}`),

            innardsView
        ];

        return view;
    },

    buildCollapsibleFlawsView: (
        subtree: ISubtreeSys,
        flaws: INodeBase[]): VNode => {

        if (!flaws
            || flaws.length === 0) {

            return h("h4", { class: "no-holes" }, "No un-mapped holes");
        }

        if (subtree.ui.minimiseFlaws === true) {

            return buildFlawsMinimisedView(
                subtree,
                flaws
            );
        }

        return buildFlawsMaximisedView(
            subtree,
            flaws
        );
    },

    buildCollapsibleHolesView: (
        stSocket: IStSocket,
        title: string): VNode | null => {

        if (U.isNegativeNumeric(stSocket.key) === true) {

            return null;
        }

        if (!stSocket.holes
            || stSocket.holes.length === 0) {

            const view: VNode =

                h("div", { class: "holes-box" }, [
                    h("h4", { class: "no-holes" }, "No mapped holes")
                ]);

            return view;
        }

        if (stSocket.ui.minimiseHoles === true) {

            return buildHolesMinimisedView(stSocket);
        }

        return buildHolesMaximisedView(
            stSocket,
            title);
    }
};

export default minMaxViews;


