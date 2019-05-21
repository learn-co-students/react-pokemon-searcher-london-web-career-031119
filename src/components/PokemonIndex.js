import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";

const URL = "http://localhost:3000/pokemon";

class PokemonPage extends React.Component {
  state = {
    pokemon: []
  };

  addPokemon = data => {
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(data)
    }).then(() => {
      this.fetchPokemon();
    });
  };

  handleFormSubmit = form => {
    let data = {
      name: form.name,
      stats: [
        null,
        null,
        null,
        null,
        null,
        {
          value: form.hp,
          name: "hp"
        }
      ],
      sprites: {
        front: form.frontUrl,
        back: form.backUrl
      }
    };
    this.addPokemon(data);
  };

  componentDidMount() {
    this.fetchPokemon();
  }

  fetchPokemon = () => {
    fetch(URL)
      .then(resp => resp.json())
      .then(data => this.setState({ pokemon: data }));
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ searchTerm: value });
  };

  filteredPokemon = () => {
    const { pokemon, searchTerm } = this.state;
    return pokemon.filter(pokemon => pokemon.name.includes(searchTerm));
  };

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          onSearchChange={_.debounce(this.handleSearchChange, 500)}
          showNoResults={false}
        />
        <br />
        <PokemonCollection pokemon={this.filteredPokemon()} />
        <br />
        <PokemonForm handleFormSubmit={this.handleFormSubmit} />
      </div>
    );
  }
}

export default PokemonPage;
