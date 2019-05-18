import React from 'react'
import { Card } from 'semantic-ui-react'

const PokemonCard = ({ pokemon }) =>
  <Card>
    <div>
      <div className="image">
        <img src={pokemon.sprites.front} alt="oh no!" />
      </div>
      <div className="content">
        <div className="header">{pokemon.name}</div>
      </div>
      <div className="extra content">
        <span>
          <i className="icon heartbeat red" />
          {pokemon.stats.find(stat => stat.name === 'hp').value}
        </span>
      </div>
    </div>
  </Card>

export default PokemonCard
