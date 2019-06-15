import React, { Component } from 'react';
import axios from 'axios'

class Search extends Component {
  state = { 
    userSearchInput: '',
    searchResults: []
   }

   handleChange(prop, val){
     this.setState({ [prop] : val})
   }

   handleSearch = async() => {
    let searchTerm = this.state.userSearchInput
    let response = await axios.get(`http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&origin=*&srsearch=${searchTerm}`)
    console.log(response.data.query.search)
    this.setState({ searchResults:response.data.query.search })

   }

  render() { 
    let  {searchResults } = this.state
    let mappedResults = searchResults.map( (result) => {
      return (
        <div key={result.pageid} >
          <h2>{result.title}</h2>
        </div>
      )
    })
    return (
      <>
        <h2>search here yo</h2>
        <input onChange={(e) => this.handleChange('userSearchInput', e.target.value)} type="text"/>
        <button onClick={() => this.handleSearch()} >search</button>
        {mappedResults}
      </>
     );
  }
}
 
export default Search;