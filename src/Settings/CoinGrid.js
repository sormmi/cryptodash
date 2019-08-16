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

const getFilteredCoins = (filteredCoins, coinList) => {
    return (filteredCoins && Object.keys(filteredCoins).slice(0, 100)) || Object.keys(coinList).slice(0, 100);
};

const getCoins = (coinList, topSection, favorites, filteredCoins) => {
    return topSection ? favorites : getFilteredCoins(filteredCoins, coinList);
};

const CoinGrid = ({topSection}) => {
    return (
        <AppContext.Consumer>
            {({coinList, favorites, filteredCoins}) =>
                <CoinGridStyled>
                    {getCoins(coinList, topSection, favorites, filteredCoins).map((coinKey) => (
                        <CoinTile key={coinKey} topSection={topSection} coinKey={coinKey}/>
                    ))}
                </CoinGridStyled>
            }
        </AppContext.Consumer>
    );
};

export default CoinGrid;