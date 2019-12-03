import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from "./components/Home";
import Index from "./components/Index";
import Search from "./components/Search";
import SearchResult from "./components/SearchResult";
import NotFound from "./components/NotFound";
import './styles.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/index" component={Index} />
          <Route exact path="/search/:word" component={SearchResult} />
          <Route exact path="/search" component={Search} />
          <Route exact component={NotFound} />
      </Switch>
    </BrowserRouter>
    );
  }
}

export default App;
