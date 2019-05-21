import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    flipped: false
  }

  handleClick = () => {
    this.setState({ flipped: !this.state.flipped })
  }

  render() {
    const { pokemon } = this.props

    return (
      <Card>
        <div onClick={this.handleClick}>
          <div className="image">
            {
              this.state.flipped
                ? <img src={pokemon.sprites.back} alt="oh no!" />
                : <img src={pokemon.sprites.front} alt="oh no!" />
            }
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {pokemon.stats[5].value} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
