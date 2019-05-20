import React from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import { Search } from "semantic-ui-react";
import _ from "lodash";

const API = "http://localhost:3000/pokemon";

class PokemonPage extends React.Component {
  state = {
    allPokemons: [],
    searchTerm: ""
  };

  componentDidMount() {
    return fetch(API)
      .then(resp => resp.json())
      .then(data => this.setState({ allPokemons: data }));
  }

  addPokemonToState = pokemon => {
    const allPokemons = [...this.state.allPokemons];
    allPokemons.push(pokemon);
    this.setState({ allPokemons });
  };

  addPokemonToServer = pokemon =>
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pokemon)
    }).then(resp => resp.json());

  handleSubmit = event => {
    event.preventDefault();

    const pokemon = {
      name: event.target.name.value,
      stats: [{ value: [event.target.hp.value], name: "hp" }],
      sprites: {
        front: event.target.frontUrl.value,
        back: event.target.backUrl.value
      }
    };

    this.addPokemonToServer(pokemon).then(data => this.addPokemonToState(data));
  };

  handleSearchChange = (e, { value }) => this.setState({ searchTerm: value });

  render() {
    const filteredPokemons = this.state.allPokemons.filter(p =>
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
        <PokemonCollection displayedPokemons={filteredPokemons} />
        <br />
        <PokemonForm handleSubmit={e => this.handleSubmit(e)} />
      </div>
    );
  }
}

export default PokemonPage;
