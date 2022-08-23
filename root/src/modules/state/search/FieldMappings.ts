import { InputType } from "../../interfaces/enums/search/InputType";
import { FieldType } from "../../interfaces/enums/search/FieldType";
import { TermType } from "../../interfaces/enums/search/TermType";
import FieldMapping from "./FieldMapping";
import IFieldMapping from "../../interfaces/state/search/IFieldMapping";
import IFieldMappings from "../../interfaces/state/search/IFieldMappings";


export default class FieldMappings implements IFieldMappings {

    public all: IFieldMapping = new FieldMapping(FieldType.All, InputType.Text, [TermType.Tokens, TermType.StartsWith], "All");
    public name: IFieldMapping = new FieldMapping(FieldType.Name, InputType.Text, [TermType.Tokens, TermType.StartsWith, TermType.Phrase], "Name");
    public description: IFieldMapping = new FieldMapping(FieldType.Description, InputType.Text, [TermType.Tokens, TermType.StartsWith, TermType.Phrase], "Description");
    public tags: IFieldMapping = new FieldMapping(FieldType.Tags, InputType.Text, [TermType.Tokens, TermType.StartsWith], "Tags");
    public owner: IFieldMapping = new FieldMapping(FieldType.Owner, InputType.Text, [TermType.Tokens, TermType.StartsWith], "Owner");
    public treeToken: IFieldMapping = new FieldMapping(FieldType.TreeToken, InputType.Text, [TermType.Tokens, TermType.StartsWith], "Tree token");
    public isPublished: IFieldMapping = new FieldMapping(FieldType.IsPublished, InputType.Boolean, [], "Is published");
    public isSubtree: IFieldMapping = new FieldMapping(FieldType.IsSubtree, InputType.Boolean, [], "Is subtree");
    public discussion: IFieldMapping = new FieldMapping(FieldType.Discussion, InputType.Text, [TermType.Tokens, TermType.StartsWith, TermType.Phrase], "Discussion");
    public option: IFieldMapping = new FieldMapping(FieldType.Option, InputType.Text, [TermType.Tokens, TermType.StartsWith, TermType.Phrase], "Option");
    public isFlat: IFieldMapping = new FieldMapping(FieldType.IsFlat, InputType.Boolean, [], "Is flat");
    public isLoop: IFieldMapping = new FieldMapping(FieldType.IsLoop, InputType.Boolean, [], "Is loop");
    public isStash: IFieldMapping = new FieldMapping(FieldType.IsStash, InputType.Boolean, [], "Stash");
    public isEntry: IFieldMapping = new FieldMapping(FieldType.IsEntry, InputType.Boolean, [], "Is entry");
    public isSocket: IFieldMapping = new FieldMapping(FieldType.IsSocket, InputType.Boolean, [], "Is socket");
    public isRoot: IFieldMapping = new FieldMapping(FieldType.IsRoot, InputType.Boolean, [], "Is root");
    public isLink: IFieldMapping = new FieldMapping(FieldType.IsLink, InputType.Boolean, [], "Is link");
    public isPlug: IFieldMapping = new FieldMapping(FieldType.IsPlug, InputType.Boolean, [], "Is socket link");
    public isParentRoot: IFieldMapping = new FieldMapping(FieldType.IsParentRoot, InputType.Boolean, [], "Parent is root");
    public isSolution: IFieldMapping = new FieldMapping(FieldType.IsSolution, InputType.Boolean, [], "Is solution");
    public order: IFieldMapping = new FieldMapping(FieldType.Order, InputType.Number, [], "Order");
}
