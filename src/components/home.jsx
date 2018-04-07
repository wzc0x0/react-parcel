  import React , { Component } from "react";
  import { List, Icon, Card } from "antd";
  import fetch from '../js/fetch_jsonp'

  const IconText = ({ type, text }) => (
    <span style={{paddingLeft:10,paddingRight:10}}>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

  export default class Home extends Component {
    state = {
      books:[],
      title:'',
      date:''
    }
    async componentWillMount() {
      // fetch('/v2/movie/us_box').then(res => res.json())
      //   .then(({subjects}) => this.setState({books:subjects}))
      let data  = await fetch('/v2/movie/us_box').then(res => res.json()).then(data => Promise.resolve(data))
      this.setState({ books: data.subjects,title:data.title,date:data.date})
    }

    goDouban(where){
      window.location.href = where;
    }

    render() {
      return (
        <div>
          <h1>{ this.state.title }<span className="title-date">{ this.state.date }</span></h1>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={this.state.books}
            renderItem={item => (
              <List.Item>
                <div style={{ height: 400, cursor: 'pointer' }}
                onClick={ () => this.goDouban(item.subject.alt) }>
                  <Card title={`${item.subject.title}(${item.subject.original_title})`}>
                      <img height={280} style={{ paddingBottom: 10, paddingTop: 10 }}
                        alt={item.subject.alt} src={item.subject.images.large} />
                      <div>
                      <IconText type="star-o" text={item.subject.rating.stars  - 0} />
                      <IconText type="like-o" text={item.subject.rating.max} />
                      <IconText type="message" text={item.subject.rating.average} />
                      </div>
                  </Card>
                </div>
              </List.Item>
            )}
          />
        </div>
      )
    }
  }
