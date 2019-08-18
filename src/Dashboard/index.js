import React from 'react';
import Page from "../Shared/Page";
import PriceGrid from "./PriceGrid";
import CoinSpotlight from "./CoinSpotlight";
import PriceChart from "./PriceChart";
import styled from "styled-components";

const ChartGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 15px;
    margin-top: 20px;
`;

const Dashboard = () => {
    return (
        <Page name="dashboard">
            <PriceGrid/>
            <ChartGrid>
                <CoinSpotlight/>
                <PriceChart/>
            </ChartGrid>
        </Page>
    );
};

export default Dashboard;