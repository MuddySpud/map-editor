import IStageBehaviour from "./IStageBehaviour";


export default interface IBranchTaskStageBehaviour extends IStageBehaviour {
    
    getToken(): string;
}
