import IState from "../../interfaces/state/IState";
import { ActionType } from "../../interfaces/enums/ActionType";
import U from "../gUtilities";
import IDraft from "../../interfaces/state/bot/IDraft";
import Draft from "../../state/bot/Draft";
import BotUI from "../../state/ui/UIs/BotUI";
import IBotTab from "../../interfaces/state/ui/tabs/IBotTab";
import gBotsStateCode from "./gBotsStateCode";
import gStageCode from "./gStageCode";
import gStateCode from "./gStateCode";
import gBotsCoreActions from "../actions/gBotsCoreActions";
import gFilterCode from "./gFilterCode";
import ITabSave from "../../interfaces/state/ui/tabs/ITabSave";
import IAlias from "../../interfaces/state/bot/IAlias";
import Alias from "../../state/bot/Alias";
import { BotType } from "../../interfaces/enums/BotType";
import IBot from "../../interfaces/state/bot/IBot";
import IHttpAuthenticatedPropsBlock from "../../interfaces/http/IHttpAuthenticatedPropsBlock";
import { IHttpFetchItem } from "../../interfaces/http/IHttpFetchItem";
import { gSequentialHttp } from "../http/gHttp";
import IHttpAuthenticatedProps from "../../interfaces/http/IHttpAuthenticatedProps";
import gBotFilterEffects from "../effects/gBotFilterEffects";
import ITitleVersionValidation from "../../interfaces/state/ui/ITitleVersionValidation";


