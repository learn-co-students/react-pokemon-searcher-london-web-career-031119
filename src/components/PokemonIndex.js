import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const pokemonURL = "http://localhost:3000/pokemon"

class PokemonPage extends React.Component {

  state = {
    pokemons: []
  }

  getPokemons = () => {
    return fetch(pokemonURL)
      .then(resp => resp.json())
  }

  addPokemon = (pokemon) => {
    const newPokemon = {
      "id": 1,
      "name": pokemon.name,
      "stats": [
        {
          "name": "special-defense"
        },
        {
          "name": "special-attack"
        },
        {
          "name": "defense"
        },
        {
          "name": "attack"
        },
        {
          "name": "speed"
        },
        {
          "value": pokemon.hp,
          "name": "hp"
        }
      ],
      "sprites": {
        "front": pokemon.frontUrl,
        "back": pokemon.backUrl
      }
    }

    return fetch(pokemonURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( newPokemon )
    })
    .then(resp => resp.json())
    .then(result => {
      this.setState({ pokemons: [result, ...this.state.pokemons]})
    })
    
  }

  componentDidMount() {
    this.getPokemons()
      .then(pokemons => this.setState({
        pokemons: pokemons.sort((a, b) => a.id - b.id )
    }))
  }

  handleSearchChange = (event, { value }) => {

    if (value !== "") {
      this.getPokemons()
        .then(pokemons => this.setState({
          pokemons: pokemons.sort((a, b) => a.id - b.id )
      }))
        .then(res => {
          const filteredPokemons = this.state.pokemons.filter(pokemon => pokemon.name.includes(value))
          this.setState({ pokemons: filteredPokemons })    
        })
    } else {
      this.getPokemons()
        .then(pokemons => this.setState({
          pokemons: pokemons.sort((a, b) => a.id - b.id )
        }))
    }
  }

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleSearchChange, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokeList={this.state.pokemons} />
        <br />
        <PokemonForm addPokemon={this.addPokemon}/>
      </div>
    )
  }
}

export default PokemonPage
