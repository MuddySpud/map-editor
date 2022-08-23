import ISocketHole from "../../interfaces/state/tree/ISocketHole";


export default class SocketHole implements ISocketHole {

    constructor(
        stSocketKey: string,
        text: string,
        overrideOption: boolean) {
            
            this.socketKey = stSocketKey;
            this.socketText = text;
            this.overrideOption = overrideOption;
    }
    
    public socketKey: string;
    public socketText: string;
    public overrideOption: boolean;
}
