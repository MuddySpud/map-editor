import IState from "../../interfaces/state/IState";


const gAuthenticationCode = {

    clearAuthentication: (state: IState): void => {

        state.user.authorised = false;
        state.user.name = "";
        state.user.sub = "";
    }
};

export default gAuthenticationCode;
