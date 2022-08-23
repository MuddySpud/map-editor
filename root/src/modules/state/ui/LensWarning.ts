import ILensWarning from "../../interfaces/state/ui/ILensWarning";
import ITabSave from "../../interfaces/state/ui/tabs/ITabSave";


export default class LensWarning implements ILensWarning {

    constructor(
        tab: ITabSave,
        title: string,
        text: string) {

        this.tab = tab;
        this.title = title;
        this.text = text;
    }

    public tab: ITabSave;
    public title: string;
    public text: string;
}
