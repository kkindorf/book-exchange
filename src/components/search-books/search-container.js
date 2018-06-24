import React, { Component } from 'react';
import SearchBar from './search-bar';
import BookDetail from './book-detail-block';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SearchContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '' };
        this.searchBarChange = this.searchBarChange.bind(this);
        this.searchBarSubmit = this.searchBarSubmit.bind(this);
    }
    searchBarChange(e) {
        this.setState({ value: e.target.value });
    }
    searchBarSubmit(e) {
        e.preventDefault();
        this.props.fetchBookResult(this.state.value);
    }
    render() {
        if(this.props.loadingBook) {
            return (
                <div>
                    <SearchBar onChange = {this.searchBarChange}
                                onSubmit = {this.searchBarSubmit}
                                value = {this.state.value}/>
    
              
                </div>
            )
        }
        else {
            let books = this.props.books.map(function(book, i) {
                return (
                    <BookDetail key={i}
                    title={book.title}
                    image={book.image}
                    authors={book.authors}
                    publishedDate={book.publishedDate}
                    previewLink={book.previewLink}
                    />
                )
            });
            return (
                <div>
                <SearchBar  onChange = {this.searchBarChange}
                            onSubmit = {this.searchBarSubmit}
                            value = {this.state.value}/>

                    <div className="search-results-container">
                        {this.props.bookSaveError.length ? window.alert(this.props.bookSaveError) :""}
                        {books}
                    </div>
                </div>
            )
        }
      
    }
}

function mapStateToProps(state) {
    return {books: state.bookResult.books, loadingBook: state.bookResult.loadingBook, bookSaveError: state.bookResult.bookSaveError}
}

export default connect(mapStateToProps, actions)(SearchContainer);