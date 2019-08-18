import React from 'react';
import ReactHighcharts from "react-highcharts";
import highchartsConfig from './HighchartsConfig';
import {Tile} from "../Shared/Tile";
import {AppContext} from "../App/AppProvider";
import HighchartsTheme from "./HighchartsTheme";
import ChartSelect from "./ChartSelect";

ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

const PriceChart = () => {
    return (
        <AppContext.Consumer>
            {({historical}) => (
                <Tile>
                    <ChartSelect
                        defaultValue={'months'}
                        options={['Days', 'Weeks', 'Months']}
                    />
                    {historical ?
                        <ReactHighcharts config={highchartsConfig(historical)}/>
                        : <div>Loading historical data...</div>
                    }
                </Tile>
            )}
        </AppContext.Consumer>
    );
};

export default PriceChart;