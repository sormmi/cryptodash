import React from 'react';
import {AppContext} from "../App/AppProvider";

const Content = (props) => {
    return (
        <AppContext.Consumer>
            {({coinList, prices, firstVisit}) => {
                if (!coinList) {
                    return <>Loading coins...</>;
                }
                if (!firstVisit && !prices) {
                    return <>Loading prices...</>;
                }
                return <> {props.children} </>;
            }}
        </AppContext.Consumer>
    );
};

export default Content;