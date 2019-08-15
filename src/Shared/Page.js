import React from 'react';
import {AppContext} from "../App/AppProvider";

const Page = ({name, children}) => {
    return (
        <AppContext.Consumer>
            {({page}) => {
                if (page !== name) {
                    return null;
                }
                return <> {children} </>;
            }}
        </AppContext.Consumer>
    );
};

export default Page;