import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  state = {
    pokemon: [],
    search: null,
    found: [],
  }
  getPokemon() {
    fetch('http://localhost:3000/pokemon')
      .then(r => r.json())
      .then(pokemon => this.setState({ pokemon }))
      .catch(error => alert(error))
  }
  postPokemon(pokemon) {
    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pokemon)
    })
  }
  componentDidMount() {
    this.getPokemon()
  }
  searchPokemon(search) {
    search == null
      ? this.setState({ search: null })
      : this.setState({ search })
    if (search !== null) {
      this.setState({ found: this.state.pokemon.filter(pokemon => pokemon.name.includes(search)) });
    }
  }
  handleSubmit = (e, input) => {
    e.preventDefault()
    const newPokemon = {
      name: input.name,
      stats: [
        {
          value: input.hp,
          name: "hp"
        }
      ],
      sprites: {
        front: input.frontUrl,
        back: input.backUrl
      }
    }
    const pokemonCopy = this.state.pokemon.slice()
    pokemonCopy.push(newPokemon)
    this.setState({ pokemon: pokemonCopy });
    this.postPokemon(newPokemon)
  }
  render() {
    const { found, pokemon } = this.state
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={(e) => this.searchPokemon(e.target.value)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={found.empty ? pokemon : found} />
        <br />
        <PokemonForm handleSubmit={this.handleSubmit} />
      </div>
    )
  }
}

export default PokemonPage
