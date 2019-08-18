import React from 'react';
import styled from "styled-components";
import {backgroundColor2, fontSize2} from "../Shared/Styles";
import {AppContext} from "../App/AppProvider";

const ChartSelectStyled = styled.select`
    float: right;
    ${backgroundColor2}
    ${fontSize2}
    color: #1163c9;
    border: 1px solid;
    padding: 3px;
    margin-bottom: 3px;
`;

const ChartSelect = ({options}) => {
    return (
        <AppContext.Consumer>
            {({onChartTypeChange}) => (
                <ChartSelectStyled onChange={(e) => onChartTypeChange(e.target.value)}>
                    {options.map(option => (
                        <option key={`chart-option-${option}`} value={option.toLowerCase()}>{option}</option>
                    ))}
                </ChartSelectStyled>
            )}
        </AppContext.Consumer>
    );
};

export default ChartSelect;