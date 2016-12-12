import React, { Component } from 'react';
import Player from './Player.js';
import PlayersForm from './PlayersForm.js';
import ScoreForm from './ScoreForm.js';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      gameState: "register",
      turn: 0,
      winner: null,
    };

    this.startGame = this.startGame.bind(this);
    this.recordScore = this.recordScore.bind(this);
  }

  startGame(playerNames) {
    var players = [];
    var id = 0;

    playerNames.forEach((name, i) => {
      if (name) {
        players.push({
          id: id,
          name: name,
          score: 0,
          deadTiger: false,
        });
        id += 1;
      }
    });

    this.setState({
      players: players,
      gameState: "started",
      currentPlayer: players[0],
    });
  }

  recordScore(playerId, score, deadTiger) {
    var players = this.state.players;
    var nextPlayerId = this.nextPlayerId(playerId);
    var thisTurn = this.state.turn + 1;

    players.forEach((player) => {
      if (player.id === playerId) {
        player.score += score;
        player.deadTiger = deadTiger;
      }
      if (player.id === nextPlayerId) {
        this.setState({currentPlayer: player});
      }
    });

    this.setState({players: players, turn: thisTurn});
    this.afterScoreRecorded(players);
  }

  nextPlayerId(id) {
    var maxId = this.state.players.length - 1;
    var newId = id + 1;
    return(newId > maxId ? 0 : newId);
  }

  renderPlayers() {
    return (this.state.players.map((player) => {
      return(<Player name={player.name} score={player.score} key={player.id} />);
    }));
  }

  afterScoreRecorded(players) {
    this.checkOver(players);
    this.checkAllDeadTigers(players);
    this.checkWinner(players);
  }

  checkWinner(players) {
    players.forEach((player) => {
      if (player.score === 100) {
        this.setState({gameState: "winner", winner: player})
      }
    })
  }

  checkOver(players) {
    players.forEach((player) => {
      if (player.score > 100) {
        player.score = 50;
      }
    })
    this.setState({players: players});
  }


  checkAllDeadTigers(players) {
    var aliveTigers = players.filter((player) => {
      return(!player.deadTiger)
    })
    if (!aliveTigers.length) {
      this.setState({gameState: "dead-tigers"})
    }
  }

  render() {
    var content = null;
    switch (this.state.gameState) {
      case "register":
        content = <PlayersForm startGame={this.startGame} />;
        break;
      case "started":
        content =
        <div>

          {this.renderPlayers()}

          <CurrentPlayer player={this.state.currentPlayer} />
          <ScoreForm player={this.state.currentPlayer} recordScore={this.recordScore} key={this.state.turn} />
        </div>
        break;
      case "dead-tigers":
        content = <span>All tigers died</span>
        break;
      case "winner":
        content = <span>Winner: {this.state.winner.name}</span>
        break;
      default:
        content = <span>Invalid game</span>
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

const CurrentPlayer = (props) => {
  return(
    <div>
      <h1>{props.player.name}</h1>
      <h3>{props.player.score}</h3>
    </div>
  );
}

export default Game;
