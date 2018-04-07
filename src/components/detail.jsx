import React , { Component } from "react"
import { Button } from "antd";
import fetch from '../js/fetch_jsonp'

export default class Detail extends Component {
  // componentWillMount() {
  //   fetch('/v2/movie/us_box').then(res => res.json())
  //   .then(json => console.log(json))
  // }

  render() {
    return (
      <div>
        <h1>Hello!This is the detail page!</h1>
        <Button>hello react</Button>
      </div>
    )
  }
}
