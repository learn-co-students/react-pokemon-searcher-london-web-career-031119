import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {

  state = {
    name: '',
    hp: '',
    frontUrl: '',
    backUrl: ''
  }

  render() {
    const { name, hp, frontUrl, backUrl } = this.state
    const { handleInput, props, state } = this
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={(e) => props.handleSubmit(e, state)}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" value={name} placeholder="Name" name="name" onChange={(e) => this.setState({ name: e.target.value })} />
            <Form.Input fluid label="hp" value={hp} placeholder="hp" name="hp" onChange={(e) => this.setState({ hp: e.target.value })} />
            <Form.Input fluid label="Front Img URL" value={frontUrl} placeholder="url" name="frontUrl" onChange={(e) => this.setState({ frontUrl: e.target.value })} />
            <Form.Input fluid label="Back Img URL" value={backUrl} placeholder="url" name="backUrl" onChange={(e) => this.setState({ backUrl: e.target.value })} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm
