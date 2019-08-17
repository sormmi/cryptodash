import React from 'react';
import Page from "../Shared/Page";
import PriceGrid from "./PriceGrid";
import CoinSpotlight from "./CoinSpotlight";
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
                <div>Chart goes here</div>
            </ChartGrid>
        </Page>
    );
};

export default Dashboard;