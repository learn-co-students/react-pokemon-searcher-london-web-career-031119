import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  state = {
    sprites: "front"
  };

  pokemonHp = () => {
    const hp = this.props.pokemon.stats.filter(stat => stat.name === "hp");
    return hp[0].value;
  };

  sprites = () => {
    this.state.sprites === "front"
      ? this.setState({ sprites: "back" })
      : this.setState({ sprites: "front" });
  };

  render() {
    const { pokemon } = this.props;

    return (
      <Card>
        <div>
          <div onClick={this.sprites} className="image">
            <img
              alt="oh no!"
              src={
                this.state.sprites === "front"
                  ? pokemon.sprites.front
                  : pokemon.sprites.back
              }
            />
          </div>
          <div className="content">
            <div className="header">{pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.pokemonHp()}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
