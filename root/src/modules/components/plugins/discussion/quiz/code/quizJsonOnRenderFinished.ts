//noinspection TypeScriptCheckImport,TypeScriptCheckImport
import Editor from '@toast-ui/editor';

import Filters from "../../../../../state/constants/Filters";
import IMdEditor from '../interfaces/IMdEditor';
import quizCode from './quizCode';


const quizJsonOnRenderFinished = () => {

    setupMdEditor();
    setHeights();
};

const setupMdEditor = (): void => {

    const mdEditor: IMdEditor | null = quizCode.tryGetMdEditor();

    if (!mdEditor
        || !mdEditor.showEditor) {
        return;
    }

    const mdEditorDiv: HTMLDivElement = document.querySelector(Filters.mdEditorFilter) as HTMLDivElement;

    if (!mdEditorDiv) {
        return;
    }

    const editor = new Editor({
        el: mdEditorDiv,
        height: '300px',
        initialEditType: 'markdown',
        previewStyle: 'vertical'
    });

    mdEditor.editor = editor;

    editor.getHtml();

    editor.setMarkdown(
        mdEditor.text,
        true
    );
};

const setHeights = () => {

    const mdEditor: IMdEditor | null = quizCode.tryGetMdEditor();

    if (!mdEditor
        || !mdEditor.editor
        || !mdEditor.showEditor) {
        return;
    }

    const mdEditorDiv: HTMLDivElement = document.querySelector(Filters.mdEditorFilter) as HTMLDivElement;
    const mdEditorViewDiv: HTMLDivElement = document.querySelector(Filters.mdEditorViewFilter) as HTMLDivElement;
    const lightBoxDiv: HTMLDivElement = document.querySelector(Filters.lightBoxFilter) as HTMLDivElement;
    const viewMargins: number = mdEditorViewDiv.clientHeight - mdEditorDiv.clientHeight;
    mdEditor.editor.height(`${(document.documentElement.clientHeight - viewMargins) * 0.9}px`); // 90% of height
    lightBoxDiv.style.height = `${mdEditorViewDiv.clientHeight}px`;
};

export default quizJsonOnRenderFinished;
