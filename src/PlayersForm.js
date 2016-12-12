import React, { Component } from 'react';

class PlayersForm extends Component {

  constructor() {
    super();
    this.state = {
      playerNames: new Array(6).fill("")
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(i) {
    var playerNames = this.state.playerNames;
    var _this = this

    return function(e) {
      playerNames[i] = e.target.value;
      _this.setState({ playerNames: playerNames });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.startGame(this.state.playerNames);
  }

  render() {
    var fields = this.state.playerNames.map((name, i) => {
      return <PlayerNameField key={i.toString()} playerNumber={i} playerName={name} handleChange={this.handleChange} />
    })

    return (
      <form onSubmit={this.handleSubmit}>
        Enter player names
        {fields}
        <input type="submit" value="Start Game" />
      </form>
    )
  }
}

class PlayerNameField extends Component {
  render() {
    var i = this.props.playerNumber;
    var name = this.props.playerName;
    return (
      <div>
        <label>Player {i}:</label>
        <input value={name} onChange={this.props.handleChange(i)} />
      </div>
    )
  }
}

export default PlayersForm;
