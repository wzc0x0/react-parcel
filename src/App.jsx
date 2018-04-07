import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom';
import asyncComponent from './js/asyncComponent';
import './css/reset.css';

import { Menu } from "antd";

const Home = asyncComponent(() => import('./components/home'))
const Detail = asyncComponent(() => import('./components/detail'))

class App extends Component {
    state = {
      counter: 0,
      current: 'one'
    };

    handleClick = (e) => {
      console.log(e)
      this.setState({ current: e.key })
    }

    render() {
        return (
            <div>
                <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                >
                  <Menu.Item key="one">
                    <Link to='/'> Navigation One</Link>
                  </Menu.Item>
                  <Menu.Item key="two">
                    <Link to='/detail'>Navigation One</Link>
                  </Menu.Item>
                </Menu>
                <div className="router-view">
                  <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route exact path='/detail' component={Detail}></Route>
                  </Switch>
                </div>
            </div>
        )
    }
}

export default App
