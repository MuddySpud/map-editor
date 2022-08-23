import IUserView from "../../interfaces/state/user/IUserView";


export default class UserView implements IUserView {

    constructor(name: string) {
            this.name = name;
        }
        
    public key: string = `-1`;
    public r: string = "-1";
    public name: string;
    public token: string = ``;
    public created: Date = new Date();
    public lastModified: Date = new Date();
}
