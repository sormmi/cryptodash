import React from 'react';
import styled from "styled-components";
import {backgroundColor2, fontSize2} from "../Shared/Styles";
import {AppContext} from "../App/AppProvider";
import _ from 'lodash';
import fuzzy from 'fuzzy';

const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    
`;
const SearchInput = styled.input`
    ${backgroundColor2}
    ${fontSize2}
    font-weight: 900;
    border: 1px solid;
    height: 30px;
    padding-left: 6px;
    color: #116379;
    place-self: center left;
`;

const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
    const coinSymbols = Object.keys(coinList);
    const coinNames = coinSymbols.map(symbol => coinList[symbol].CoinName);
    const allStringsToSearch = coinSymbols.concat(coinNames);

    const fuzzyResults = fuzzy
        .filter(inputValue, allStringsToSearch, {})
        .map(res => res.string);

    const filteredCoins = _.pickBy(coinList, (result, symkey) => {
        const coinName = result.CoinName;
        return (_.includes(fuzzyResults, symkey) || _.includes(fuzzyResults, coinName));
    });

    setFilteredCoins(filteredCoins);

}, 300);

const filterCoins = (e, setFilteredCoins, coinList) => {
    const searchValue = e.target.value;
    if (!searchValue) {
        setFilteredCoins(null);
    } else {
        handleFilter(e.target.value, coinList, setFilteredCoins);
    }
};

const Search = () => {
    return (
        <AppContext.Consumer>
            {({setFilteredCoins, coinList}) =>
                <SearchGrid>
                    <h3>Search all coins</h3>
                    <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)}/>
                </SearchGrid>
            }
        </AppContext.Consumer>
    );
};

export default Search;