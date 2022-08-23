import ILooper from "../../interfaces/state/tree/ILooper";
import INode from "../../interfaces/state/tree/INode";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import Looper from "../../state/tree/Looper";
import U from "../gUtilities";


const gLooperCode = {

    getLoopHoleOption: (loopRoot: INode<ILensUI>): INode<ILensUI> | null => {

        let option: INode<ILensUI>;

        for (let i = 0; i < loopRoot.nodes.length; i++) {

            option = loopRoot.nodes[i];

            if (option.looper.isLoopHole === true) {

                return option;
            };
        }

        return null;
    },

    cloneLooper: (input: ILooper): ILooper => {

        const looper: ILooper = new Looper();
        looper.isLoopHole = input.isLoopHole;
        looper.isLoopRoot = input.isLoopRoot;
        looper.loopHoleTextErrors = [...input.loopHoleTextErrors];
        looper.loopRepeatText = input.loopRepeatText;
        looper.loopRepeatTextErrors = [...input.loopRepeatTextErrors];

        return looper;
    },

    checkLoopersMatch: (
        newie: ILooper,
        oldie: ILooper): boolean => {

        let match = newie.isLoopHole === oldie.isLoopHole
            && newie.isLoopRoot === oldie.isLoopRoot
            && U.checkArraysEqual(newie.loopHoleTextErrors, oldie.loopHoleTextErrors)
            && newie.loopRepeatText === oldie.loopRepeatText
            && U.checkArraysEqual(newie.loopRepeatTextErrors, oldie.loopRepeatTextErrors);

        return match;
    }
};

export default gLooperCode;