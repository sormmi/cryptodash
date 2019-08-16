import React from 'react';
import cc from 'cryptocompare';
import _ from 'lodash';

export const AppContext = React.createContext();

const MAX_FAVORITES = 10;

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 'dashboard',
            favorites: ['BTC', 'ETH', 'XMR', 'DOGE'],
            ...this.savedSettings(),
            setPage: this.setPage,
            addCoin: this.addCoin,
            removeCoin: this.removeCoin,
            confirmFavorites: this.confirmFavorites,
            isInFavorites: this.isInFavorites,
            setFilteredCoins: this.setFilteredCoins
        };
    }

    componentDidMount() {
        this.fetchCoins();
        this.fetchPrices();
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

    savedSettings = () => {
        let cryptoDashData = JSON.parse(localStorage.getItem('cryptoDash'));
        if (!cryptoDashData) {
            return {page: 'settings', firstVisit: true};
        }
        const {favorites} = cryptoDashData;
        return {favorites};
    };

    setFilteredCoins = (filteredCoins) => this.setState({filteredCoins});

    setPage = page => this.setState({page});

    confirmFavorites = () => {
        this.setState({
            firstVisit: false,
            page: 'dashboard'
        }, () => {
            this.setState({prices: null});
            this.fetchPrices();
        });
        localStorage.setItem('cryptoDash', JSON.stringify({favorites: this.state.favorites}));
    };

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}