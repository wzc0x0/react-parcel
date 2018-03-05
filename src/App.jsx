import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import logo from './assets/img/react.png'

import './css/app.css'
import asyncComponent from './js/asyncComponent'

const Home = asyncComponent(() => import('./components/home'))
const Detail = asyncComponent(() => import('./components/detail'))

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            counter: 0
        };
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Don't be afraid of React!</h1>
                    <div>
                      <span><Link to='/'>home</Link></span>
                      <span><Link to='detail'>detail</Link></span>
                    </div>
                </header>
                {/* <p className="App-intro" onClick={() => this.setState({ counter : 2})}>
                     To get started, edit <code>src/App.js</code> and save to reload. {this.state.counter}
                </p> */}
                <Switch>
                  <Route exact path='/' component={Home}></Route>
                  <Route exact path='/detail' component={Detail}></Route>
                </Switch>

            </div>
        )
    }
}

export default App
