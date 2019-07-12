import React, { Component } from 'react';
import axios from 'axios';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'javascript';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      isLoading: false,
      error: null,
    };
  }

  getStories(){
    this.setState({ isLoading: true });
  }

  componentDidMount() {
    this.setState({ isLoading: true});


  axios.get(API + DEFAULT_QUERY)
    .then(result => this.setState({
      hits: result.data.hits,
      isLoading: false
    }))
    .catch(error => this.setState({
      error,
      isLoading: false
    }));
  }

 render(){
   const { hits, isLoading, error } = this.state;

   if(error){
     return <p>{error.message}</p>
   }

   if (isLoading){
     return <p>Loading...</p>;

   }
   return (
     <div>
       <h2>Javascript News!</h2>
     <ol>
       {hits.map(hit =>
        <li key={hit.objectID}>
          <a href={hit.url}>{hit.title}</a>
        </li>)}
     </ol>
     </div>
   );
 }
}

export default App;