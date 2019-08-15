import React from 'react';
import {AppContext} from "../App/AppProvider";
import styled from "styled-components";
import {color3, fontSize1, greenBoxShadow} from "../Shared/Styles";

const ConfirmButtonStyled = styled.div`
    margin: 20px;
    color: ${color3};
    ${fontSize1};
    padding: 5px;
    cursor: pointer;
    &:hover {
        ${greenBoxShadow}
    }
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