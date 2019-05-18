import React from "react";
import { Form } from "semantic-ui-react";

class PokemonForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      stats: [{ value: "", name: "hp" }],
      sprites: { front: "", back: "" }
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.createPokemon(this.state);
    this.setState({
      name: "",
      stats: [{ value: "", name: "hp" }],
      sprites: { front: "", back: "" }
    });
  };

  handleName = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleHp = event => {
    this.setState({
      stats: [{ value: event.target.value, name: "hp" }]
    });
  };

  handlefront = event => {
    this.setState({
      sprites: {
        ...this.state.sprites,
        front: event.target.value
      }
    });
  };

  handleback = event => {
    this.setState({
      sprites: { ...this.state.sprites, back: event.target.value }
    });
  };

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Name"
              placeholder="Name"
              name="name"
              id="name"
              onChange={this.handleName}
              value={this.state.name}
            />
            <Form.Input
              fluid
              label="hp"
              placeholder="hp"
              name="hp"
              id="hp"
              onChange={this.handleHp}
              value={this.state.stats[0].value}
            />
            <Form.Input
              fluid
              label="Front Image URL"
              placeholder="url"
              name="front"
              id="front"
              onChange={this.handlefront}
              value={this.state.sprites.front}
            />
            <Form.Input
              fluid
              id="back"
              label="Back Image URL"
              placeholder="url"
              name="back"
              onChange={this.handleback}
              value={this.state.sprites.back}
            />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default PokemonForm;
