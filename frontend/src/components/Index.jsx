import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';

class Index extends Component {
  state = {
    text: '',
    working: false,
    done: false,
  }

  onTextChange = evt => {
    this.setState({text: evt.target.value});
  }

  hitAPI = () => {
    this.setState({ working: true });
    axios.post('http://localhost:8000/api/index/', {
        text: this.state.text
      })
      .then((response) => {
        this.setState({working: false, done: true})
        console.log(response);
      })
      .catch((error) => {
        this.setState({working: false})
        console.log(error);
      });
  }

  render() {

    const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter' && !this.state.text === '') {
        this.hitAPI();
      }
    }
    return (
      <div style = {{ padding: 20, fontSize: 24, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <center>
          You can enter the text you want to index below<br/><br/>
          <Form.Control size="lg" as="textarea" type="textarea" id="text" placeholder="Text goes here" style={{ height: '50%', maxHeight: 600, maxWidth: 1000 }} onKeyDown={onKeyDown} rows="10" onChange={this.onTextChange}/>
          {this.state.working &&
            <Button variant="primary" disabled style={{ marginTop: 20, width: '100%', height: 49}}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
            />
            <span className="sr-only">Loading...</span>
          </Button>
          }
          {!this.state.working &&
            <Button variant="primary" size="lg" onClick = {this.hitAPI} disabled={this.state.text === '' || this.state.working} style={{ marginTop: 20, width: '100%'}}>Index</Button>
          }
        </center>
        <Button variant="outline-primary" size="lg" onClick = {() => this.props.history.push('/')} style={{ position: 'absolute', height: 60, width: 60, top: 10, left: 10, borderRadius: 50}}>&lt;</Button>
        <Toast style={{ position: 'absolute', top: 30, left: 0, right: 0, margin: 'auto'}} onClose={() => this.setState({done: false})} show={this.state.done} delay={3000} autohide>
          <Toast.Header>
            <strong className="mr-auto">Done!</strong>
          </Toast.Header>
          <Toast.Body>Your text has been processed successfully.</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default Index;
