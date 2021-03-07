// es6
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import React from 'react';

const scores = [
  {teamName: "Soul", matches: 6, won: 3, placePoints: 12, killPoints: 13, total: 25},
  {teamName: "TSM Entity", matches: 5, won: 3, placePoints: 57, killPoints: 28, total: 100},
  {teamName: "Orange Rock", matches: 2, won: 3, placePoints: 59, killPoints: 23, total: 101},
];

const columns = [{
  dataField: 'teamName',
  text: 'Team name'
}, {
  dataField: 'matches',
  text: 'Number of matches played',
  sort: true
}, {
  dataField: 'won',
  text: 'Total chicken dinner achieved',
  sort: true
}, {
  dataField: 'placePoints',
  text: 'Place Points',
  sort: true
}, {
  dataField: 'killPoints',
  text: 'Kill Points',
  sort: true
}, {
  dataField: 'total',
  text: 'total Points',
  sort: true,
}];
const calculateTotal = (placePoints,killPoints) => placePoints + killPoints
class ScoreTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: scores,
      team: '',
      matches: 0,
      won: 0,
      placePoints:0,
      killPoints:0,
    };
    this.handleTeamSubmit = this.handleTeamSubmit.bind(this);
    this.handleTeamNameChange = this.handleTeamNameChange.bind(this);
    this.handleMatchPlayedChange = this.handleMatchPlayedChange.bind(this);
    this.handleWonChange = this.handleWonChange.bind(this);
    this.handlePlacePointsChange = this.handlePlacePointsChange.bind(this);
    this.handleKillPointsChange = this.handleKillPointsChange.bind(this);
    this.handleElementUpdate = this.handleElementUpdate.bind(this);
  }

  handleTeamSubmit(event) {
    var newScores = this.state.scores;
    const teamName = this.state.team
    const teamAlreadyExists = this.state.scores.some(obj => obj.teamName === teamName);
    if(teamAlreadyExists) {
      alert("Team name "+ teamName+ " already exists")
    } else {
      newScores.push({
        teamName:this.state.team,
        matches: this.state.matches,
        won: this.state.won,
        placePoints: this.state.placePoints,
        killPoints: this.state.killPoints,
        total: calculateTotal(this.state.placePoints, this.state.killPoints)
      })
      this.setState({
        scores: newScores,
        team: '',
        matches: 0,
        won: 0,
        placePoints:0,
        killPoints:0,
        total: 0,
      });
    }
    event.preventDefault();
  }

  handleTeamNameChange(event) {
    const teamName = event.target.value;
    this.setState({...this.state, team: teamName});
  }

  handleMatchPlayedChange(event) {
    const mp = parseInt(event.target.value);
    this.setState({...this.state, matches: mp});
  }

  handleWonChange(event) {
    const won = parseInt(event.target.value);
    this.setState({...this.state, won: won});
  }
  handlePlacePointsChange(event) {
    const pp = parseInt(event.target.value);
    this.setState({...this.state, placePoints: pp});
  }
  handleKillPointsChange(event) {
    const kp = parseInt(event.target.value);
    this.setState({...this.state, killPoints: kp});
  }

  handleElementUpdate(oldValue, newValue, row, column) {
    console.log("oldvalue",oldValue,"newValue", newValue, "row",row, "column", column)
    let updatedScores = this.state.scores
    const objIndex = updatedScores.findIndex((obj => obj.teamName == row.teamName))
    let editedObj = updatedScores[objIndex]
    // update object
    editedObj[column.dataField] = parseInt(newValue)
    console.log("Edited object", editedObj)
    editedObj.total = calculateTotal(editedObj.placePoints,editedObj.killPoints)
    //set object at same position
    updatedScores[objIndex] = editedObj
    this.setState({...this.state, scores: updatedScores});
  }

  render() {
    return (
      <div>
        <div >
          <BootstrapTable keyField='team' classes="table table-dark" data={ this.state.scores } columns={ columns } cellEdit={cellEditFactory({mode: 'click', afterSaveCell: this.handleElementUpdate})} />
        </div>
        <div>
          <form onSubmit={this.handleTeamSubmit}>
            <label>
              Team Name:
              <input type="text" name="teamName" onChange={this.handleTeamNameChange} value={this.state.team}/>
            </label>
            <br/>
            <label>
              Matches Played:
              <input type="number" name="matches" min="0" max="1000" onChange={this.handleMatchPlayedChange} value={this.state.matches}/>
            </label>
            <br/>
            <label>
              Won:
              <input type="number" name="won" min="0" max="1000" onChange={this.handleWonChange} value={this.state.won}/>
            </label>
            <br/>
            <label>
              PlacePoints:
              <input type="number" name="placePoints" min="0" max="1000" onChange={this.handlePlacePointsChange} value={this.state.placePoints}/>
            </label>
            <br/>
            <label>
              Kill Points:
              <input type="number" name="killPoints" min="0" max="1000" onChange={this.handleKillPointsChange} value={this.state.killPoints}/>
            </label>
            <br/>
            <input type="submit" value="Add Team" />
          </form>
        </div>
      </div>
    );
  }
}

export default ScoreTable;
