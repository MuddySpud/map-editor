import IStSocket from "../../tree/IStSocket";
import INode from "../../tree/INode";
import ILensUI from "../UIs/ILensUI";


export default interface IOptionSocket {

    option: INode<ILensUI>;
    stSocket: IStSocket;
}
