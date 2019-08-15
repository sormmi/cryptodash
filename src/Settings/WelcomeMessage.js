import React from 'react';
import {AppContext} from "../App/AppProvider";

const WelcomeMessage = () => {
    return (
        <AppContext.Consumer>
            {({firstVisit}) =>
                firstVisit ? <> Welcome to CryptoDash, please select your favorite coins to begin. {' '}
                </> : null
            }
        </AppContext.Consumer>
    );
};

export default WelcomeMessage;