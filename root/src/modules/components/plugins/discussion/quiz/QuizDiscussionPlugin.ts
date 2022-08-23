import { Children, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import { DiscussionType } from "../../../../interfaces/enums/DiscussionType";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import quizDiscussionViews from "./views/quizDiscussionViews";
import quizCode from "./code/quizCode";
import quizJsonOnRenderFinished from "./code/quizJsonOnRenderFinished";
import IQuizDiscussionPlugin from "./interfaces/IQuizDiscussionPlugin";
import IMdEditor from "../markdown/interfaces/IMdEditor";


export default class QuizDiscussionPlugin implements IQuizDiscussionPlugin {

    public name: string = "Quiz discussion";
    public type: DiscussionType = DiscussionType.QuizJson;
    public mdEditor: IMdEditor | null = null;

    buildDiscussionView(
        state: IState,
        lensNode: INode<ILensUI>): VNode[] {

        quizCode.buildQuizJsonFromDiscussion(
            state,
            lensNode);

        return quizDiscussionViews.buildDiscussionView(
            state,
            lensNode);
    }

    buildButtonsView(
        _state: IState,
        _lensNode: INode<ILensUI>): Children[] {

        return [];
    }

    setUp(
        _state: IState,
        _lensNode: INode<ILensUI>): void {
    }

    tearDown(
        _state: IState,
        _lensNode: INode<ILensUI>): void {
    }

    buildExpandedEditorView(): VNode | null {

        return null;
    }

    checkMatch(lensNode: INode<ILensUI> | null): boolean {

        return quizCode.checkMatch(lensNode);
    }

    onRenderFinished(): void {

        return quizJsonOnRenderFinished();
    }

    toJson(lensNode: INode<ILensUI>): void {

        quizCode.toJson(lensNode);
    }

    validate(lensNode: INode<ILensUI>): boolean {

        return quizCode.validate(lensNode);
    }
        
    runsInBackground(): boolean {

        return false;
    }
}
