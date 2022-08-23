import U from "../gUtilities";
import IStRoot from "../../interfaces/state/tree/IStRoot";
import StRoot from "../../state/tree/StRoot";


const gStRootCode = {

    clearErrors: (stRoot: IStRoot): void => {

        stRoot.errors = new Array<string>();
    },

    setError: (
        stRoot: IStRoot,
        error: string): void => {

        if (!stRoot.errors.includes(error)) {
            stRoot.errors.push(error);
        }
    },

    validateStRoot: (stRoot: IStRoot): boolean => {

        gStRootCode.clearErrors(stRoot);

        if (U.isNullOrWhiteSpace(stRoot.text) === true) {

            gStRootCode.setError(
                stRoot,
                ` Text cannot be empty. `
            );
        }

        return stRoot.errors.length === 0;
    },

    checkStRootsMatch: (
        stRoot1: IStRoot,
        stRoot2: IStRoot): boolean => {

        if (!stRoot1
            || !stRoot2) {
            return false;
        }

        if (stRoot1.key !== stRoot2.key
            || stRoot1.r !== stRoot2.r
            || stRoot1.text !== stRoot2.text
            || stRoot1.token !== stRoot2.token) {

            return false;
        }

        return true;
    },

    cloneStRoot: (input: IStRoot): IStRoot => {

        const output: IStRoot = new StRoot();
        output.action = input.action;
        output.key = input.key;
        output.r = input.r;
        output.text = input.text;
        output.token = input.token;

        return output;
    },

    getRootBody: (stRoot: IStRoot): any => {

        return {
            key: stRoot.key,
            r: stRoot.r,
            text: stRoot.text,
            action: stRoot.action
        };
    },

    loadStRoot: (rawStRoot: any): IStRoot => {

        const stRoot: IStRoot = new StRoot();
        stRoot.key = rawStRoot.key;
        stRoot.r = rawStRoot.r;
        stRoot.text = rawStRoot.text;

        return stRoot;
    }
};

export default gStRootCode;

