import React, { Component } from 'react';

class Player extends Component {
  render() {
    return (
      <div>
        {this.props.name}: {this.props.score}
      </div>
    )
  }
}

export default Player;
