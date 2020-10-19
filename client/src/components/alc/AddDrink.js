import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AddDrink extends Component {
  state = {
    name: ''
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addDrink(this.state.name, []);
    this.setState({ name: '' });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} className="mainBody" style={{ display: 'flex' }}>
        <input 
          type="text" 
          name="name" 
          style={{ flex: '10', padding: '5px', color: 'white' }}
          placeholder="Add a drink ..." 
          value={this.state.name}
          onChange={this.onChange}
        />
        <input 
          type="submit" 
          value="Submit" 
          className="submitDrink btn"
          style={{flex: '1'}}
        />
      </form>
    )
  }
}

// PropTypes
AddDrink.propTypes = {
  addDrink: PropTypes.func.isRequired
}

export default AddDrink