import React, { Component } from "react";
import PropTypes from "prop-types";

export class DrinkItem extends Component {
  getStyle = () => {
    return {
      padding: "10px",
      margin: "2%",
      borderBottom: "1px #ccc dotted",
      background: this.props.drink.shelved ? "#34bf5c" : "#303030",
      'white-space': "pre-wrap"
    };
  };

  componentDidMount = (props) => {
    console.log(this.props.drink);
  };

  render() {
    const { id, name, ingredients } = this.props.drink;
    return (
      <div style={this.getStyle()} >
        <p>
          {name}
          <button onClick={this.props.delDrink.bind(this, id)} style={btnStyle}>
            X
          </button>
          <p style = {{color: 'green', overflow: 'hidden'}}>
            {ingredients}
          </p>
        </p>
      </div>
    );
  }
}

// PropTypes
DrinkItem.propTypes = {
  drink: PropTypes.object.isRequired,
  markShelved: PropTypes.func.isRequired,
  delDrink: PropTypes.func.isRequired,
};

const btnStyle = {
  color: "#1e1e1e",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};

export default DrinkItem;
