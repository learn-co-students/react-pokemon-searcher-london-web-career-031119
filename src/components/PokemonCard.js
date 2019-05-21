import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {
  
  state = {
    pokemon: this.props.pokemon,
    side: 'front' 
  }

  handleClick =  () => {
    this.state.side === 'front'
    ? this.setState({side: 'back'})
    : this.setState({side: 'front'}) 
  }
  
  
  render() {
    
    return (
      <Card>
        <div>
          <div className="image" onClick={this.handleClick}>
           {this.state.side === 'back'
            ?<img src={this.props.pokemon.sprites.back} /> 
            :<img src={this.props.pokemon.sprites.front} /> 
           }
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats.find(name => name.name==='hp').value}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
