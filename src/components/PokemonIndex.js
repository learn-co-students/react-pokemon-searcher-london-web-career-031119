import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

const URL = 'http://localhost:3000/pokemon'

class PokemonPage extends React.Component {

  state = {
    pokemon: [],
    searchTerm: '',
  }

  componentDidMount() {
    get(URL).then(pokemon => this.setState( { pokemon } ));
  }

  filteredPokemon = () => {
    const { pokemon, searchTerm } = this.state;
    return pokemon.filter(pokemon => pokemon.name.includes(searchTerm))
  }

  handleSearchChange = (e, {value} ) => this.setState( { searchTerm: value } )

  handleFormSubmit = ({ name, hp, frontUrl, backUrl }) => {
    const pokemon = {
      name,
      stats: [
        {
          name: 'hp',
          value: hp
        }
      ],
      sprites: {
        front: frontUrl,
        back: backUrl
      }
    }
    post(URL, pokemon).then(respPokemon => this.setState( { pokemon: [...this.state.pokemon, respPokemon] } ))
  }

  render() {
    const { filteredPokemon, handleSearchChange, handleFormSubmit } = this;
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(handleSearchChange, 500)} showNoResults={false} />
        <br />
        <PokemonCollection pokemon={filteredPokemon()} />
        <br />
        <PokemonForm handleFormSubmit={handleFormSubmit} />
      </div>
    )
  }
}

export default PokemonPage


const post = (url, data) => {
  const confiObj = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(data)
  }
  return fetch(url, confiObj)
    .then(resp => resp.json())
}

const get = url => {
  return fetch(url)
    .then(resp => resp.json())
}