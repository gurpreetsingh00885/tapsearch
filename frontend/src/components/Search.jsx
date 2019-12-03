import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

class Search extends Component {
  state = {
    'boardId' : '',
    show : true
  }

  ws = null;

  render() {

    const sendMessage = (e) => {
      var text = document.getElementById('text');
      this.ws.send(JSON.stringify({
           'message': text.value
       }))
      text.value = '';
    }

    const connectWebSocket = (e) => {
      var boardId = document.getElementById('board_id').value;
      var loc = window.location;
      var wsStart = 'ws://';
      if (loc.protocol == 'https:')
        wsStart = 'wss://';
      var endpoint = wsStart + loc.host + '/ws/board/' + boardId + '/';

      this.ws = new WebSocket(endpoint);

      this.ws.onopen = () => {
        // on connecting, do nothing but log it to the console
        console.log('connected')
        this.setState({'boardId' : boardId});
      }

      this.ws.onmessage = evt => {
        // on receiving a message, add it to the list of messages
        const message = JSON.parse(evt.data);
        console.log(message);
      }

      this.ws.onclose = () => {
        console.log('disconnected')
        // automatically try to reconnect on connection loss
        this.setState({
          boardId: ''
        })
      }

    }

    const onKeyDownConnect = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter') {
        connectWebSocket();
      }
    }

    const onKeyDownSend = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === 'Enter') {
        event.preventDefault();
        sendMessage();
      }
    }


    if (this.state.boardId === '')
      return (
        <div style = {{ fontSize: 24, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <center>
            You need to connect to the receiver.<br/>
            In order to do this, you will require the board Id.<br/>
            You can find the board Id on the receiver.<br/><br/>
            <Form.Control size="lg" type="text" id="board_id" placeholder="Board ID" style={{ width: '100%', maxWidth: 400 }} onKeyDown={onKeyDownConnect}/>
            <Button variant="primary" size="lg" onClick = {connectWebSocket} style={{ marginTop: 20, width: '100%', maxWidth: 400 }}>Connect</Button>
            <Button variant="outline-primary" size="lg" onClick = {() => this.props.history.push('/')} style={{ position: 'absolute', height: 60, width: 60, top: 10, left: 10, borderRadius: 50}}>&lt;</Button>
          </center>
        </div>
      );

    return (
      <div style = {{ fontSize: 30, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Toast onClose={() => this.setState({show: false})} style={{ position: 'absolute', top: 20 }} show={this.state.show} delay={3000} autohide>
          <Toast.Body>
            Connected to board #<b>{this.state.boardId}</b>
          </Toast.Body>
        </Toast>
        <center>
          Send text to board #<b>{this.state.boardId}</b><br/><small>or <a onClick={() => this.setState({boardId: ''})} className="reconnect">reconnect</a></small><br/><br/>
          <Form.Control size="lg" as="textarea" type="textarea" id="text" placeholder="Text goes here" style={{ width: '1000 !important', height: '50%', maxHeight: 600, maxWidth: 1000 }} onKeyDown={onKeyDownSend} rows="5"/>
          
          <Button variant="primary" size="lg" onClick = {sendMessage} style={{ marginTop: 20, width: '30%', maxWidth: 400, marginLeft: 230 }}>Send</Button>
          <Button variant="outline-primary" size="lg" onClick = {() => this.setState({ boardId: ''})} style={{ position: 'absolute', height: 60, width: 60, top: 10, left: 10, borderRadius: 50}}>&lt;</Button>
        </center>
      </div>
    );
  }
}

export default Search;
