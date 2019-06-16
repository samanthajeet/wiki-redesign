import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

const Wiki = styled.div`
  box-sizing: border-box;
  /* border: 1px solid red; */
  height: 98vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Montserrat', sans-serif;

`;

const Title = styled.div`
  /* border: 1px solid blue; */
  margin-top: 5rem;
`;

const SearchArea = styled.div`
  /* border: 1px solid green; */
  margin-top: 5rem;
  width: 65vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  input {
    height: 4rem;
    width: 50rem;
    outline: none;
    border: none;
    font-size: 3.5rem;
    font-weight: 700;
    padding-left: 0.2rem;
    ::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #e8e8e8;
      opacity: 1; /* Firefox */
    }
  }
`;

const Results = styled.div`
  animation: fadein 2s;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  h3 {
    font-size: 2.5rem;
    font-weight: 400;
  }

  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const IndividualResult = styled.div`
  :hover {
    color: white;
    background: black;
    transition: .5s
  }
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 0.25rem;
`;

class Search extends Component {
  state = {
    userSearchInput: "",
    searchResults: [],
    showResults: false
  };

  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }

  handleSearch = async () => {
    let searchTerm = this.state.userSearchInput;
    let response = await axios.get(
      `http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&origin=*&prop=extracts&srsearch=${searchTerm}`
      );
      await this.setState({ searchResults: response.data.query.search });
      this.setState({ showResults: false });
    this.setState({ showResults: true });
  };

  goToPage(title) {
    this.props.history.push(`/page/${title}`);
  }

  render() {
    let { searchResults } = this.state;
    let mappedResults = searchResults.map(result => {
      return (
        <IndividualResult
          key={result.pageid}
          onClick={() => this.goToPage(result.title)}
        >
          <h3>{result.title}</h3>
        </IndividualResult>
      );
    });
    return (
      <Wiki>
        <Title>
          <h1>wikipedia</h1>
        </Title>
        <SearchArea>
          <form onSubmit={() => this.handleSearch()}>
            <input
              type="text"
              value={this.state.userSearchInput}
              onChange={e =>
                this.handleChange("userSearchInput", e.target.value)
              }
              placeholder="Search Wikipedia"
              spellcheck="false"
              autoFocus
            />
          </form>
          
            {this.state.showResults ? <Results>{mappedResults}</Results> : null }
          
        </SearchArea>
      </Wiki>
    );
  }
}

export default Search;
