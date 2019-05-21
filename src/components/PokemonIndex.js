import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {
  
  state = {
    pokemon: [],
    searchValue: '',
    filteredPokemon: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(pokemon => this.setState({pokemon: pokemon, filteredPokemon: pokemon}))
    
  }

  handleChange = () => {
    this.setState({searchValue: document.querySelector('.prompt').value})
    // debugger 
    const newPok = this.state.pokemon.filter(pokemon => pokemon.name.includes(this.state.searchValue))
    this.setState({filteredPokemon: newPok})
  }




  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search onSearchChange={_.debounce(this.handleChange, 500)} />
        <br />
        <PokemonCollection 
        pokemon={ 
          this.state.searchValue
          ? this.state.filteredPokemon
          :this.state.pokemon}

        />
        <br />
        <PokemonForm />
      </div>
    )
  }
}

export default PokemonPage
