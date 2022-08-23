import IValidationResults from "../../interfaces/state/ui/IValidationResults";
import IStringValidation from "../../interfaces/state/ui/IStringValidation";
import StringValidation from "./StringValidation";
import ITokenValidation from "../../interfaces/state/ui/ITokenValidation";
import TokenValidation from "./TokenValidation";
import INodeKeyValidation from "../../interfaces/state/ui/INodeKeyValidation";
import NodeKeyValidation from "./NodeKeyValidation";
import ITitleVersionValidation from "../../interfaces/state/ui/ITitleVersionValidation";
import TitleVersionValidation from "./TitleVersionValidation";


export default class ValidationResults implements IValidationResults {

    public botAliasTitle: ITitleVersionValidation = new TitleVersionValidation();
    public treeName: IStringValidation = new StringValidation();
    public treeToken: ITokenValidation = new TokenValidation();
    public nodeKey: INodeKeyValidation = new NodeKeyValidation();
}
