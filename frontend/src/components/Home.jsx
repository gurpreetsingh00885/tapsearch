import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import axios from 'axios';

class Home extends Component {
  state = { showModal : false, clearing: false, done: false};

  handleModalClose = () => {
    this.setState({ showModal: false });
  }

  clear = () => {
    this.setState({ clearing: true }, () => {
      axios.post('http://localhost:8000/api/clear/')
      .then((response) => {
        this.setState({clearing: false, done: true, showModal: false})
        console.log(response);
      })
      .catch((error) => {
        this.setState({clearing: false, showModal: false, done: true})
        console.log(error);
      });
    });
  }

  render() {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 8 }}>
        <center>
          <h1> TapSearch </h1>
          A tool for inverted paragraph-word indexing.
          <br/><br/>
          <h3>
            What do you want to do?
          </h3> <br/>
          <Button
            variant="outline-primary"
            size="lg"
            style={{
              display : "block",
              width: '80%',
              height: 80,
              maxWidth : 500,
              margin : 20
            }}
            onClick={() => this.props.history.push('/index')}
          >
            Index
          </Button>
          <Button
            variant="outline-success"
            size="lg"
            style={{
              display : "block",
              width: '80%',
              height: 80,
              maxWidth : 500,
              margin : 20
            }}
            onClick={() => this.props.history.push('/search')}
          > 
            Search
          </Button>
          <Button
            variant="outline-danger"
            size="lg"
            style={{
              display : "block",
              width: '80%',
              height: 80,
              maxWidth : 500,
              margin : 20
            }}
            onClick={() => this.setState({ showModal: true })}
          > 
            Clear
          </Button>
        </center>
        <Modal show={this.state.showModal} onHide={this.handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Woahhh!</Modal.Title>
        </Modal.Header>
        <Modal.Body>You're about to clear every paragraph and word from the index.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" disabled={this.state.clearing} onClick={this.handleModalClose}>
            Cancel
          </Button>
          

          {this.state.clearing &&
            <Button variant="danger" disabled style={{ height: 37, width: 99}}>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
              />
          </Button>
          }
          {!this.state.clearing &&
            <Button variant="danger" onClick={this.clear}>
              Go Ahead
            </Button>
          }
        </Modal.Footer>
      </Modal>
        <Toast style={{ position: 'absolute', top: 30, left: 0, right: 0, margin: 'auto'}} onClose={() => this.setState({done: false})} show={this.state.done} delay={3000} autohide>
          <Toast.Header>
            <strong className="mr-auto">Done!</strong>
          </Toast.Header>
          <Toast.Body>Everything has been erased</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default Home;
