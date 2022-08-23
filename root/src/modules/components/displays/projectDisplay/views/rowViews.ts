import { h, VNode } from "hyperapp-local";

import cellViews from "./cellViews";
import ITreeProject from "../../../../interfaces/state/tree/ITreeProject";
import ISubtreeProject from "../../../../interfaces/state/tree/ISubtreeProject";


const buildProjectSubtrees = (
    tree: ITreeProject,
    selectionMade: boolean,
    selectedKey: string): VNode => {

    const subtreeRowViews: VNode[] = [];
    let subtreeRowView: VNode | null;

    tree.subtrees.forEach((subtree: ISubtreeProject) => {

        subtreeRowView = buildSubtreeProjectView(
            subtree,
            selectionMade,
            selectedKey
        );

        if (subtreeRowView) {

            subtreeRowViews.push(subtreeRowView);
        }
    });

    const view: VNode =

        h("div", { class: "subtree-table" },

            subtreeRowViews
        );

    return view;
};

const buildSubtreeProjectView = (
    subtreeProject: ISubtreeProject,
    selectionMade: boolean,
    selectedKey: string): VNode => {

    const view: VNode =

        h("div", { class: "subtree-project" }, [

            buildSubtreeProjectRowView(
                subtreeProject,
                selectionMade,
                selectedKey
            ),

            buildSubtreeProjectChildren(
                subtreeProject,
                selectionMade,
                selectedKey
            ),
        ]);

    return view;
};

const buildSubtreeProjectChildren = (
    subtreeProject: ISubtreeProject,
    selectionMade: boolean,
    selectedKey: string): VNode | null => {

    if (!subtreeProject.ui.expanded) {

        return null
    }

    return rowViews.buildProjectChildren(
        subtreeProject,
        selectionMade,
        selectedKey
    )
};

const buildProjectAux = (_tree: ITreeProject): VNode => {

    const view: VNode =

        h("div", { class: "aux-table" }, [


        ])

    return view;
};

const buildSubtreeProjectRowView = (
    subtreeProject: ISubtreeProject,
    selectionMade: boolean,
    selectedKey: string): VNode => {

    const show: boolean = subtreeProject.ui.show === true;
    const selected: boolean = selectionMade && subtreeProject.key === selectedKey;

    if (show) {

        subtreeProject.ui.show = false;
    }

    const view: VNode =

        h("div", { class: "project-table" }, [
            h("div",
                {
                    key: `${subtreeProject.key}`,
                    class: {
                        "project-row": true,
                        "selected": selected,
                        "scroll-show": show
                    }
                },
                [
                    h("div", { class: "project-buttons" }, [

                        cellViews.buildSubtreeCell(subtreeProject),
                        cellViews.buildTreeCell(subtreeProject),
                        cellViews.buildBranchesCell(subtreeProject)
                    ]),

                    cellViews.buildExpandCell(subtreeProject),
                    cellViews.buildProjectCell(subtreeProject),
                    cellViews.buildNameCell(subtreeProject)
                ]
            )
        ]);

    return view;
};

const rowViews = {

    buildTreeProjectRowView: (
        treeProject: ITreeProject,
        selectionMade: boolean,
        selectedKey: string): VNode => {

        const show: boolean = treeProject.ui.show === true;
        const selected: boolean = selectionMade && treeProject.key === selectedKey;

        if (show) {

            treeProject.ui.show = false;
        }

        const view: VNode =

            h("div", { class: "project-table" }, [
                h("div",
                    {
                        key: `${treeProject.key}`,
                        class: {
                            "project-row": true,
                            "selected": selected,
                            "scroll-show": show
                        }
                    },
                    [
                        h("div", { class: "project-buttons" }, [

                            cellViews.buildBlankCell(treeProject.isBot === false),
                            cellViews.buildBlankCell(treeProject.isSubtree === false),
                            cellViews.buildBotCell(treeProject),
                            cellViews.buildSubtreeCell(treeProject),
                            cellViews.buildTreeCell(treeProject),
                            cellViews.buildBranchesCell(treeProject)
                        ]),

                        cellViews.buildProjectCell(treeProject),
                        cellViews.buildNameCell(treeProject)
                    ]
                )
            ]);

        return view;
    },

    buildProjectChildren: (
        treeProject: ITreeProject,
        selectionMade: boolean,
        selectedKey: string): VNode => {

        const view: VNode =

            h("div", { class: "project-children" }, [

                buildProjectSubtrees(
                    treeProject,
                    selectionMade,
                    selectedKey),

                buildProjectAux(treeProject)
            ]);

        return view;
    }
};

export default rowViews;


