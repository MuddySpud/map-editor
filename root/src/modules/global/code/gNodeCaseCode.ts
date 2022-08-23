import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import INode from "../../interfaces/state/tree/INode";
import NodeCase from "../../state/tree/NodeCase";
import INodeCase from "../../interfaces/state/tree/INodeCase";
import gNodeAltsCode from "./gNodeAltsCode";
import INodeBase from "../../interfaces/state/tree/INodeBase";


const gNodeCaseCode = {

    cloneCase: (node: INodeBase): INodeCase => {

        const iNode: INode<IBranchUI> = node as INode<IBranchUI>;

        if (!iNode.case) {
            return new NodeCase();
        }

        const nodeCase: INodeCase = new NodeCase();
        nodeCase.alts = gNodeAltsCode.cloneNodeAlts(iNode.case.alts);

        return nodeCase;
    }
};

export default gNodeCaseCode;

