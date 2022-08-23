
import { gAuthenticatedHttp } from "../../../../../global/http/gAuthenticationHttp";

import IState from "../../../../../interfaces/state/IState";
// import { ActionType } from "../../../../../interfaces/enums/ActionType";
// import U from "../../../../../global/gUtilities";
import gErrorActions from "../../../../../global/actions/gErrorActions";
import gAjaxHeaderCode from "../../../../../global/http/gAjaxHeaderCode";
import { IHttpFetchItem } from "../../../../../interfaces/http/IHttpFetchItem";
// import gBotsCoreActions from "../../../../../global/actions/gBotsCoreActions";
import { BotType } from "../../../../../interfaces/enums/BotType";
import IAlias from "../../../../../interfaces/state/bot/IAlias";
import gBotCode from "../../../../../global/code/gBotCode";
import botActions from "../actions/botActions";


const botEffects = {

    saveAliasProps: (state: IState): IHttpFetchItem | undefined => {

        return botEffects.saveAlias(state);
    },

    saveAlias: (state: IState): IHttpFetchItem | undefined => {

        if (state.lens.botTab.lensBot.type !== BotType.Alias
            || !state.lens.botTab.lensBot.bot) {
            return;
        }

        const alias: IAlias = state.lens.botTab.lensBot.bot as IAlias;

        const { body, callID }: { body: any, callID: string } = gBotCode.getAliasRequestBody(
            state,
            alias
        );

        const bodyJson: string = JSON.stringify(body);

        let headers = gAjaxHeaderCode.buildHeaders(
            state,
            callID,
            alias.action
        );

        const url: string = `${state.settings.apiUrl}/Bot/Alias/Save`;

        return gAuthenticatedHttp({
            url: url,
            options: {
                method: "POST",
                headers: headers,
                body: bodyJson
            },
            response: 'json',
            action: botActions.overWriteLensBotAlias,
            error: (state: IState, errorDetails: any) => {

                gErrorActions.setLensWarning(
                    state,
                    state.lens.botTab,
                    `Save bot alias failed`,
                );

                return gErrorActions.reportHttpError(
                    state,
                    callID,
                    alias.token,
                    url,
                    body,
                    botEffects.saveAlias.name,
                    "Error sending bot alias data to the server",
                    errorDetails.stack,
                    errorDetails
                );
            }
        });
    }
};

export default botEffects;
