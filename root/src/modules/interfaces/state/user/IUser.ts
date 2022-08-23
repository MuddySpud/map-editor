
export default interface IUser {

    key: string;
    r: string;
    raw: boolean;
    authorised: boolean;
    authorisationFailed: boolean;
    logoutUrl: string;
    showMenu: boolean;
    name: string;
    sub: string;
}
