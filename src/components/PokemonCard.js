import React, {Component} from 'react'
import { Card } from 'semantic-ui-react'


class PokemonCard extends Component {

  state = {
    sprites: 'front'
  }

  handleToggleCard = () => { 
    this.state.sprites === 'front' ? this.setState({sprites: 'back'}) : this.setState({sprites: 'front'})
}


  render() {
  const {pokemon} = this.props

  const HP = pokemon.stats.filter(el => el['name'] === 'hp').map(el => el['value'])

    return (
      <Card onClick={this.handleToggleCard}>
        <div>
          <div  className="image">
            <img src={this.state.sprites === 'front' ? pokemon.sprites.front : pokemon.sprites.back}alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {HP}
            </span>
          </div>
        </div>
      </Card>
    )
  }

  }

  

export default PokemonCard
