import React from 'react';
import {AppContext} from "../App/AppProvider";

const Content = (props) => {
    return (
        <AppContext.Consumer>
            {({coinList}) => {
                if (!coinList) {
                    return <>Loading coins...</>;
                }
                return <> {props.children} </>;
            }}
        </AppContext.Consumer>
    );
};

export default Content;