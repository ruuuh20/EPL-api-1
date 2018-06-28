import React, { Component } from 'react';
import axios from 'axios';
import './fixtures.css'
import Fixture from '../components/Fixture';
import FixtureInfo from '../components/FixtureInfo'

class Fixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixtures: [],
      selectedId: null
    }
  }

  componentDidMount() {
    const token = '44caba9c4c56410185f1561dfed18948'
    const old_url = 'https://api.football-data.org//v1/competitions/445/fixtures'
    const new_url = 'https://api.football-data.org/v2/competitions/2021'

  axios.get(old_url, 
  { headers: 
    { 'X-Auth-Token': token,
    'Access-Control-Allow-Methods': "GET",
    'Access-Control-Allow-Origin': "*"
   }})
    .then(response =>  {
      console.log(response.data)

        // const fixtures = response.data.slice(0, 10);
      this.setState({
        fixtures: response.data.fixtures.slice(0, 15)
      })
    })
    .catch((error) => {
        console.log('error ' + error);
      });
  }

  selectedHandler = (id) => {
    this.setState({
      selectedId: id
    })

  }

  render() {
    const fixtures = this.state.fixtures.map(fixture => {
      return <Fixture key={fixture.id}
          status={fixture.status}
          homeTeamName={fixture.homeTeamName}
          awayTeamName={fixture.awayTeamName}
          clicked={() => this.selectedHandler(fixture.id)}/>

    })

    const gamesArray =[]
    const finishedGames = this.state.fixtures.filter(fixture => {
      fixture.status === "FINISHED"
    })

  for (var i; i < finishedGames.length; i++) {
    gamesArray.push(finishedGames[i])

  }

    return (
      <div className="fixtures">

      {fixtures}
        </div>
    )
  }
}

export default Fixtures;
