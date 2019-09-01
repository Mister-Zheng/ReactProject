import React, { Component } from 'react';
import './App.css';

import 'antd/dist/antd.css'
import './assets/js/rem'
import './assets/css/reset.css'
import {Switch,Route,Redirect} from 'react-router-dom';

import Index from './components/page/index';
import List from './components/page/list'
import Coll from './components/page/coll'
import Discuss from './components/page/discuss'
class App extends Component {
  render() {
    return (
      <div className="App">
          <Switch>
              <Route path='/index' component={Index}></Route>
              <Route path='/list/:id' component={List}></Route>
              <Route path='/coll' component={Coll}></Route>
              <Route path="/discuss" component={Discuss}></Route>
              <Redirect to={'/index'}/>
          </Switch>
      </div>
    );
  }
}

export default App;
