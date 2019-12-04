import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class Search extends Component {
  state = {
    text: ""
  }

  onTextChange = evt => {
    var text = document.getElementById('text').value;
    this.setState({ text  });
  }

  search = evt => {
    this.props.history.push(`/search/${this.state.text}`, {key: this.state.text});
  }

  render() {

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter' && this.state.text !== '') {
        this.search();
      }
    }

    return (
      <div style = {{ padding: 20, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h1> TapSearch </h1>
          <InputGroup size="lg" className="mb-3" style={{ maxWidth: 600, marginTop: 60 }}>
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-lg"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Word"
              aria-label="Word"
              aria-describedby="basic-addon2"
              id="text"
              onChange={this.onTextChange}
              onKeyDown={onKeyDown}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" disabled={this.state.text === ""} onClick={this.search}>Go</Button>
            </InputGroup.Append>
          </InputGroup>
      </div>
    );
  }
}

export default Search;
