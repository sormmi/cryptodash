import React from 'react';
import styled from "styled-components";
import {backgroundColor2, fontSize2} from "../Shared/Styles";

const SearchGrid = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    
`;
const SearchInput = styled.input`
    ${backgroundColor2}
    ${fontSize2}
    font-weight: 900;
    border: 1px solid;
    height: 25px;
    color: #116379 ;
    place-self: center left;
`;
const Search = () => {
    return (
        <SearchGrid>
            <h2>Search all coins</h2>
            <SearchInput/>
        </SearchGrid>
    );
};

export default Search;