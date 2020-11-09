import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      scorePlayers: [],
    }
    this.loadFromLocalStorage = this.loadFromLocalStorage.bind(this);
  }

  componentDidMount() {
    const { loadFromLocalStorage } = this;
    loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    const { name, email, score } = this.props;
    const actualPlayer = { name, email, score };
    const actualScorePlayers = JSON.parse(localStorage.getItem('scorePlayers'));
    const scorePlayers = actualScorePlayers ? actualScorePlayers : [];

    scorePlayers.push(actualPlayer);
    localStorage.setItem('scorePlayers', JSON.stringify(scorePlayers));
    scorePlayers.sort((a, b) => a.score < b.score ? 1 : a.score > b.score ? -1 : 0);

    this.setState({ scorePlayers, updated: true });
  }

  render() {
    const { scorePlayers } = this.state;
    return (
      <div>
        <div>Ranking</div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Nome</th>
              <th>Pontuação</th>
            </tr>
          </thead>
          <tbody>
            { scorePlayers.map((ply, index) => {
              return (
                <tr key={ index }>
                  <td>
                    <img
                      alt="gravatar"
                      src={ `https://www.gravatar.com/avatar/${md5(ply.email)}` }
                    />
                  </td>
                  <td>
                    <h4 data-testid={ `player-name-${index}` }>{ ply.name }</h4>
                  </td>
                  <td>
                    <h4 data-testid={ `player-score-${index}` }>{ ply.score }</h4>
                  </td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.game.score,
})

export default connect(mapStateToProps,null)(Ranking);
