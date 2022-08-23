import IBotUI from "../../../interfaces/state/ui/UIs/IBotUI";


export default class BotUI implements IBotUI {

    public show: boolean = false;
    public raw: boolean = true;
    public minimise: boolean = false;
}
