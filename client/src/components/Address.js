import React, { Component } from 'react';

// Shows current account info
class Address extends Component {

  render() {

    return (
      <div>
      <div className="card">
        <div className="card-header">
          <div className="title">YOUR ADDRESS</div>
        </div>
        <div className="card-body">
          { this.props.address }
        </div>
      </div>
      </div>
    )
  }
}

export default Address
