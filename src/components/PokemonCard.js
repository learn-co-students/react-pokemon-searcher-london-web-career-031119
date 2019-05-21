import React from "react";
import { Card } from "semantic-ui-react";

class PokemonCard extends React.Component {
  state = {
    front: true
  };

  handleClick = () => {
    this.setState({ front: !this.state.front });
  };

  render() {
    const { name, stats, sprites } = this.props.pokemon;
    const { front } = this.state;
    return (
      <Card>
        <div>
          <div className="image" onClick={this.handleClick}>
            <img src={front ? sprites.front : sprites.back} alt="oh no!" />
          </div>
          <div className="content">
            <div className="header">
              {name[0].toUpperCase() + name.substring(1)}
            </div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {stats[5].value} hp
            </span>
          </div>
        </div>
      </Card>
    );
  }
}

export default PokemonCard;
