import React, { Component } from 'react';

class ScoreForm extends Component {
  constructor(props) {
    super();
    this.state = {
      crystalScore: 1,
      tigerScore: props.player.deadTiger ? -1 : 2,
      deadTiger: false,
      diceScore: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    var key = e.target.name;
    var val = e.target.value;
    this.setState({ [key] : parseInt(val, 10) });
  }

  handleSubmit(e) {
    e.preventDefault();
    var score = this.state.crystalScore + this.calcTigerScore() + this.state.diceScore;
    var deadTiger = this.state.deadTiger || this.state.tigerScore === -1;
    this.props.recordScore(this.props.player.id, score, deadTiger);
  }

  calcTigerScore() {
    return(this.state.tigerScore === -1 ? 0 : this.state.tigerScore)
  }
  
  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-xs-4">
            <h5>Crystal</h5>
            <select className="form-control" name="crystalScore" value={this.state.crystalScore} onChange={this.handleChange}>
              <option value="1">Side</option>
              <option value="5">Pyramid</option>
              <option value="0">Didn&#39;t Roll</option>
            </select>
          </div>
          <div className="col-xs-4">
            <h5>Tiger</h5>
            <select className="form-control" name="tigerScore" value={this.state.tigerScore} onChange={this.handleChange} disabled={this.props.player.deadTiger}>
              <option value="2">Side</option>
              <option value="10">Upright</option>
              <option value="-1">Dead Tiger</option>
              <option value="0">Didn&#39;t Roll</option>
            </select>
          </div>
          <div className="col-xs-4">
            <h5>Dice</h5>
            <select className="form-control" name="diceScore" value={this.state.diceScore} onChange={this.handleChange}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="0">Didn&#39;t Roll</option>
            </select>
          </div>
        </div>
        <div className="row margin-top">
          <div className="col-md-12 text-center">
            <input type="submit" className="btn btn-primary" value="Submit Score" />
          </div>
        </div>
      </form>
    )
  }
}

export default ScoreForm;
