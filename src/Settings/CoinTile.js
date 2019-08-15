import React from 'react';
import {AppContext} from "../App/AppProvider";
import {DeletableTile, DisabledTile, SelectableTile} from "../Shared/Tile";
import CoinHeaderGrid from "./CoinHeaderGrid";
import CoinImage from "./CoinImage";

const CoinTile = ({coinKey, topSection}) => {
    return (
        <AppContext.Consumer>
            {({coinList}) => {
                let coin = coinList[coinKey];

                let TileClass = SelectableTile;
                if (topSection) {
                    TileClass = DeletableTile;
                }
                const e = DisabledTile;
                return (
                    <TileClass>
                        <CoinHeaderGrid topSection={topSection} name={coin.CoinName} symbol={coin.Symbol}/>
                        <CoinImage coin={coin}/>
                    </TileClass>
                );
            }}
        </AppContext.Consumer>
    );
};

export default CoinTile;