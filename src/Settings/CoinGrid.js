import React from 'react';
import styled from 'styled-components';
import {AppContext} from "../App/AppProvider";
import CoinTile from "./CoinTile";

export const CoinGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 15px;
    margin-top: 40px;
`;

const getCoins = (coinList, topSection, favorites) => {
    return topSection ? favorites : Object.keys(coinList).slice(0, 100);
};

const CoinGrid = ({topSection}) => {
    return (
        <AppContext.Consumer>
            {({coinList, favorites}) =>
                <CoinGridStyled>
                    {getCoins(coinList, topSection, favorites).map((coinKey, index) => (
                        <CoinTile key={index} topSection={topSection} coinKey={coinKey}/>
                    ))}
                </CoinGridStyled>
            }
        </AppContext.Consumer>
    );
};

export default CoinGrid;