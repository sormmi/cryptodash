import React from 'react';
import cc from 'cryptocompare';
import _ from 'lodash';
import moment from "moment";

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            chartTimeUnit: 'months',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            confirmFavorites: this.confirmFavorites,
            setCurrentFavorite: this.setCurrentFavorite,
            isInFavorites: this.isInFavorites,
            setFilteredCoins: this.setFilteredCoins,
            onChartTypeChange: this.onChartTypeChange
        };
    }

    componentDidMount() {
        this.fetchCoins();
        this.fetchPrices();
        this.fetchHistorical();
    }

    addCoin = key => {
        let favorites = [...this.state.favorites];
        if (favorites.length < MAX_FAVORITES) {
            if (!favorites.includes(key)) {
                favorites.push(key);
                this.setState({favorites});
            }
        }
    };

    removeCoin = key => {
        let favorites = [...this.state.favorites];
        this.setState({favorites: _.pull(favorites, key)});
    };

    isInFavorites = key => _.includes(this.state.favorites, key);

    fetchCoins = async () => {
        let coinList = (await cc.coinList()).Data;
        this.setState({coinList});
    };

    fetchPrices = async () => {
        if (this.state.firstVisit) return;
        let prices = await this.prices();
        // filter out the empty price objects
        prices = prices.filter(price => Object.keys(price).length);
        this.setState({prices});
    };

    fetchHistorical = async () => {
        if (this.state.firstVisit) return;
        let results = await this.historical();

        let historical = [
            {
                name: this.state.currentFavorite,
                data: results.map((ticker, index) => [
                        moment()
                            .subtract({[this.state.chartTimeUnit]: TIME_UNITS - index})
                            .valueOf(),
                        ticker.EUR
                    ]
                )
            }
        ];
        this.setState({historical});
    };

    prices = async () => {
        let returnData = [];
        for (let i = 0; i < this.state.favorites.length; i++) {
            try {
                let priceData = await cc.priceFull(this.state.favorites[i], 'EUR');
                returnData.push(priceData);
            } catch (err) {
                console.warn('Fetch price error', err);
            }
        }
        return returnData;
    };

    historical = async () => {
        let promises = [];
        for (let units = TIME_UNITS; units > 0; units--) {
            promises.push(
                await cc.priceHistorical(
                    this.state.currentFavorite,
                    ['EUR'],
                    moment()
                        .subtract({
                            [this.state.chartTimeUnit]:
                            units
                        })
                        .toDate()
                )
            );
        }
        return Promise.all(promises);
    };

    savedSettings = () => {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            return {page: 'settings', firstVisit: true};
        }
        const {favorites, currentFavorite} = cryptoDashData;
        return {favorites, currentFavorite};
    };

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});

    setPage = page => this.setState({page});

    setCurrentFavorite = (sym) => {
        this.setState({currentFavorite: sym, historical: null}, this.fetchHistorical);

        localStorage.setItem('cryptoDash', JSON.stringify({
            ...JSON.parse(localStorage.getItem('cryptoDash')),
            currentFavorite: sym
        }));
    };

    onChartTypeChange = (val) => {
        this.setState({chartTimeUnit: val, historical: null}, this.fetchHistorical);
    };

    confirmFavorites = () => {

        let currentFavorite = this.state.favorites.length > 0 ? this.state.favorites[0] : null;
        this.setState({
            firstVisit: false,
            page: 'dashboard',
            currentFavorite
        }, () => {
            this.setState({prices: null, historical: null});
            this.fetchPrices();
            this.fetchHistorical();
        });
        localStorage.setItem('cryptoDash', JSON.stringify({favorites: this.state.favorites, currentFavorite}));
    };

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}