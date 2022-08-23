import IStringValidation from "./IStringValidation";
import ITokenValidation from "./ITokenValidation";
import INodeKeyValidation from "./INodeKeyValidation";
import ITitleVersionValidation from "./ITitleVersionValidation";


export default interface IValidationResults
 {
    botAliasTitle: ITitleVersionValidation;
    treeName: IStringValidation;
    treeToken: ITokenValidation;
    nodeKey: INodeKeyValidation;
}
