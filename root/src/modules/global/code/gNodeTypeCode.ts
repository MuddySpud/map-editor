import { NodeType } from "../../interfaces/enums/NodeType";
import INode from "../../interfaces/state/tree/INode";
import U from "../gUtilities";


const gNodeTypeCode = {

    getNodeType: (node: any): NodeType => {

        const type = node.type;
        
        if (typeof type === "string") {

            let stringType: string = type as string;
            let titleCase: string = U.upperCaseFirstLetter(stringType);

            // It might not need titlecase!!!!
            return NodeType[titleCase as keyof typeof NodeType];
        }
        else if (typeof type === "number") {

            alert("NodeType has changed need to see if this is called!!!!!!!!!");
            
            // TODO RPTM delete all the number stuff
            if (type === 1) {
                return NodeType.Solution;
            }
            else if (type === 2) {
                return NodeType.Discussion;
            }
        }

        return NodeType.None;
    },

    isComplexType: <T extends unknown>(node: INode<T>): boolean => {

        if (node.type === NodeType.Discussion
            || node.type === NodeType.Solution
            || node.isRoot === true) {

            return false;
        }

        return true;
    }
}

export default gNodeTypeCode;

