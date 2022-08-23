import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import ITree from "../../interfaces/state/tree/ITree";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import ITreeIcon from "../../interfaces/state/tree/ITreeIcon";


export default class TreeIcon implements ITreeIcon {

    constructor(
        key: string,
        name: string,
        token: string) {

        this.key = key;
        this.name = name;
        this.token = token;
    }

    public key: string;
    public name: string = '';
    public token: string;

    public isSubtree: boolean = false;
    public isFlat: boolean = false;
    public isLoop: boolean = false;
    public isBot: boolean = false;

    public static buildTreeIconFromTreeSys(input: ITreeSys | null): TreeIcon | null {

        if (!input) {

            return null;
        }

        const treeIcon: TreeIcon = new TreeIcon(
            input.key ?? '',
            input.name ?? '',
            input.token ?? ''
        );

        treeIcon.isFlat = input.isFlat;
        treeIcon.isLoop = input.isLoop;
        treeIcon.isSubtree = input.isSubtree;
        treeIcon.isBot = input.isBot;

        return treeIcon;
    }

    public static buildTreeIconFromTree(input: ITree<IBranchUI> | null): TreeIcon | null {

        if (!input
            || !input.key
            || !input.name
            || !input.token) {

            return null;
        }

        const treeIcon: TreeIcon = new TreeIcon(
            input.key,
            input.name,
            input.token
        );

        treeIcon.isFlat = input.isFlat;
        treeIcon.isLoop = input.isLoop;
        treeIcon.isSubtree = input.isSubtree;
        treeIcon.isBot = input.isBot;

        return treeIcon;
    }
}
