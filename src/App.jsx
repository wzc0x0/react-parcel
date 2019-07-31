import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import logo from './assets/img/react.png'
import NoMatch from './pages/NoMatch';
import './css/app.css'
import asyncComponent from './js/asyncComponent'

const Home = asyncComponent(() => import('./components/home'))
const Detail = asyncComponent(() => import('./components/detail'))

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/detail" component={Detail}></Route>
        <Route component={NoMatch} />
      </Switch>
    )
  }
}

