import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  state = { sideShowing: "front" };

  handleFlipCard = () => {
    this.state.sideShowing === "front"
      ? this.setState({ sideShowing: "back" })
      : this.setState({ sideShowing: "front" });
  };

  render() {
    return (
      <Card onClick={this.handleFlipCard}>
        <div>
          <div className="image">
            <img
              src={this.props.pokemon.sprites[this.state.sideShowing]}
              alt={this.props.pokemon.name}
            />
          </div>
          <div className="content">
            <div className="header">{this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats.find(stat => stat.name === "hp").value}
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
