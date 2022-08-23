import ITermMapping from "./ITermMapping";


export default interface ITermMappings {

    [key: string]: ITermMapping;

    phrase: ITermMapping;
    startsWith: ITermMapping;
    tokens: ITermMapping;
}
