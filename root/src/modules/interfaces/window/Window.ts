import ITreeSolve from "./ITreeSolve";

export {};

declare global {

    interface Window {

        TreeSolve: ITreeSolve;
    }
}