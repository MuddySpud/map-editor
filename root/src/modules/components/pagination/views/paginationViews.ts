import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";
import IPaginationDetails from "../../../interfaces/state/ui/payloads/IPaginationDetails";
import PaginationDetails from "../../../state/ui/payloads/PaginationDetails";
import gTooltipActions from "../../../global/actions/gTooltipActions";
import IPaginationPayload from "../../../interfaces/state/ui/payloads/IPaginationPayload";
import PaginationPayload from "../../../state/ui/payloads/PaginationPayload";

import '../scss/index.scss';


const paginationViews = {

    buildView: (
        isBottom: boolean,
        paginationDetails: IPaginationDetails,
        actionDelegate: (
            state: IState,
            paginationPayload: IPaginationPayload) => any,
        payload: any
    ): VNode | null => {

        let totalItems: number = isNaN(paginationDetails.totalItems as number) === true ? -1 : paginationDetails.totalItems as number;
        const start = paginationDetails.start;
        let count = paginationDetails.count;
        count = count < 10 ? 10 : count;

        if (totalItems >= 0
            && totalItems <= count) {

            return null;
        }

        const currentIndex: number = (start / count) + 1; // One based indices
        let totalPages: number = totalItems === 0 ? 0 : Math.ceil(totalItems / count);
        const blockButtonCount: number = 5;
        const centreCount: number = Math.ceil(blockButtonCount / 2);
        const maxSideDigits: number = centreCount - 1;
        const pauseSideDigits: number = maxSideDigits - 1;

        let blockStartIndex: number = 2; // First number always draw separately
        let showPreviousPause: boolean = false;

        if (currentIndex > centreCount) {

            blockStartIndex = currentIndex - pauseSideDigits;
            showPreviousPause = true;

            if (blockStartIndex > totalPages - centreCount - pauseSideDigits + 1) {

                blockStartIndex = totalPages - centreCount - pauseSideDigits + 1;
            }

            if (blockStartIndex === 1) {

                blockStartIndex++;  // First number is drawn seperately
            }
        }

        let blockEndIndex: number = totalPages - 1; // Last number always drawn separately
        let showNextPause: boolean = false;

        if (currentIndex < totalPages - maxSideDigits) {

            blockEndIndex = currentIndex + pauseSideDigits;
            showNextPause = true;

            if (blockEndIndex < centreCount + pauseSideDigits) {

                blockEndIndex = centreCount + pauseSideDigits;
            }

            if (blockEndIndex === totalPages) {

                blockEndIndex--;  // Last number is drawn seperately
            }
        }

        if (totalPages > 0) {

            blockEndIndex = blockEndIndex > totalPages ? totalPages : blockEndIndex;
        }

        if (totalPages <= blockButtonCount) {

            showNextPause = false;
            showPreviousPause = false;
        }

        const buildPreviousButton = (): VNode | null => {

            if (start < count) {

                return null;
            }

            const newStart = start - count;

            const view: VNode =

                h("li", {}, [
                    h("a",
                        {
                            onClick: [
                                actionDelegate,
                                (_event: any) => {
                                    return new PaginationPayload(
                                        new PaginationDetails(
                                            newStart,
                                            count,
                                            totalItems
                                        ),
                                        payload
                                    );
                                }
                            ],
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => "Show previous page of results"
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        "<"
                    )
                ]);

            return view;
        };

        const buildNextButton = (): VNode | null => {

            if (totalPages > 0
                && start >= totalItems - count) {

                return null;
            }

            const newStart = start + count;

            const view: VNode =

                h("li", {}, [
                    h("a",
                        {
                            onClick: [
                                actionDelegate,
                                (_event: any) => {
                                    return new PaginationPayload(
                                        new PaginationDetails(
                                            newStart,
                                            count,
                                            totalItems
                                        ),
                                        payload
                                    );
                                }
                            ],
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => "Show next page of results"
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        ">"
                    )
                ]);

            return view;
        };

        const buildPause = (): VNode => {

            const view: VNode =

                h("li", {}, [
                    h("span", {}, "...")
                ]);

            return view;
        };

        const buildPreviousPause = (): VNode | null => {

            if (!showPreviousPause) {

                return null;
            }

            return buildPause();
        };

        const buildNextPause = (): VNode | null => {

            if (!showNextPause) {

                return null;
            }

            return buildPause();
        };

        const buildFirstPageButton = (): VNode | null => {

            return buildPageButton(1);
        };

        const buildLastPageButton = (): VNode | null => {

            return buildPageButton(totalPages);
        };

        const buildPageButton = (index: number): VNode => {

            let selected: boolean;
            let tooltip: string = `Show page ${index} of the results`;;

            if (currentIndex === index) {

                selected = true;
            }
            else {
                selected = false;
            }

            const view: VNode =

                h("li",
                    {
                        class: {
                            selected: selected
                        },
                        onClick: [
                            actionDelegate,
                            (_event: any) => {
                                return new PaginationPayload(
                                    new PaginationDetails(
                                        (index - 1) * count, // back to zero based indices
                                        count,
                                        totalItems
                                    ),
                                    payload
                                );
                            }
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => tooltip
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    [
                        h("a", {}, `${index}`)
                    ]
                );

            return view;
        };

        const buildBlockButtons = (): VNode[] => {

            const blockButtons: VNode[] = [];
            let blockButton: VNode;

            for (let i = blockStartIndex; i <= blockEndIndex; i++) {

                blockButton = buildPageButton(i);

                blockButtons.push(blockButton);
            }

            return blockButtons;
        };

        const buildPaginationButtons = (): VNode => {

            const view =

                h("ul",
                    {
                        class: {
                            bottom: isBottom
                        }
                    },
                    [
                        buildPreviousButton(),
                        buildFirstPageButton(),
                        buildPreviousPause(),
                        ...buildBlockButtons(),
                        buildNextPause(),
                        buildLastPageButton(),
                        buildNextButton(),
                    ]);

            return view;
        };

        const lensTabBodyView: VNode =

            h("div", { class: "pagination-view" }, [
                h("div", { class: "pagination" }, [

                    buildPaginationButtons()

                ])
            ]);

        return lensTabBodyView;
    }
};

export default paginationViews;
