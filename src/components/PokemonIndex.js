import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    pokemonSearch: ''
  }


  getPokemons = () => {
    fetch('http://localhost:3000/pokemon')
      .then(resp => resp.json())
      .then(pokemons => this.setState({pokemons}))
  }

  createPokemon = pokemon => {
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      header: {"Content-Type": "application/json"},
      body: JSON.stringify(pokemon)
    }).then(resp => resp.json())
  }

  updateState = (pokemon) => {
    const pokemonsCopy = [...this.state.pokemons]
    this.createPokemon(pokemon).then(data => {
      pokemonsCopy.push(data)
      this.setState({pokemons: pokemonsCopy})
    })
  }
  
  handleSearch = ({value}) => this.setState({pokemonSearch: value})
  
  componentDidMount() {
    this.getPokemons()
  }

  render() {
    const showFilteredPokemon = this.state.pokemons.filter(poke => poke.name.includes(this.state.pokemonSearch))
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search 
          onSearchChange={_.debounce(this.handleSearch, 500)} 
          showNoResults={false} />
        <br />
        <PokemonCollection pokemons={showFilteredPokemon} />
        <br />
        <PokemonForm
          createPokemon={this.updateState}
        />
      </div>
    )
  }
}

export default PokemonPage
