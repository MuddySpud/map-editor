import IState from "../../interfaces/state/IState";


const gLinkCode = {

    buildLink: (
        state: IState,
        path: string): string => {

        const link: string = `${state.settings.linkUrl}/${state.subscriptionState.subscriptionID}/${path}`;

        return link;
    },
};

export default gLinkCode;

