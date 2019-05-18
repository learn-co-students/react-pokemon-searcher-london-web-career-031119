import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";

class PokemonPage extends React.Component {
  state = {
    pokemons: [],
    searchTerm: ""
  };

  getPokemons = () =>
    fetch("http://localhost:3000/pokemon").then(resp => resp.json());

  createPokemon = pokemon =>
    fetch("http://localhost:3000/pokemon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pokemon)
    }).then(resp => resp.json());

  updateState = pokemon => {
    const stateCopy = [...this.state.pokemons];
    this.createPokemon(pokemon).then(data => {
      stateCopy.push(data);
      this.setState({ pokemons: stateCopy });
    });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ searchTerm: value });
  };

  componentDidMount() {
    this.getPokemons().then(pokemons => this.setState({ pokemons }));
  }

  render() {
    const desiredPokemon = this.state.pokemons.filter(p =>
      p.name.includes(this.state.searchTerm)
    );
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <Search
          onSearchChange={_.debounce(this.handleSearchChange, 500)}
          showNoResults={false}
        />
        <br />
        <PokemonForm createPokemon={this.updateState} />
        <br />
        <PokemonCollection pokemons={desiredPokemon} />
      </div>
    );
  }
}

export default PokemonPage;
