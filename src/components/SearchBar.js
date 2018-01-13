import React, { Component } from 'react';
import '../styles/css/SearchBar.css'

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.fetchGivenAddress = this.fetchGivenAddress.bind(this)
  }

  render() {
    return (
      <form action="#" method="">
        <input className="search-address" type="text" placeholder="14807 Faversham Cir # 1, Orlando, FL 32826
"/>
        <button onClick={this.fetchGivenAddress} className="search-address-button"><img alt="search button for entered address" src={require('../images/propview-search-icon.png')}/></button>
      </form>
    );
  }

  fetchGivenAddress(e) {
    e.preventDefault()
    alert('Search Address Working')
  }
}

export default SearchBar;
