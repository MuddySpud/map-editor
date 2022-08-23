import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import IState from "../../interfaces/state/IState";
import INode from "../../interfaces/state/tree/INode";
import U from "../gUtilities";
import gBranchesStateCode from "./gBranchesStateCode";
import ITabSave from "../../interfaces/state/ui/tabs/ITabSave";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import IBookmarkNavigation from "../../interfaces/state/tree/IBookmarkNavigation";
import INodeBase from "../../interfaces/state/tree/INodeBase";


const gBookmarkCode = {

    disableClickSelect: (bookmarkNavigation: IBookmarkNavigation): void => {

        bookmarkNavigation.ui.clickSelect = false;
    },

    validateBookmarkNavigation: (
        option: INode<ILensUI>,
        bookmarkNavigation: IBookmarkNavigation): void => {

        if (U.isNullOrWhiteSpace(bookmarkNavigation.key) === true) {

            bookmarkNavigation.errors.push(`Key cannot be empty. `);

            return;
        }

        if (!bookmarkNavigation.node) {

            bookmarkNavigation.errors.push(`Target could not be found. `);

            return;
        }

        const target: INodeBase = bookmarkNavigation.node;

        if (target.isLink === true) {

            bookmarkNavigation.errors.push(`Target cannot be a link. `);
        }

        if (bookmarkNavigation.key === option.key) {

            bookmarkNavigation.errors.push(`Option and target cannot be the same. `);
        }
    },

    validateTabForSelectBookmarkTarget: (
        state: IState,
        tab: ITabSave,
        option: INode<ILensUI>): void => {

        if (!option.reserve.bookmarkNavigation) {

            return;
        }

        const bookmarkNavigation: IBookmarkNavigation = option.reserve.bookmarkNavigation;
        bookmarkNavigation.errors = [];

        gBookmarkCode.validateBookmarkNavigation(
            option,
            bookmarkNavigation
        );

        if (bookmarkNavigation.errors.length > 0) {

            tab.enableSave = false;
        }

        if (U.isNullOrWhiteSpace(bookmarkNavigation.key) === false) {

            gBookmarkCode.checkNodeAppearsInTree(
                state,
                tab,
                bookmarkNavigation,
                'discusssion'
            );
        }
        else {
            tab.enableSave = false;
        }
    },

    checkNodeAppearsInTree: (
        state: IState,
        tab: ITabSave,
        bookmarkNavigation: IBookmarkNavigation,
        nodeType: string): any => {

        const found: INode<IBranchUI> | null = gBranchesStateCode.getTreeNodeFromKey(
            state,
            bookmarkNavigation.key as string
        );

        const errorMessage = `Key does not match any tree ${nodeType}s`;
        const errors = bookmarkNavigation.errors;

        if (found) {

            bookmarkNavigation.ui.recognised = true;
            tab.enableSave = true;

            for (let i = errors.length - 1; i >= 0; i--) {

                if (errors[i] === errorMessage) {

                    errors.splice(i, 1);
                }
            }

            return;
        }

        if (!errors.includes(errorMessage)) {

            errors.push(errorMessage);
        }

        bookmarkNavigation.ui.recognised = false;
        tab.enableSave = false;
    }
};

export default gBookmarkCode;