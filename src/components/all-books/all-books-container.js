import React, { Component } from 'react';
import { connect } from 'react-redux';
import BookBlock from './book-block';
import * as actions from '../../actions';
import { Link } from 'react-router';

class AllBooksContainer extends Component {
    constructor(props) {
        super(props);
        this.state={notValidRequest: false};
        
    }
    componentWillMount() {
        this.props.fetchAllBooks();
    }
    render() {
        if(this.props.loadingBook) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            )
        }
        if(typeof this.props.allBooksList === 'string') {
            return (
                <h1>{this.props.allBooksList}</h1>
            )
            
        }
        else {
           let books = this.props.allBooksList.map(function(book, i) {
                return (
                    <BookBlock  key={i}
                                previewLink={book.previewLink}
                                image={book.image}
                                tradeRequested={book.tradeRequested}
                                errorMessage = {book.errorMessage}
                                tradeAccepted={book.tradeAccepted}
                                id = {book._id}
                                />
                )
            })
            return (
                <div>
                    <div className="headline-container">
                    <h1 className="header">The Open Book Exchange</h1>
                    <p className="headline">Welcome to The Open Book Exchange. Feel free to <Link to={'/search-books'}>Search</Link> for a book to read. Or <Link to={'/signup'}>sign up</Link> and request a trade with one of our community members!</p>
                    </div>
                    <div className="all-books-container">
                        {books}
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {allBooksList: state.bookResult.allBooksList, loadingBook: state.loadingBook}
}

export default connect(mapStateToProps, actions)(AllBooksContainer);