import React from 'react';
import {AppContext} from "../App/AppProvider";
import styled from "styled-components";
import PriceTile from "./PriceTile";

const PriceGridStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 15px;
    margin-top: 40px;
`;

const PriceGrid = () => {
    return (
        <AppContext.Consumer>
            {({prices, currentFavorite}) => (
                <PriceGridStyled>
                    {prices.map((price, index) =>
                        <PriceTile key={index}
                                   price={price}
                                   index={index}
                                   currentFavorite={currentFavorite}/>)}
                </PriceGridStyled>
            )}
        </AppContext.Consumer>
    );
};
export default PriceGrid;