import IGlobalBranchFlags from "../../interfaces/state/ui/IGlobalBranchFlags";


export default class GlobalBranchFlags implements IGlobalBranchFlags {

    public target: boolean = false;
    public option: boolean = false;
    public limit: boolean = false;
}