const gBotCode = {

    validateAliasTitle: (state: IState): boolean => {

        if (state?.lens.botTab.lensBot.type !== BotType.Alias
            || !state?.lens.botTab.lensBot.bot) {

            return true;
        }

        const alias: IAlias = state?.lens.botTab.lensBot.bot as IAlias;
        const ghostAlias: IAlias = state?.lens.botTab.ghostBot.bot as IAlias;
        const aliasNameValidation: ITitleVersionValidation = state.lens.validationResults.botAliasTitle;

        if (aliasNameValidation.title.length > 0
            && aliasNameValidation.title === alias.title
            && aliasNameValidation.version === alias.version
            && aliasNameValidation.success === false
            && ghostAlias.title !== alias.title) {

            gBotCode.setError(
                alias,
                `Name already exists. `
            );

            return false;
        }

        return true;
    },

    getValidateAliasNameRequestBody: (state: IState): { body: any, callID: string } => {

        const callID: string = gBotsStateCode.registerAliasDataRequest(
            'Validate bot alias title and version',
            state,
            '',
            ActionType.ValidateAliasName
        );

        const alias: IAlias = state?.lens.botTab.lensBot.bot as IAlias;

        const body: any = {
            title: alias.title,
            version: alias.version,
            action: ActionType.ValidateAliasName
        };

        return {
            body,
            callID
        };
    },

    buildEffectAndReLoadBotsSequential: (
        state: IState,
        effectPropsDelegate: (state: IState) => IHttpFetchItem | undefined
    ): (state: IState) => any => {

        const effects: Array<IHttpAuthenticatedPropsBlock> = [];

        const httpFetchSaveAlias: IHttpFetchItem | undefined = effectPropsDelegate(state);

        if (httpFetchSaveAlias) {

            const props: IHttpAuthenticatedProps = httpFetchSaveAlias[1];
            effects.push(props);
        }

        const httpFetchReloadBots: IHttpFetchItem | undefined = gBotFilterEffects.filterProps(state);

        if (httpFetchReloadBots) {

            const props: IHttpAuthenticatedProps = httpFetchReloadBots[1];
            effects.push(props);
        }

        const effect: any = (_state: IState) => gSequentialHttp(effects);

        return effect;
    },

    getDraftFromState: (
        state: IState,
        draftKey: string): IDraft | null => {

        if (!state
            || state.botsState.draftsState.drafts.length === 0) {

            return null;
        }

        const drafts: Array<IDraft> = state.botsState.draftsState.drafts;

        const draft: IDraft | undefined = drafts.find((draft: IDraft) => {

            return draft.key === draftKey;
        });

        if (draft) {

            return draft;
        }

        return null;
    },

    getAliasFromState: (
        state: IState,
        aliasKey: string): IAlias | null => {

        if (!state
            || state.botsState.aliasesState.aliases.length === 0) {

            return null;
        }

        const aliases: Array<IAlias> = state.botsState.aliasesState.aliases;

        const alias: IAlias | undefined = aliases.find((alias: IAlias) => {

            return alias.key === aliasKey;
        });

        if (alias) {

            return alias;
        }

        return null;
    },

    resetEdits: (state: IState): void => {

        if (state.lens.botTab.lensBot.type !== BotType.Alias
            || !state.lens.botTab.lensBot.bot) {
            return;
        }

        const botTab: IBotTab = state.lens.botTab;
        botTab.lensBot = botTab.ghostBot;
        botTab.enableSave = true;
        botTab.saveLock = false;

        const alias: IAlias = state.lens.botTab.lensBot.bot as IAlias;
        alias.action = ActionType.None;
    },

    setError: (
        alias: IAlias,
        error: string): void => {

        if (!alias.errors.includes(error)) {

            alias.errors.push(error);
        }
    },

    clearAliasErrors: (alias: IAlias): void => {

        alias.errors = new Array<string>();
    },

    validateAlias: (alias: IAlias): boolean => {

        if (alias.action === ActionType.DeleteAlias) {
            // Don't need to validate anything for a delete.
            return true;
        }

        gBotCode.clearAliasErrors(alias);

        if (U.isNullOrWhiteSpace(alias.title) === true) {

            gBotCode.setError(
                alias,
                `Name cannot be empty. `
            );
        }

        if (U.isNullOrWhiteSpace(alias.key) === true) {

            gBotCode.setError(
                alias,
                `Key cannot be empty. `
            );
        }

        return alias.errors.length === 0;
    },


    validateTabForNewAlias: (
        tab: ITabSave,
        alias: IAlias): void => {

        tab.enableSave = gBotCode.isNewAliasValid(alias);
    },

    validateBotTabAlias: (state: IState): boolean => {

        const valid: boolean = gBotsStateCode.lensBotAliasIsValidDirty(state);
        state.lens.botTab.enableSave = valid;

        return valid;
    },

    isNewAliasValid: (alias: IAlias): boolean => {

        return gBotCode.validateAlias(alias);
    },

    reloadBots: (state: IState): void => {

        gStateCode.AddReLoadDataEffect(
            state,
            `reLoadAllBots`,
            null,
            `${state.settings.apiUrl}/Bots/Filter`,
            gFilterCode.getBotsAutoFilterRequestBody,
            gBotsCoreActions.loadViewOrBuildFresh
        );
    },

    checkResponseAlias: (alias: IAlias | null): void => {

        if (!alias
            || !alias.created
            || !alias.draft
            || U.isNullOrWhiteSpace(alias.key) === true
            || U.isNullOrWhiteSpace(alias.title) === true
            || U.isNullOrWhiteSpace(alias.draft.key) === true) {

            throw new Error("Response alias was not complete.");
        }
        // else {
        //     // do nothing but there is a bug where the last statement always runs even if false
        // }
    },

    checkResponseDraft: (draft: IDraft | null): void => {

        if (!draft
            || U.isNullOrWhiteSpace(draft.key) === true
            || U.isNullOrWhiteSpace(draft.title) === true) {

            throw new Error("Response draft was not complete.");
        }
    },

    checkAliasImmutablesMatch: (
        alias1: IAlias,
        alias2: IAlias): boolean => {

        if (!alias1
            || !alias2) {

            return false;
        }

        if (alias1.key !== alias2.key
            || alias1.rootDkID !== alias2.rootDkID
            || alias1.token !== alias2.token
            || alias1.created !== alias2.created) {

            return false;
        }

        return true;
    },

    clearBotTab: (state: IState): void => {

        const botTab: IBotTab = state.lens.botTab;
        botTab.lensBot.bot = null;
        botTab.lensBot.type = BotType.None;
        botTab.ghostBot.bot = null;
        botTab.ghostBot.type = BotType.None;
        botTab.display = false;
        botTab.saveLock = false;
        botTab.enableSave = true;
        botTab.loadingAliasKey = null;
        botTab.loadingDraftKey = null;

        state.botsState.queuedAliasID = "";
        state.botsState.queuedDraftID = "";
        state.botsState.selectedAliasKey = "";
        state.botsState.selectedDraftKey = "";
    },

    getAliasRequestBody: (
        state: IState,
        alias: IAlias): { body: any, callID: string } => {

        const callID: string = gBotsStateCode.registerAliasDataRequest(
            'Save bot alias',
            state,
            alias.key as string,
            alias.action
        );

        let body: any = {
            key: alias.key,
            r: alias.r,
            title: alias.title,
            description: alias.description,
            token: alias.token,
            enabled: alias.enabled,
            version: alias.version,
            draftKey: alias.draft.key,
            rootDkID: alias.rootDkID,
            tags: [...alias.tags],
            action: alias.action.toString()
        };

        return {
            body,
            callID
        };
    },

    checkExistingAliasSwap: (
        state: IState,
        alias: IAlias,
        loadingKey: string): boolean => {

        if (alias.key !== loadingKey) {

            throw new Error("The loaded bot alias does not match the loadingKey");
        }

        if (loadingKey !== state.botsState.selectedAliasKey) {

            throw new Error("The loadingKey does not match the selectedKey");
        }

        if (state.lens.botTab.ghostBot.type === BotType.None) {
            // Then this is the first load
            state.lens.botTab.lensBot.bot = alias;
            state.lens.botTab.lensBot.type = BotType.Alias;
            state.lens.botTab.ghostBot.bot = gBotCode.cloneAlias(alias);
            state.lens.botTab.ghostBot.type = BotType.Alias;

            return true;
        }

        if (gBotCode.isLensBotDirty(state) === false) {

            state.lens.botTab.lensBot.bot = alias;
            state.lens.botTab.lensBot.type = BotType.Alias;
            state.lens.botTab.ghostBot.bot = gBotCode.cloneAlias(alias);
            state.lens.botTab.ghostBot.type = BotType.Alias;

            return true;
        }

        const loadedAndLensBotsMatch: boolean = gBotCode.checkAliasImmutablesMatch(
            state.lens.botTab.lensBot.bot as IAlias,
            alias
        );

        if (loadedAndLensBotsMatch === true) {

            state.lens.botTab.lensBot.bot = alias;
            state.lens.botTab.lensBot.type = BotType.Alias;
            state.lens.botTab.ghostBot.bot = gBotCode.cloneAlias(alias);
            state.lens.botTab.ghostBot.type = BotType.Alias;

            return true;
        }

        return false;
    },

    checkNewAliasSwap: (
        state: IState,
        alias: IAlias): boolean => {

        if (!state.lens.botTab.lensBot) {

            throw new Error("The lens bot alias was null");
        }

        state.lens.botTab.lensBot.bot = alias;
        state.lens.botTab.lensBot.type = BotType.Alias;
        state.lens.botTab.ghostBot.bot = gBotCode.cloneAlias(alias);
        state.lens.botTab.ghostBot.type = BotType.Alias;

        return true;
    },

    getDraftKeyRequestBody: (
        state: IState,
        draftKey: string): { body: any, callID: string } => {

        const callID: string = gBotsStateCode.registerDraftDataRequest(
            'Get bot draft',
            state,
            draftKey,
            ActionType.GetDraft
        );

        const body: any = {
            key: draftKey,
            action: ActionType.GetDraft
        };

        return {
            body,
            callID
        };
    },

    getAliasKeyRequestBody: (
        state: IState,
        aliasKey: string): { body: any, callID: string } => {

        const callID: string = gBotsStateCode.registerAliasDataRequest(
            'Get bot alias',
            state,
            aliasKey,
            ActionType.GetAlias
        );

        const body: any = {
            key: aliasKey,
            action: ActionType.GetAlias
        };

        return {
            body,
            callID
        };
    },

    getDeleteDraftRequestBody: (
        state: IState,
        draft: IDraft): { body: any, callID: string } => {

        const callID: string = gBotsStateCode.registerDraftDataRequest(
            'Delete bot draft',
            state,
            draft.key as string,
            ActionType.DeleteDraft
        );

        const body: any = {
            key: draft.key,
            r: draft.r,
            token: draft.token,
            action: draft.action.toString()
        };

        return {
            body,
            callID
        };
    },

    getDeleteAliasRequestBody: (
        state: IState,
        alias: IAlias): { body: any, callID: string } => {

        const callID: string = gBotsStateCode.registerAliasDataRequest(
            'Delete bot alias',
            state,
            alias.key as string,
            ActionType.DeleteAlias
        );

        const body: any = {
            key: alias.key,
            r: alias.r,
            token: alias.draft?.token,
            action: alias.action.toString()
        };

        return {
            body,
            callID
        };
    },

    checkSafeAliasSwap: (
        state: IState,
        alias: IAlias | null): void => {

        if (!state
            || !alias) {
            return;
        }

        const loadingKey: string | null = state.lens.botTab.loadingAliasKey;
        state.lens.botTab.loadingAliasKey = null;

        if (U.isPositiveNumeric(loadingKey) === true) {

            const success: boolean = gBotCode.checkExistingAliasSwap(
                state,
                alias,
                loadingKey as string);

            if (success) {
                return;
            }
        }
        else if (U.isNegativeNumeric(loadingKey) === true) {

            const success: boolean = gBotCode.checkNewAliasSwap(
                state,
                alias
            );

            if (success) {

                return;
            }
        }
        else {
            throw new Error("LoadingKey has not been set");
        }

        throw new Error("The lens bot alias did not match the loaded bot alias");
    },

    loadLensBotAliasFromRaw: (
        state: IState,
        rawAlias: any): IAlias | null => {

        const loadedAlias: IAlias | null = gBotCode.loadAlias(rawAlias);

        return gBotCode.loadLensBotAlias(
            state,
            loadedAlias
        );
    },

    loadLensBotDraftFromRaw: (
        state: IState,
        rawDraft: any): IDraft | null => {

        const loadedDraft: IDraft | null = gBotCode.loadDraft(rawDraft);

        return gBotCode.loadLensBotDraft(
            state,
            loadedDraft
        );
    },

    loadLensBotDraft: (
        state: IState,
        draft: IDraft | null): IDraft | null => {

        if (!draft) {

            return null;
        }

        gBotCode.checkResponseDraft(draft);

        gBotsStateCode.updateDraft(
            state,
            draft
        );

        state.lens.botTab.lensBot.bot = draft;
        state.lens.botTab.lensBot.type = BotType.Draft;

        return draft;
    },

    loadLensBotAlias: (
        state: IState,
        alias: IAlias | null): IAlias | null => {

        if (!alias) {

            return null;
        }

        gBotCode.checkResponseAlias(alias);

        gBotCode.checkSafeAliasSwap(
            state,
            alias
        );

        gBotsStateCode.updateAlias(
            state,
            alias
        );

        return alias;
    },

    prepareForDraftHub: (state: IState): void => {

        gBotsStateCode.setLensBotForUpdate(state);
        state.lens.botTab.stageBehaviour = gStageCode.buildBotDraftHubStages();
        state.lens.botTab.ghostBot.type = BotType.Draft;
        state.lens.botTab.lensBot.type = BotType.Draft;
    },

    prepareForAliasHub: (state: IState): void => {

        gBotsStateCode.setLensBotForUpdate(state);
        state.lens.botTab.stageBehaviour = gStageCode.buildBotAliasHubStages();
        state.lens.botTab.ghostBot.type = BotType.Alias;
        state.lens.botTab.lensBot.type = BotType.Alias;
    },

    createLensBotAlias: (state: IState): void => {

        if (!state
            || U.isNullOrWhiteSpace(state.botsState.selectedDraftKey) === true
            || state.lens.botTab.lensBot.type !== BotType.Draft
            || !state.lens.botTab.lensBot.bot) {
            return;
        }

        const draft: IDraft = state.lens.botTab.lensBot.bot as IDraft;
        draft.ui.minimise = true;

        const alias: IAlias = new Alias();
        alias.draft = draft
        alias.key = gStateCode.getFreshKey(state);
        alias.action = ActionType.CreateAlias;
        alias.rootDkID = draft.rootDkID;
        alias.description = draft.description;
        alias.enabled = false;
        alias.tags = [...draft.tags];
        alias.token = draft.token;
        alias.title = draft.title;
        alias.version = draft.version;
        alias.ui.raw = false;

        state.lens.botTab.lensBot.bot = alias;
        state.lens.botTab.lensBot.type = BotType.Alias;
        state.lens.botTab.ghostBot.bot = gBotCode.cloneAlias(alias);
        state.lens.botTab.ghostBot.type = BotType.Alias;
        state.lens.botTab.loadingAliasKey = alias.key;
        state.botsState.selectedAliasKey = alias.key;
    },

    prepareForSwitchBots: (state: IState): void => {

        const botTab: IBotTab = state.lens.botTab;
        botTab.enableSave = true;
        botTab.saveLock = false;
    },

    updateAlias: (
        original: IAlias,
        template: IAlias): void => {

        if (!original
            || !template
            || U.isNullOrWhiteSpace(template.key) === true) {
            return;
        }

        original.title = template.title;
        original.description = template.description;
        original.enabled = template.enabled;
        original.token = template.token;
        original.tags = [...template.tags];
        original.version = template.version;
        original.rootDkID = template.rootDkID;
        original.draft = template.draft;
        original.action = template.action;
        original.created = template.created;
    },

    updateDraft: (
        original: IDraft,
        template: IDraft): void => {

        if (!original
            || !template
            || U.isNullOrWhiteSpace(template.key) === true) {
            return;
        }

        original.created = template.created;
        original.description = template.description;
        original.jobKey = template.jobKey;
        original.key = template.key;
        original.r = template.r;
        original.name = template.name;
        original.rootDkID = template.rootDkID;
        original.tags = [...template.tags];
        original.title = template.title;
        original.token = template.token;
        original.treeKey = template.treeKey;
        original.version = template.version;
        original.action = template.action;
    },

    loadAliases: (rawAliases: any[]): Array<IAlias> => {

        const bots: Array<IAlias> = [];

        if (!rawAliases
            || rawAliases.length === 0) {

            return bots;
        }

        let alias: IAlias;

        rawAliases.forEach((rawBot: any) => {

            alias = gBotCode.loadAlias(rawBot);
            bots.push(alias);
        });

        return bots;
    },

    loadDrafts: (rawDrafts: any[]): Array<IDraft> => {

        const drafts: Array<IDraft> = [];

        if (!rawDrafts
            || rawDrafts.length === 0) {

            return drafts;
        }

        let draft: IDraft | null;

        rawDrafts.forEach((rawDraft: any) => {

            draft = gBotCode.loadDraft(rawDraft);
            drafts.push(draft);
        });

        return drafts;
    },

    loadAlias: (rawAlias: any): IAlias => {

        const alias: IAlias = gBotCode.loadAliasKeys(rawAlias);
        alias.title = rawAlias.title;
        alias.description = rawAlias.description;
        alias.enabled = rawAlias.enabled;
        alias.created = rawAlias.created;
        alias.rootDkID = rawAlias.rootDkID;
        alias.version = rawAlias.version;
        alias.token = rawAlias.token;
        alias.tags = [...rawAlias.tags];

        alias.draft = gBotCode.loadDraft(rawAlias.draft);

        alias.ui = new BotUI();

        return alias;
    },

    loadAliasKeys: (rawAlias: any): IAlias => {

        const alias: IAlias = new Alias();
        alias.key = rawAlias.key;
        alias.r = rawAlias.r;

        return alias;
    },

    loadDraft: (rawDraft: any): IDraft => {

        const draft: IDraft = new Draft();
        draft.key = rawDraft.key;
        draft.r = rawDraft.r;
        draft.name = rawDraft.name;
        draft.title = rawDraft.title;
        draft.description = rawDraft.description;
        draft.jobKey = rawDraft.jobKey;
        draft.treeKey = rawDraft.treeKey;
        draft.rootDkID = rawDraft.rootDkID;
        draft.version = rawDraft.version;
        draft.tags = [...rawDraft.tags];
        draft.token = rawDraft.token;

        return draft;
    },

    cloneDraft: (input: IDraft): IDraft | null => {

        if (!input
            || U.isNullOrWhiteSpace(input.key) === true) {

            return null;
        }

        const draft: IDraft = new Draft();
        draft.key = input.key;
        draft.r = draft.r;
        draft.name = input.name;
        draft.title = input.title;
        draft.description = input.description;
        draft.jobKey = input.jobKey;
        draft.treeKey = input.treeKey;
        draft.rootDkID = input.rootDkID;
        draft.version = input.version;
        draft.tags = [...input.tags];
        draft.token = input.token;
        draft.action = input.action;

        return draft;
    },

    cloneAlias: (input: IAlias): IAlias | null => {

        if (!input
            || U.isNullOrWhiteSpace(input.key) === true) {

            return null;
        }

        const alias: IAlias = new Alias();
        alias.key = input.key;
        alias.r = input.r;
        alias.title = input.title;
        alias.description = input.description;
        alias.enabled = input.enabled;
        alias.created = input.created;
        alias.version = input.version;
        alias.rootDkID = input.rootDkID;
        alias.token = input.token;
        alias.tags = [...input.tags];
        alias.action = input.action;

        const draft: IDraft | null = gBotCode.cloneDraft(input.draft);

        if (draft) {

            alias.draft = draft;
        }

        alias.ui = new BotUI();

        return alias;
    },

    isLensBotDirty: (state: IState): boolean => {

        if (!state
            || (state.lens.botTab.lensBot.type === BotType.None
                && state.lens.botTab.ghostBot.type === BotType.None)) {

            return false;
        }

        return gBotCode.checkBotsMatchExactly(
            state.lens.botTab.lensBot,
            state.lens.botTab.ghostBot) === false;
    },

    checkBotsMatchExactly: (
        bot1: IBot,
        bot2: IBot): boolean => {

        if (!bot1.bot
            && !bot2.bot
            && bot1.type === BotType.None
            && bot2.type === BotType.None) {

            return false;
        }

        if (!bot1.bot
            || !bot2.bot
            || bot1.type !== bot2.type) {

            return true;
        }

        if (bot1.type === BotType.Alias) {

            return gBotCode.checkAliasesMatchExactly(
                bot1.bot as IAlias,
                bot2.bot as IAlias
            );
        }

        return gBotCode.checkDraftsMatchExactly(
            bot1.bot as IDraft,
            bot2.bot as IDraft
        );
    },

    checkAliasesMatchExactly: (
        alias1: IAlias,
        alias2: IAlias): boolean => {

        if (!alias1
            || !alias2) {

            return false;
        }

        if (alias1.key !== alias2.key
            || alias1.created !== alias2.created
            || alias1.version !== alias2.version
            || alias1.title !== alias2.title
            || alias1.description !== alias2.description
            || alias1.enabled !== alias2.enabled
            || alias1.rootDkID !== alias2.rootDkID
            || alias1.token !== alias2.token
            || !U.checkArraysEqual(alias1.tags, alias2.tags)
            || !gBotCode.checkDraftsMatchExactly(alias1.draft, alias2.draft)) {

            return false;
        }

        return true;
    },

    checkDraftsMatchExactly: (
        draft1: IDraft,
        draft2: IDraft): boolean => {

        if (!draft1
            || !draft2) {

            return false;
        }

        if (draft1.key !== draft2.key
            || draft1.rootDkID !== draft2.rootDkID
            || draft1.version !== draft2.version
            || draft1.title !== draft2.title
            || draft1.description !== draft2.description
            || draft1.name !== draft2.name
            || draft1.token !== draft2.token
            || draft1.treeKey !== draft2.treeKey
            || draft1.jobKey !== draft2.jobKey
            || !U.checkArraysEqual(draft1.tags, draft2.tags)) {

            return false;
        }

        return true;
    }
};

export default gBotCode;

