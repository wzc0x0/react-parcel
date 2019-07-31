import React, { Component } from 'react'

export default class NoMatch extends Component {
  componentDidMount() {
    let s = document.createElement("script")
    s.setAttribute("src", "//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js")
    s.setAttribute("homePageUrl", "/")
    s.setAttribute("homePageName", "回到我的主页")
    this.instance.appendChild(s)
  }
  render() {
    return (
      <div ref={el => (this.instance = el)} />
    )
  }
}
