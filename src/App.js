import React, { Component } from 'react';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'react';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true});

    fetch(API + DEFAULT_QUERY)
      .then(response => {
        if (response.ok){
          return response.json();
        } else {
          throw new Error('Something went wrong...');
        }
      })
      .then(data => this.setState({ hits: data.hits, isLoading: false }))
      .catch(err => this.setState({ err, isLoading: false}));
  }

 render(){
   const { hits, isLoading } = this.state;

   if (isLoading){
     return <p>Loading...</p>;

   }
   return (
     <ul>
       {hits.map(hit =>
        <li key={hit.objectID}>
          <a href={hit.url}>{hit.title}</a>
        </li>)}
     </ul>

   );
 }
}

export default App;