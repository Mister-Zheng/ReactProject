import React, { Component } from 'react';
import './App.css';

import 'antd/dist/antd.css'
import './assets/js/rem'
import './assets/css/reset.css'
import {Switch,Route,Redirect} from 'react-router-dom';

import Index from './components/page/index';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
              <Route path='/index' component={Index}></Route>
              <Redirect to={'/index'}/>
          </Switch>
      </div>
    );
  }
}

export default App;
