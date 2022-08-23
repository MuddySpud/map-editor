import { h, VNode } from "hyperapp-local";

import StringEvent from "../../../../state/ui/payloads/StringEvent";
import gTooltipActions from "../../../../global/actions/gTooltipActions";
import IBookmarkNavigation from "../../../../interfaces/state/tree/IBookmarkNavigation";
import IState from "../../../../interfaces/state/IState";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import gSession from "../../../../global/gSession";
import Filters from "../../../../state/constants/Filters";
import gBookmarkCode from "../../../../global/code/gBookmarkCode";
import selectNodeViews from "../../tabs/nodeLens/views/common/partial/selectNodeViews";
import bookmarkActions from "../actions/bookmarkActions";
import gHtmlActions from "../../../../global/actions/gHtmlActions";
import U from "../../../../global/gUtilities";
import inputErrorViews from "../../lens/views/inputErrorViews";
import BookmarkNavigationElement from "../../../../state/ui/payloads/BookmarkNavigationElement";
import NodeBaseElement from "../../../../state/ui/payloads/NodeBaseElement";

import "../scss/reserves.scss";
import "../scss/bookmark.scss";


const buildRemoveBookmarkView = (option: INode<ILensUI>): VNode | null => {

    const removeView: VNode =

    h("div", {}, [
        h("div",
            {
                class: "btn-delete",
                draggable: "false",
                onClick: [
                    bookmarkActions.deleteBookmark,
                    option
                ],
                onMouseOver: [
                    gTooltipActions.showTooltip,
                    (_event: any) => `Remove 'go to bookmark'`
                ],
                onMouseOut: gTooltipActions.clearTooltip
            },
            ""
        )
    ]);

    return removeView;
};

const buildTargetInputView = (bookmarkNavigation: IBookmarkNavigation): VNode => {

    const key: string = U.isPositiveNumeric(bookmarkNavigation.key) === true ? bookmarkNavigation.key as string : '';

    const view: VNode =

        h("div", { class: "input-wrapper" }, [
            h("input",
                {
                    value: `${key}`,
                    class: "edit",
                    type: "text",
                    placeholder: `...enter the bookmark key...`,
                    onInput: [
                        bookmarkActions.setKey,
                        (event: any) => {
                            return new BookmarkNavigationElement(
                                bookmarkNavigation,
                                event.target,
                            );
                        }
                    ],
                    onBlur: gHtmlActions.clearFocus
                },
                ""
            )
        ]);

    return view;
};

const buildBookmarkTargetDetailsView = (
    state: IState,
    option: INode<ILensUI>,
    bookmarkNavigation: IBookmarkNavigation,
    selectInstruction: string,
    raw: boolean): VNode => {

    selectNodeViews.buildOverlayView(
        state,
        bookmarkNavigation.ui.clickSelect,
        "Clear select target",
        "overlay-target",
        selectInstruction,
        bookmarkActions.cancelTargetClickSelect,
        bookmarkActions.cancelTargetClickSelect // TODO TEMP!!!
    );

    let errorView: VNode | null = null;

    if (raw === false) {

        errorView = inputErrorViews.buildTitleErrorView(
            'Bookmark key',
            bookmarkNavigation.errors
        );
    }

    const detailsView =

        h("div", { class: "key input-box" }, [

            errorView,
            buildRemoveBookmarkView(option),
            buildTargetInputView(bookmarkNavigation)
        ]);

    return detailsView;
};


const optionBookmarkViews = {

    buildButtonView: (option: INode<ILensUI>): VNode | null => {

        const controlsView: VNode =

            h("a",
                {
                    class: `option-bookmark`,
                    onClick: [
                        bookmarkActions.toggleEnableBookmarkNavigation,
                        (event: any) => {
                            return new NodeBaseElement(
                                option,
                                event.target
                            );
                        }
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                "Enable 'navigate to bookmark'",
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "location-icon" }, ""),
                ]);

        return controlsView;
    },

    buildView: (
        state: IState,
        option: INode<ILensUI>): VNode | null => {

        if (!option.reserve.bookmarkNavigation) {

            return null;
        }

        const bookmarkNavigation: IBookmarkNavigation | null = option.reserve.bookmarkNavigation;

        if (bookmarkNavigation.ui.raw === true) {

            state.lens.nodeTab.enableSave = false;
            gSession.setFocusFilter(Filters.bookmarkNavKeyFocusFilter);
        }

        if (!bookmarkNavigation.ui.raw
            || bookmarkNavigation.key.length === 0) {

            gBookmarkCode.validateTabForSelectBookmarkTarget(
                state,
                state.lens.nodeTab,
                option
            );
        }

        const raw: boolean =
            bookmarkNavigation.ui.raw
            && bookmarkNavigation.key.length > 0;

        const view: VNode =

            h("div", { class: "bookmark-navigation" }, [
                h("h3", {}, "Navigate to bookmark"),
                h("div", { class: "bookmark-navigation-content" }, [

                    buildBookmarkTargetDetailsView(
                        state,
                        option,
                        bookmarkNavigation,
                        "Select the target discussion",
                        raw
                    )
                ])
            ]);

        return view;
    },

    // MOVE THIS OFF TO PLUGINS!!!!!!!!!!!!!!!!
    // buildImagesButtonView: (enabled: boolean): VNode | null => {

    //     if (window.TreeSolve.discussionPlugins.runsInBackground()) {

    //         return null;
    //     }

    //     let iconClass: string;
    //     let tooltip: string;

    //     if (enabled === true) {

    //         iconClass = "hide-slash-icon";
    //         tooltip = "Disable using images in options";
    //     }
    //     else {
    //         iconClass = "show-slash-icon";
    //         tooltip = "Enable using images in options";
    //     }

    //     const controlsView: VNode =

    //         h("a",
    //             {
    //                 class: `options-images`,
    //                 onClick: [
    //                     pluginActions.toggleEnableOptionPlugins
    //                 ],
    //                 onMouseOver: [
    //                     gTooltipActions.showTooltipWithEvent,
    //                     (event: any) => {
    //                         return new StringEvent(
    //                             tooltip,
    //                             event
    //                         );
    //                     }
    //                 ],
    //                 onMouseOut: gTooltipActions.clearTooltip
    //             },
    //             [
    //                 h("div", { class: "options-images-icon" }, ""),
    //                 h("div", { class: `${iconClass}` }, "")
    //             ]);

    //     return controlsView;
    // }
};

export default optionBookmarkViews;


