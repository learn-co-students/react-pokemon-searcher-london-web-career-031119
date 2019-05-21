import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { target } = event
    const newPokemon = {
      name: target[0].value,
      hp: target[1].value,
      frontUrl: target[2].value,
      backUrl: target[3].value
    }
    console.log(newPokemon)
    this.props.addPokemon(newPokemon)
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
