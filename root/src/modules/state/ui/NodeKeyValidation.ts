import INodeKeyValidation from "../../interfaces/state/ui/INodeKeyValidation";


export default class NodeKeyValidation implements INodeKeyValidation {

    public key: string = '';
    public token: string = '';
    public success: boolean = false;
}
