import ISocketUI from "../../../interfaces/state/ui/UIs/ISocketUI";


export default class SocketUI implements ISocketUI {
    
    public autoAdded: boolean = false;
    public raw: boolean = true;
    public selected: boolean = false;
    public minimise: boolean = true;
    public minimiseHoles: boolean = true;
    public textFromOption: boolean = false;
    public dropDownSingleton: boolean = false;
}
