import React from 'react';
import {AppContext} from "../App/AppProvider";
import styled from "styled-components";

const ConfirmButtonStyled = styled.div`
    margin: 20px;
    color: green;
    cursor: pointer;
`;

export const CenterDiv = styled.div`
    display: grid;
    justify-content: center;
`;

const ConfirmButton = props => {
    return (
        <AppContext.Consumer>
            {({confirmFavorites}) =>
                <CenterDiv>
                    <ConfirmButtonStyled onClick={confirmFavorites}>
                        Confirm Favorites
                    </ConfirmButtonStyled>
                </CenterDiv>
            }
        </AppContext.Consumer>
    );
};

export default ConfirmButton;