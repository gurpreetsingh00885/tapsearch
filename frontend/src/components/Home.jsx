import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Home extends Component {
  render() {
    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <center>
          <h1> TapSearch </h1>
          A tool for inverted paragraph-word indexing.
          <br/><br/>
          <h3>
            What do you want to do?
          </h3> <br/><br/>
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
            variant="outline-danger"
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
        </center>

      </div>
    );
  }
}

export default Home;
