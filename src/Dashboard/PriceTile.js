import React from 'react';
import {SelectableTile} from "../Shared/Tile";
import styled, {css} from "styled-components";
import {fontSize3, fontSizeBig, greenBoxShadow} from "../Shared/Styles";
import {CoinHeaderGridStyled} from "../Settings/CoinHeaderGrid";
import {AppContext} from "../App/AppProvider";

const numberFormat = number => +(number + '').slice(0, 7);

const JustifyRight = styled.div`
    justify-self: right; 
`;

const JustifyLeft = styled.div`
    justify-self: left; 
`;

const TickerPrice = styled.div`
    ${fontSizeBig}
`;

const ChangePct = styled.div`
    color: lime;
    ${props => props.red && css`
        color: red;
    `}    
    ${props => props.blue && css`
        color: blue;
    `}
`;

const PriceTileStyled = styled(SelectableTile)`
    ${props => props.compact && css`
        ${fontSize3}
        display: grid;
        grid-gap: 5px;
        grid-template-columns: repeat(3, 1fr);
        justify-items: right;
    `}
    
    ${props => props.currentFavorite && css`
        ${greenBoxShadow}
        pointer-events: none;
    `}   
`;

const ChangePercent = ({data}) => {
    return (
        <ChangePct red={data.CHANGEPCT24HOUR < 0} blue={data.CHANGEPCT24HOUR === 0}>
            {numberFormat(data.CHANGEPCT24HOUR)}
        </ChangePct>
    );
};

const PriceTileStyledNormal = ({sym, data, currentFavorite, setCurrentFavorite}) => {
    return (
        <PriceTileStyled onClick={setCurrentFavorite} currentFavorite={currentFavorite}>
            <CoinHeaderGridStyled>
                <div>{sym}</div>
                <JustifyRight>
                    <ChangePercent data={data}/>
                </JustifyRight>
            </CoinHeaderGridStyled>
            <TickerPrice>
                {numberFormat(data.PRICE)}€
            </TickerPrice>
        </PriceTileStyled>
    );
};

const PriceTileStyledCompact = ({sym, data, currentFavorite, setCurrentFavorite}) => {
    return (
        <PriceTileStyled onClick={setCurrentFavorite} compact currentFavorite={currentFavorite}>
            <JustifyLeft>
                <div>{sym}</div>
            </JustifyLeft>
            <ChangePercent data={data}/>
            <div>
                {numberFormat(data.PRICE)}€
            </div>
        </PriceTileStyled>
    );
};

const PriceTile = ({price, index}) => {
    const sym = Object.keys(price)[0];
    const data = price[sym]['EUR'];
    const TileClass = index < 5 ? PriceTileStyledNormal : PriceTileStyledCompact;
    return (
        <AppContext.Consumer>
            {({currentFavorite, setCurrentFavorite}) => (
                <TileClass
                    sym={sym}
                    data={data}
                    currentFavorite={currentFavorite === sym}
                    setCurrentFavorite={() => setCurrentFavorite(sym)}
                />
            )}
        </AppContext.Consumer>
    );
};

export default PriceTile;