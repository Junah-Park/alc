import React, { Component } from "react";
import DrinkItem from './DrinkItem';
import PropTypes from "prop-types";


class Drinks extends Component {
    render() {
        return this.props.drinks.map((drink) => (
            <DrinkItem className="mainBody" key={drink.id} drink={drink} markShelved={this.props.markShelved} delDrink={this.props.delDrink} />
        ));
    }
}

// PropTypes
Drinks.propTypes = {
    drinks: PropTypes.array.isRequired,
    markShelved: PropTypes.func.isRequired,
    delDrink: PropTypes.func.isRequired,
}

export default Drinks;