import IFieldMapping from "./IFieldMapping";


export default interface IFieldMappings {

    all: IFieldMapping;
    name: IFieldMapping;
    description: IFieldMapping;
    tags: IFieldMapping;
    owner: IFieldMapping;
    isStash: IFieldMapping;
    isFlat: IFieldMapping;
    isLoop: IFieldMapping;
    treeToken: IFieldMapping;
    isPublished: IFieldMapping;
    isSubtree: IFieldMapping;
    discussion: IFieldMapping;
    option: IFieldMapping;
    isEntry: IFieldMapping
    isSocket: IFieldMapping;
    isRoot: IFieldMapping;
    isLink: IFieldMapping;
    isPlug: IFieldMapping;
    isParentRoot: IFieldMapping;
    isSolution: IFieldMapping;
    order: IFieldMapping;
}
